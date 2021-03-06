var gulp = require('gulp');
var express = require('express');
var compress = require('compression');

var app = express();
var port = process.env.PORT || 3000;

gulp.task('serve:prod', ['build', 'copy:icons'], function() {
  app.use(compress({ threshold: 0 }));
  app.use(express.static('./dist'));

  app.listen(port, function () {
    console.log('Escutando na porta ' + port);
  });
});
