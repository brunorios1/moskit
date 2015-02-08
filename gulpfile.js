var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var combineMq = require('gulp-combine-mq');
var csso = require('gulp-csso');

var paths = {
  styles: 'src/scss/**/*.scss'
};

gulp.task('clean', function(cb) {
  del(['dist/*'], cb);
});

// Styles
gulp.task('styles', ['clean'], function () {
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
    // Compiles to build folder
    .pipe(gulp.dest('dist/css'))
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.styles, ['styles']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);
