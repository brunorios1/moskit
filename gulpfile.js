var gulp = require('gulp');
var sass = require('gulp-sass');

var paths = {
  sass: ['src/scss/**/*.scss']
  // images: 'client/img/**/*'
};

// Styles
gulp.task('styles', function () {
  gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest('.tmp/css'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['styles']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);
