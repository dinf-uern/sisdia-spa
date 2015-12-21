'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var loopbackAngular = require('gulp-loopback-sdk-angular');
var replace = require('gulp-replace');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('gen:loopback', function () {
  return gulp.src('../sisdia-api2/server/server.js')
    .pipe(loopbackAngular())
    .pipe(rename('lb-services.js'))
    .pipe(replace('Resource,', 'LoopBackResource,'))
    .pipe(replace('Resource(', 'LoopBackResource('))
    .pipe(gulp.dest('./src/app/components'));
});
