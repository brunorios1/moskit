var gulp = require('gulp');
var del = require('del');
var config = require('../../config').clean.dev;

// Clean
gulp.task('clean', function(callback) {
  del([config.src + '/*'], callback);
});
