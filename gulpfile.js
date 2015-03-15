var gulp = require('gulp');
var del = require('del');
var scsslint = require('gulp-scss-lint');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var please = require('gulp-pleeease');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
var runSequence = require('run-sequence');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var minifyHTML = require('gulp-minify-html');

var paths = {
  styles: ['src/core/**/*.scss', 'src/custom/**/*.scss'],
  scripts: ['src/core/**/*.js', 'src/custom/**/*.js'],
  html: 'src/custom/**/*.html',
  dist: 'dist',
};

gulp.task('clean', function(cb) {
  del([paths.dist + '/*'], cb);
});

// Styles
gulp.task('styles', function() {
  gulp.src(paths.styles)
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
      "mqpacker": true
    }))
    .pipe(sourcemaps.write('../../maps'))
    // Compiles to build folder
    .pipe(gulp.dest(paths.dist + '/css'))
    // Size
    .pipe(size({showFiles: true, title: 'styles'}));
});

// Scripts
gulp.task('scripts', function() {
    // Note: To have the process exit with an error code (1) on
    //  lint error, return the stream and pipe to failOnError last.
    gulp.src(paths.scripts)
      .pipe(eslint())
      .pipe(eslint.format())
      // .pipe(eslint.failOnError())
});

// Html
gulp.task('html', function () {
  var assets = useref.assets();

  return gulp.src(paths.html)
    .pipe(assets)
      // Concatenates and minifies JS
    .pipe(gulpif('*.js', uglify()))
    .pipe(assets.restore())
    .pipe(useref())
    // Minifies HTML
    .pipe(minifyHTML())
    // Compiles HTML to build folder
    .pipe(gulp.dest(paths.dist))
    // Size
    .pipe(size({showFiles: true, title: 'html'}));
});

// Check for changes and rerun tasks when a file changes
gulp.task('watch', ['default'], function() {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.html, ['html']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', function(cb) {
  runSequence('clean', ['styles', 'scripts', 'html'], cb);
});
