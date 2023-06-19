import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import gulpSass from 'gulp-sass';
import sass from 'sass';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import image from 'gulp-imagemin';
import webp from 'gulp-webp';
import avif from 'gulp-avif';
import svgSprite from 'gulp-svg-sprite';
import svgmin from 'gulp-svgmin';
import autoprefixer from 'autoprefixer';
import typograf from 'gulp-typograf';
import { deleteAsync } from 'del';
import { readFileSync } from 'fs';
import browserSync from 'browser-sync';
import notify from 'gulp-notify';
import replace from 'gulp-replace';
import gulpCheerio from 'gulp-cheerio';
import gulpIf from 'gulp-if';
import gulpCleanCss from 'gulp-clean-css';
import gulpPlumber from 'gulp-plumber';
import fileinclude from 'gulp-file-include';
import webpackStream from 'webpack-stream';
import TerserPlugin from 'terser-webpack-plugin';
import rev from 'gulp-rev';
import revRewrite from 'gulp-rev-rewrite';
import revDel from 'gulp-rev-delete-original';
const scss = gulpSass(sass);
const { src, dest, series, watch } = gulp;

// Paths
const srcFolder = './src';
const buildFolder = './dist';
const paths = {
	srcSvg: `${srcFolder}/img/svg/**.svg`,
	srcImgFolder: `${srcFolder}/img`,
	buildImgFolder: `${buildFolder}/img`,
	srcScss: `${srcFolder}/scss/**/*.scss`,
	buildCssFolder: `${buildFolder}/css`,
	srcFullJs: `${srcFolder}/js/**/*.js`,
	srcMainJs: `${srcFolder}/js/main.js`,
	buildJsFolder: `${buildFolder}/js`,
	srcPartialsFolder: `${srcFolder}/partials`,
	resourcesFolder: `${srcFolder}/resources`,
};

let isProd = false; // dev by default

// HTML
export const htmlInclude = () => {
	return src([`${srcFolder}/*.html`])
		.pipe(
			fileinclude({
				prefix: '@',
				basepath: '@file',
			}),
		)
		.pipe(
			typograf({
				locale: ['ru', 'en-US', 'lv'],
			}),
		)
		.pipe(dest(buildFolder))
		.pipe(browserSync.stream());
};

export const htmlMinify = () => {
	return src(`${buildFolder}/**/*.html`)
		.pipe(
			htmlmin({
				collapseWhitespace: true,
			}),
		)
		.pipe(dest(buildFolder));
};

// Styles
export const styles = () => {
	return src(paths.srcScss, { sourcemaps: !isProd })
		.pipe(
			gulpPlumber(
				notify.onError({
					title: 'SCSS',
					message: 'Error: <%= error.message %>',
				}),
			),
		)
		.pipe(scss())
		.pipe(
			postcss([
				autoprefixer({
					overrideBrowserslist: ['last 5 versions'],
					cascade: true,
					grid: true,
				}),
				cssnano(),
			]),
		)
		.pipe(
			gulpIf(
				isProd,
				gulpCleanCss({
					level: 2,
				}),
			),
		)
		.pipe(dest(paths.buildCssFolder, { sourcemaps: '.' }))
		.pipe(browserSync.stream());
};

// Scripts
export const scripts = () => {
	return src(paths.srcMainJs)
		.pipe(
			gulpPlumber(
				notify.onError({
					title: 'JS',
					message: 'Error: <%= error.message %>',
				}),
			),
		)
		.pipe(
			webpackStream({
				mode: isProd ? 'production' : 'development',
				output: {
					filename: 'main.js',
				},
				module: {
					rules: [
						{
							test: /\.m?js$/,
							exclude: /node_modules/,
							use: {
								loader: 'babel-loader',
								options: {
									presets: [
										[
											'@babel/preset-env',
											{
												targets: 'defaults',
											},
										],
									],
								},
							},
						},
					],
				},
				optimization: {
					minimize: true,
					minimizer: [new TerserPlugin()],
				},
				devtool: !isProd ? 'source-map' : false,
			}),
		)
		.on('error', function (err) {
			console.error('WEBPACK ERROR', err);
			this.emit('end');
		})
		.pipe(dest(paths.buildJsFolder))
		.pipe(browserSync.stream());
};

// Images
export const images = () => {
	return src([`${paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`])
		.pipe(gulpIf(isProd, image()))
		.pipe(dest(paths.buildImgFolder));
};

export const webpImages = () => {
	return src([`${paths.srcImgFolder}/**/**.{jpg,jpeg,png}`])
		.pipe(webp({ quality: 70 }))
		.pipe(dest(paths.buildImgFolder));
};

export const avifImages = () => {
	return src([`${paths.srcImgFolder}/**/**.{jpg,jpeg,png}`])
		.pipe(avif({ quality: 70 }))
		.pipe(dest(paths.buildImgFolder));
};

// SVG Icons
export const svg = () => {
	return src(paths.srcSvg)
		.pipe(
			svgmin({
				js2svg: {
					pretty: true,
				},
			}),
		)
		.pipe(
			gulpCheerio({
				run: function ($) {
					$('[fill]').removeAttr('fill');
					$('[stroke]').removeAttr('stroke');
					$('[style]').removeAttr('style');
				},
				parserOptions: {
					xmlMode: true,
				},
			}),
		)
		.pipe(replace('&gt;', '>'))
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: '../sprite.svg',
					},
				},
			}),
		)
		.pipe(dest(paths.buildImgFolder));
};

// Resources
export const resources = () => {
	return src(`${paths.resourcesFolder}/**`).pipe(dest(buildFolder));
};

// Delete all files in dist
export const cleanDist = () => {
	return deleteAsync([buildFolder]);
};

// Watching all files
export const watchFiles = () => {
	browserSync.init({
		server: {
			baseDir: `${buildFolder}`,
		},
	});

	watch(paths.srcScss, styles);
	watch(paths.srcFullJs, scripts);
	watch(`${paths.srcPartialsFolder}/*.html`, htmlInclude);
	watch(`${srcFolder}/*.html`, htmlInclude);
	watch(`${paths.resourcesFolder}/**`, resources);
	watch(`${paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`, images);
	watch(`${paths.srcImgFolder}/**/**.{jpg,jpeg,png}`, webpImages);
	watch(`${paths.srcImgFolder}/**/**.{jpg,jpeg,png}`, avifImages);
	watch(paths.srcSvg, svg);
};

// Cache
export const processCache = () => {
	return src(`${buildFolder}/**/*.{css,js,svg,png,jpg,jpeg,webp,woff2}`, {
		base: buildFolder,
	})
		.pipe(rev())
		.pipe(revDel())
		.pipe(dest(buildFolder))
		.pipe(rev.manifest('rev.json'))
		.pipe(dest(buildFolder));
};

// Rewrite
export const rewrite = () => {
	const manifest = readFileSync('dist/rev.json');
	src(`${paths.buildCssFolder}/*.css`)
		.pipe(
			revRewrite({
				manifest,
			}),
		)
		.pipe(dest(paths.buildCssFolder));
	return src(`${buildFolder}/**/*.html`)
		.pipe(
			revRewrite({
				manifest,
			}),
		)
		.pipe(dest(buildFolder));
};

export const toProd = (done) => {
	isProd = true;
	done();
};

export default series(
	cleanDist,
	htmlInclude,
	scripts,
	styles,
	resources,
	images,
	webpImages,
	avifImages,
	svg,
	watchFiles,
);

export const build = series(
	toProd,
	cleanDist,
	htmlInclude,
	htmlMinify,
	scripts,
	styles,
	resources,
	images,
	webpImages,
	avifImages,
	svg,
);

export const cache = series(processCache, rewrite);
