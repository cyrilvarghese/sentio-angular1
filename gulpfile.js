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

gulp.task('build', ['clean','configure'], function() {
    gulp.start('buildapp');
});


gulp.task('build:prod', ['clean','configure:prod'], function() {
    gulp.start('buildapp');
});

gulp.task('configure', function() {

    gulp.src('devconfig/configfile.json')
        .pipe(gulpNgConfig('app.config'))
        .pipe(gulp.dest('./src/app'))
});
gulp.task('configure:prod', function() {

    gulp.src('prodconfig/configfile.json')
        .pipe(gulpNgConfig('app.config'))
        .pipe(gulp.dest('./src/app'))
});
