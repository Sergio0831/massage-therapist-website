import gulp from 'gulp';
import babel from 'gulp-babel';
import htmlmin from 'gulp-htmlmin';
import cache from 'gulp-cache';
import gulpSass from 'gulp-sass';
import sass from 'sass';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import postcss from 'gulp-postcss';
import imagemin from 'gulp-imagemin';
import cssnano from 'cssnano';
import webp from 'gulp-webp';
import autoprefixer from 'autoprefixer';
import terser from 'gulp-terser';
import { deleteAsync } from 'del';
import browserSync from 'browser-sync';
const scss = gulpSass(sass);

const jsFiles = [
	'node_modules/jquery/dist/jquery.js',
	'node_modules/slick-carousel/slick/slick.js',
	'src/js/testimonials.js',
	'src/js/main.js',
];

// HTML
export const html = () => {
	return gulp
		.src('src/*.html')
		.pipe(htmlmin({ removeComments: true, collapseWhitespace: true }))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
};

// Styles
export const styles = () => {
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
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.stream());
};

// Scripts
export const scripts = () => {
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
		.pipe(gulp.dest('src/js'))
		.pipe(browserSync.stream());
};

// Images
export const images = () => {
	return gulp
		.src('src/img/**/*')
		.pipe(
			webp({
				quality: 70,
			}),
		)
		.pipe(
			cache(
				imagemin({
					progressive: true,
					svgoPlugins: [{ removeViewBox: false }],
					interlaced: true,
					optimizationLevel: 3,
				}),
			),
		)
		.pipe(gulp.dest('dist/img'))
		.pipe(
			browserSync.stream({
				once: true,
			}),
		);
};

// Server
export const browserReload = () => {
	browserSync.init({
		ui: false,
		notify: false,
		server: {
			baseDir: 'src/',
		},
	});
};

// Delete all files in dist
export const cleanDist = () => {
	return deleteAsync('dist');
};

// Watching all files
export const watch = () => {
	gulp.watch('src/*.html', gulp.series(html));
	gulp.watch(['src/ajax/mail.php']).on('change', browserSync.reload);
	gulp.watch('src/scss/main.scss', gulp.series(styles));
	gulp.watch('src/img/**/*', gulp.series(images));
	gulp.watch(
		['src/js/**/*.js', '!src/js/main.min.js', '!src/js/main.min.js.map'],
		gulp.series(scripts),
	);
};

// Build dist folder
export const build = () => {
	return gulp
		.src(
			[
				'src/css/main.min.css',
				'src/css/main.min.css.map',
				'src/fonts/**/*',
				'src/js/main.min.js',
				'src/js/main.min.js.map',
				'src/ajax/mail.php',
			],
			{ base: 'src' },
		)
		.pipe(gulp.dest('dist'));
};

// exports.dev = gulp.parallel(scripts, styles, browserReload, dev);
// exports.build = gulp.series(cleanDist, gulp.parallel(html, images, build));
export default gulp.series(
	cleanDist,
	gulp.parallel(html, styles, scripts, images),
	gulp.parallel(watch, browserReload),
);
