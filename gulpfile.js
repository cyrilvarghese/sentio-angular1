'use strict';

var gulp = require('gulp');
var gulpNgConfig = require('gulp-ng-config');
gulp.paths = {
    src: 'src',
    dist: 'dist',
    tmp: '.tmp',
    e2e: 'e2e'
};

require('require-dir')('./gulp');

gulp.task('build', ['clean'], function() {
    gulp.start('buildapp');
});


gulp.task('build', ['clean'], function() {
    gulp.start('buildapp');
});

gulp.task('configure:prod', function() {

    gulp.src('configfile.json')
        .pipe(gulpNgConfig('app.config'))
        .pipe(gulp.dest('.'))
});
gulp.task('configure', function() {

    gulp.src('configfileProd.json')
        .pipe(gulpNgConfig('app.config'))
        .pipe(gulp.dest('.'))
});
