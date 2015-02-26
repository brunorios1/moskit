var gulp = require('gulp');
var del = require('del');
var scsslint = require('gulp-scss-lint');
var sass = require('gulp-sass');
var please = require('gulp-pleeease');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');

var paths = {
  styles: 'src/scss/**/*.scss',
  scripts: 'src/js/**/*.js',
};

gulp.task('clean', function(cb) {
  del(['dist/*'], cb);
});

// Styles
gulp.task('styles', ['clean'], function() {
  gulp.src(paths.styles)
    // lint scss code
    .pipe(scsslint({
      'bundleExec': true
    }))
    // compile .scss to .css
    .pipe(sass({
      // "keep gulp from stopping every time you mess up your sass"
      errLogToConsole: true
    }))
    .pipe(please({
      "autoprefixer": { "browsers": ["last 2 versions"] },
      "mqpacker": true
    }))
    // Compiles to build folder
    .pipe(gulp.dest('dist/css'));
});

// Scripts
gulp.task('scripts', ['clean'], function() {
    // Note: To have the process exit with an error code (1) on
    //  lint error, return the stream and pipe to failOnError last.
    gulp.src([paths.scripts])
      .pipe(eslint())
      .pipe(eslint.format())
      // .pipe(eslint.failOnError())
      // Minify JS
      .pipe(uglify())
      // Compiles to build folder
      .pipe(gulp.dest('dist/js'));
});

// Check for changes and rerun tasks when a file changes
gulp.task('watch', ['styles', 'scripts'], function() {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['styles', 'scripts']);
