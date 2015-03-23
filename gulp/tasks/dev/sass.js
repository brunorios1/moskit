var gulp = require('gulp');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var sourcemaps = require('gulp-sourcemaps');
var please = require('gulp-pleeease');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var gulpif = require('gulp-if');
var config = require('../../config').sass.dev;

// Sass
gulp.task('sass', function() {
  var stream = gulp.src(config.src)
    // lint scss code
    .pipe(scsslint({
      'bundleExec': true
    }))
    .pipe(sourcemaps.init())
    // compile .scss to .css
    .pipe(sass({
      // "keep gulp from stopping every time you mess up your sass"
      errLogToConsole: true
    }))
    .pipe(please({
      "autoprefixer": { "browsers": ["last 2 versions"] },
      "minifier": false
    }))
    .pipe(sourcemaps.write())
    // Compiles to build folder
    .pipe(gulp.dest(config.dest))
    // auto-inject into browsers
    .pipe(gulpif('*.css', reload({stream: true})));
  return stream;
});
