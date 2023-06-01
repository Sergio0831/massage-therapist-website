import gulp from 'gulp';
import babel from 'gulp-babel';
import htmlmin from 'gulp-htmlmin';
import gulpSass from 'gulp-sass';
import sass from 'sass';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import postcss from 'gulp-postcss';
import imagemin from 'gulp-imagemin';
import cssnano from 'cssnano';
import webp from 'gulp-webp';
import avif from 'gulp-avif';
import svgSprite from 'gulp-svg-sprite';
import svgmin from 'gulp-svgmin';
import ttf2woff2 from 'gulp-ttf2woff2';
import autoprefixer from 'autoprefixer';
import terser from 'gulp-terser';
import newer from 'gulp-newer';
import { deleteAsync } from 'del';
import browserSync from 'browser-sync';
const scss = gulpSass(sass);

const jsFiles = [
	'node_modules/jquery/dist/jquery.js',
	'node_modules/slick-carousel/slick/slick.js',
	'src/js/testimonials.js',
	'src/js/mobileMenu.js',
	'src/js/main.js',
];

// HTML
export const html = async () => {
	return gulp
		.src('src/*.html')
		.pipe(htmlmin({ removeComments: true, collapseWhitespace: true }))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
};

// Styles
export const styles = async () => {
	return gulp
		.src('src/scss/main.scss')
		.pipe(scss())
		.pipe(sourcemaps.init())
		.pipe(concat('main.min.css'))
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
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
};

// Scripts
export const scripts = async () => {
	return gulp
		.src(jsFiles)
		.pipe(
			babel({
				presets: ['@babel/preset-env'],
			}),
		)
		.pipe(sourcemaps.init())
		.pipe(concat('main.min.js'))
		.pipe(terser())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream());
};

// Images
export const images = () => {
	return gulp
		.src('src/img/**/*.{jpg,png}')
		.pipe(newer('dist/img'))
		.pipe(
			avif({
				quality: 70,
			}),
		)
		.pipe(gulp.src('src/img/**/*.{jpg,png}'))
		.pipe(newer('dist/img'))
		.pipe(
			webp({
				quality: 70,
			}),
		)
		.pipe(gulp.src('src/img/**/*.*'))
		.pipe(newer('dist/img'))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3,
			}),
		)
		.pipe(gulp.dest('dist/img'))
		.pipe(
			browserSync.stream({
				once: true,
			}),
		);
};

// SVG Icons
export const svg = async () => {
	return gulp
		.src('src/icons/*.svg')
		.pipe(
			svgmin({
				js2svg: {
					pretty: true,
				},
			}),
		)
		.pipe(
			svgSprite({
				mode: {
					symbol: {
						sprite: '../sprite.svg',
					},
				},
			}),
		)
		.pipe(gulp.dest('dist/icons'));
};

// Fonts
export const fonts = async () => {
	gulp
		.src(['src/fonts/**.ttf'], {
			base: 'src',
		})
		.pipe(ttf2woff2())
		.pipe(gulp.dest('dist'));
};

// Resources
export const resources = async () => {
	return gulp.src('src/ajax/**').pipe(gulp.dest('dist/ajax'));
};

// Delete all files in dist
export const cleanDist = () => {
	return deleteAsync('dist');
};

// Watching all files
export const watch = () => {
	browserSync.init({
		ui: false,
		notify: false,
		server: {
			baseDir: 'dist',
		},
	});
	gulp.watch('src/*.html', html);
	gulp.watch('src/ajax/**', resources);
	gulp.watch('src/scss/main.scss', styles);
	gulp.watch('src/img/**/*', images);
	gulp.watch('src/fonts/*', fonts);
	gulp.watch('src/icons/*.svg', svg);
	gulp.watch('src/js/**/*.js', scripts);
};

export default gulp.series(
	cleanDist,
	gulp.parallel(html, styles, scripts, images, svg, fonts, resources),
	gulp.parallel(watch),
);
