var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

gulp.task('copy:icons', function () {
  return gulp
    .src(['./bower_components/material-design-icons/**/svg/production/*.svg'])
    .pipe(gulp.dest(path.join(conf.paths.dist, '/bower_components/material-design-icons/')));
});
