var gulp = require('gulp');
var changed = require('gulp-changed');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
  styles: 'src/scss/**/*.scss'
};

// Styles
gulp.task('styles', function () {
  gulp.src('src/scss/style.scss')
    // No more wasting precious time on processing unchanged files.
    .pipe(changed('.tmp/css', {extension: '.css'}))
    // compile .scss to .css
    .pipe(sass({
      // "keep gulp from stopping every time you mess up your sass"
      errLogToConsole: true
    }))
    // "add vendor prefixes using values from Can I Use (caniuse.com)"
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('.tmp/css'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.styles, ['styles']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);
