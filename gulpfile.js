const gulp = require('gulp');
const { src, dest, parallel, watch, series } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const browserSync = require('browser-sync').create();



const jsFiles = [
  'node_modules/jquery/dist/jquery.js',
  'node_modules/slick-carousel/slick/slick.js',
  'src/js/testimonials.js',
  'src/js/main.js'
];

// Copy to dist minified html
function minifyHtml() {
  return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'));
}

// Copy to dist minified images
function imageMin() {
  return src('src/img/**/*')
    .pipe(
      cache(
        imagemin([
          imagemin.gifsicle({interlaced: true}),
          imagemin.mozjpeg({quality: 30, progressive: true}),
          imagemin.optipng({optimizationLevel: 5}),
          imagemin.svgo({
            plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
            ]
          })
        ])
      )
    )
    .pipe(dest('dist/img'))
}

// Compile scss
function scss() {
  return src('src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.min.css'))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('/.'))
    .pipe(dest('src/css'))
    .pipe(browserSync.reload({ stream: true }));
}

// Compile and minimize Js
function concatJs() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'src/js/testimonials.js',
    'src/js/main.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("/."))
    .pipe(dest("src/js"))
    .pipe(browserSync.reload({ stream: true }));
}

// Delete all files in dist
function cleanDist() {
  return del('dist');
}

function browserReload() {
  browserSync.init({
    server: {
      baseDir: 'src/',
    },
  });
}

// Watching all files
function dev() {
  watch(['src/*.html']).on('change', browserSync.reload);
  watch(['src/ajax/mail.php']).on('change', browserSync.reload);
  watch(['src/scss/main.scss'], scss);
  watch(['src/js/**/*.js', '!src/js/main.min.js', '!src/js/main.min.js.map'], concatJs);
}

// Build dist folder
function build() {
  return src([
    'src/css/main.min.css',
    'src/css/main.min.css.map',
    'src/fonts/**/*',
    'src/js/main.min.js',
    'src/js/main.min.js.map',
    'src/ajax/mail.php'
  ], {base: 'src'})
      .pipe(dest('dist'))
}


exports.dev = parallel(concatJs, scss, browserReload, dev);
exports.build = series(cleanDist, parallel(minifyHtml, imageMin, build));
exports.copyHtml = minifyHtml;
exports.copyImages = imageMin;
exports.minCss = scss;
exports.concatJs = concatJs;
exports.cleanDist = cleanDist;
