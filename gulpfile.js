var gulp = require('gulp');
var del = require('del');
var scsslint = require('gulp-scss-lint');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var combineMq = require('gulp-combine-mq');
var csso = require('gulp-csso');
var eslint = require('gulp-eslint');

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
    // "add vendor prefixes using values from Can I Use (caniuse.com)"
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    // Combine Media Queries
    .pipe(combineMq())
    // Optimize CSS
    .pipe(csso())
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
