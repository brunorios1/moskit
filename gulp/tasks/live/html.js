var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var please = require('gulp-pleeease');
var minifyHTML = require('gulp-minify-html');
var size = require('gulp-size');
var config = require('../../config').html;

gulp.task('html', ['sass:live'], function () {
  var assets = useref.assets();

  var stream = gulp.src(config.src)
    .pipe(assets)
    // Concatenates and minifies JS
    .pipe(gulpif('*.js', uglify()))
    // Concatenates and minifies CSS
    .pipe(gulpif('*.css', please({
      "autoprefixer": { "browsers": ["last 2 versions"] }
    })))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(minifyHTML())
    // Compiles HTML to build folder
    .pipe(gulp.dest(config.dist))
    // Size
    .pipe(size({showFiles: true, title: 'html'}));
    return stream;
});
