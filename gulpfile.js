const { src, dest, series, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const del = require('del');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

const webpackStream = require('webpack-stream');
const rename = require('gulp-rename');

// // const clean = require('gulp-clean');

// // Таск компиляции SASS в CSS
// function buildSassDev() {
//     return src('src/scss/**/*.scss')
//         .pipe(sourcemaps.init())
//         .pipe(sass({ includePaths: ['./node_modules'] }).on('error', sass.logError))
//         .pipe(
//             postcss([
//                 autoprefixer({
//                     grid: true,
//                     overrideBrowserslist: ['last 2 versions']
//                 }),
//                 cssnano()
//             ])
//         )
//         .pipe(sourcemaps.write())
//         .pipe(dest('src/css'))
//         .pipe(dest('dist/css'))
//         .pipe(browserSync.stream());
// }

// function buildSass() {
//     return src('src/scss/**/*.scss')
//         .pipe(sass({ includePaths: ['./node_modules'] }).on('error', sass.logError))
//         .pipe(
//             postcss([
//                 autoprefixer({
//                     grid: true,
//                     overrideBrowserslist: ['last 2 versions']
//                 }),
//                 cssnano()
//             ])
//         )
//         .pipe(dest('dist/css'));
// }

// // Таск работы с html файлами
// function buildHtml() {
//     return src('src/**/*.html')
//         .pipe(dest('dist'))
//         .pipe(browserSync.stream());
// }

// // Таск копирования статичных файлов
// function copy() {
//     return src(['src/images/**/*.*'], { base: 'src' }).pipe(dest('dist'));
// }

// // Таск очистки dist
// function cleanDist() {
//     return del('dist');
// }

// // Таск отслеживания изменения файлов
// function serve() {
//     watch('src/scss/**/*.scss', buildSassDev);
//     watch('src/**/*.html', buildHtml);
// }

// // Создание дев-сервера
// function createDevServer() {
//     browserSync.init({
//         server: 'src',
//         notify: false
//     })
// }

// exports.sass = buildSass;
// exports.html = buildHtml;
// exports.copy = copy;
// exports.cleanDist = cleanDist;

// exports.build = series(cleanDist, buildSass, buildHtml, copy);
// exports.default = series(buildSassDev, parallel(createDevServer, serve));

// const { src, dest, watch, series, parallel } = require('gulp');
// const sass = require('gulp-sass');
// const postcss = require('gulp-postcss');
// const autoprefixer = require('autoprefixer');
// const cssnano = require('cssnano');
// const sourcemaps = require('gulp-sourcemaps');
// const browserSync = require('browser-sync').create();
// const del = require('del');
// const webpackStream = require('webpack-stream');
// const rename = require('gulp-rename');
// const sass = require('gulp-sass')(require('sass'));

// Таск компиляции SASS в CSS
function buildSass() {
  return src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(
      postcss([
        autoprefixer({
          grid: true,
          overrideBrowserslist: ['last 2 versions'],
        }),
        cssnano(),
      ])
    )
    .pipe(sourcemaps.write('.'))
    .pipe(dest('src/css'))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

function buildJs() {
  return src('src/js/index.js')
    .pipe(webpackStream(require('./webpack.config')))
    .pipe(rename('main.min.js'))
    .pipe(dest('src/js'))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

// Таск работы с html файлами
function html() {
  return src('src/**/*.html').pipe(dest('dist/')).pipe(browserSync.stream())
}

function browsersync() {
  browserSync.init({
    server: 'src/',
    notify: false,
  });
}

// Таск отслеживания изменения файлов и запуск сервера
function serve() {
  watch(['src/js/**/*.js', '!src/js/**/*.min.js'], buildJs);
  watch('src/scss/**/*.scss', buildSass);
  watch('src/**/*.html', html);
}

function copy() {
  return src(['src/img/**/*.*', 'src/css/**/*.css'], {
    base: 'src/',
  }).pipe(dest('dist'));
}

function cleanDist() {
  return del('dist/**/*', { force: true });
}

exports.build = series(cleanDist, buildSass, buildJs, html, copy);
exports.default = series([buildSass, buildJs], parallel(browsersync, serve));