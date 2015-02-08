var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var combineMq = require('gulp-combine-mq');
var csso = require('gulp-csso');

var paths = {
  styles: 'src/scss/**/*.scss'
};

// Styles
gulp.task('styles', function () {
  gulp.src('src/scss/style.scss')
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
    // Destination folder
    .pipe(gulp.dest('.tmp/css'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.styles, ['styles']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);
