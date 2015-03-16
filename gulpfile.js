var gulp = require('gulp');
var del = require('del');
var scsslint = require('gulp-scss-lint');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var please = require('gulp-pleeease');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
// var runSequence = require('run-sequence');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var minifyHTML = require('gulp-minify-html');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var paths = {
  styles: ['src/core/**/*.scss', 'src/custom/**/*.scss'],
  scripts: ['src/core/**/*.js', 'src/custom/**/*.js'],
  html: '*.html',
  tmp: 'tmp',
  dist: 'dist',
};

gulp.task('serve-clean', function(cb) {
  del([paths.tmp + '/*'], cb);
});

gulp.task('build-clean', function(cb) {
  del([paths.dist + '/*'], cb);
});

// Styles
gulp.task('serve-styles', ['serve-clean'], function() {
  var stream = gulp.src(paths.styles)
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
      "mqpacker": true,
      "minifier": false
    }))
    .pipe(sourcemaps.write())
    // Compiles to build folder
    .pipe(gulp.dest(paths.tmp + '/css'))
    // auto-inject into browsers
    .pipe(gulpif('*.css', reload({stream: true})));
  return stream;
});

// Styles
gulp.task('build-styles', ['build-clean'], function() {
  var stream = gulp.src(paths.styles)
    .pipe(sass({
      // "keep gulp from stopping every time you mess up your sass"
      errLogToConsole: true
    }))
    // Compiles to build folder
    .pipe(gulp.dest(paths.tmp + '/css'))
    // Size
    .pipe(size({showFiles: true, title: 'styles'}));
  return stream;
});

// Scripts
gulp.task('serve-scripts', function() {
  // Note: To have the process exit with an error code (1) on
  //  lint error, return the stream and pipe to failOnError last.
  gulp.src(paths.scripts)
    .pipe(eslint())
    .pipe(eslint.format())
    // .pipe(eslint.failOnError())
});

// The default task (called when you run `gulp` from cli)
gulp.task('build-html', ['build-styles'], function () {
  var assets = useref.assets();

  // return gulp.src(paths.html)
  var stream = gulp.src(paths.html)
    .pipe(assets)
      // Concatenates and minifies JS
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', please({
      "autoprefixer": { "browsers": ["last 2 versions"] },
      "mqpacker": true
    })))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(minifyHTML())
    // Compiles HTML to build folder
    .pipe(gulp.dest(paths.dist))
    // Size
    .pipe(size({showFiles: true, title: 'html'}));
    return stream;
});

// Browser Sync
gulp.task('browser-sync', ['serve-styles'], function() {
  browserSync({
    server: ["./", "./src", "./tmp"]
  });
});

// Watch
gulp.task('watch', ['browser-sync'], function() {
  gulp.watch(paths.styles, ['serve-styles']);
  gulp.watch(paths.scripts, ['serve-scripts', reload]);
  gulp.watch(paths.html, reload);
});

// Build
gulp.task('build', ['build-html']);
gulp.task('default', ['build']);
