var gulp = require('gulp');
var del = require('del');
var config = require('../../config').clean.live;

// Clean
gulp.task('clean:live', function(callback) {
  del([config.src + '/*'], callback);
});
