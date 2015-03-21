var gulp = require('gulp');
var sass = require('gulp-sass');
var size = require('gulp-size');
var config = require('../../config').sass.live;

gulp.task('sass:live', ['clean'], function() {
  var stream = gulp.src(config.src)
    .pipe(sass({
      // "keep gulp from stopping every time you mess up your sass"
      errLogToConsole: true
    }))
    // Compiles to build folder
    .pipe(gulp.dest(config.dest))
    // Size
    .pipe(size({showFiles: true, title: 'styles'}));
  return stream;
});
