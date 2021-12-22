// 'use strict';

const { src, dest, series, watch } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
var uglifycss = require('gulp-uglifycss');

function buildHTML() {
  return src('*.html')
    .pipe(dest('dist/'));
};

function buildStyles() {
  return src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/'));
};

function uglifyStyles() {
  return src('dist/*.css')
    .pipe(uglifycss({
    //   "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(dest('dist/'));
};

function buildJS() {
  return src(['*.js', '!gulpfile.js'])// TODO: adjust paths to files
    .pipe(babel())
    // .pipe(src('vendor/*.js'))
    .pipe(uglify())
    .pipe(dest('dist/'));
}

// function buildExternalCSSModules() {
//   return src(
//     ['node_modules/**/*.scss'],
//     ['node_modules/**/*/.css'],
//     {base:'node_modules'}
//   )
//   .pipe(sass())
//   .pipe(dest("src/css"))
//   // .pipe(browserSync.stream());
// }

function buildExternalJSModules() {
  return src(
    ['node_modules/**/*.js'],
    ['node_modules/**/*/.min.js'],
    {base:'node_modules'}
  )
  .pipe(dest("dist/node_modules"))
  // .pipe(browserSync.stream());
}

function watchSCSS() {
  watch('scss/*.scss', series(buildStyles, uglifyStyles));
};

function watchJS() {
  watch(['*.js', '!gulpfile.js', '!__tests__/'], series(buildJS));
};

exports.buildHTML = buildHTML
exports.buildStyles = buildStyles
exports.uglifyStyles = uglifyStyles
exports.buildJS = buildJS
// exports.buildExternalCSSModules = buildExternalCSSModules
exports.buildExternalJSModules = buildExternalJSModules
exports.watchSCSS = watchSCSS
exports.watchJS = watchJS

exports.default = series(
  buildHTML,
  buildStyles,
  uglifyStyles,
  buildJS,
  // buildExternalCSSModules,
  buildExternalJSModules,
  // watchSCSS,
  watchJS,
)