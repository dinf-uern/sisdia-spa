var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('serve:prod', ['build', 'copy:icons'], function() {
  connect.server({
    root: ['./dist'],
    port: process.env.PORT || 8080, // localhost:5000
    livereload: false
  });
});
