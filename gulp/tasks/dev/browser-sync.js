var gulp = require('gulp');
var browserSync = require('browser-sync');

// Dev - Browser Sync
gulp.task('browser-sync', ['sass'], function() {
  browserSync({
    server: ["./", "./src", "./tmp"]
  });
});
