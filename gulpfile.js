/* eslint-env node */

'use strict';

const eslint = require('gulp-eslint');
const gulp = require('gulp');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const webpack = require('webpack-stream');

const SOURCE_PATH = 'src/event-dispatcher.js';
const DIST_FOLDER_PATH = 'bin/';

/**
 * Lint all Javascript files with ESLint.
 */
gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**', '!bin/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

/**
 * Compile source to ES2015 compatible webpack non-minified bundle.
 */
gulp.task('compile-es2015', function() {
  return gulp.src(SOURCE_PATH)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(DIST_FOLDER_PATH));
});

/**
 * Compile source to ES2015 compatible webpack minified bundle.
 */
gulp.task('compile-es2015-min', function() {
  return gulp.src(SOURCE_PATH)
    .pipe(webpack(require('./webpack.prod.config.js')))
    .pipe(gulp.dest(DIST_FOLDER_PATH));
});

/**
 * Copy source ES2016 module to Bin as well for consumers who want to optimized by themselves.
 */
gulp.task('compile-es2016', function() {
  return gulp.src(SOURCE_PATH)
    .pipe(rename('event-dispatcher.es2016.js'))
    .pipe(gulp.dest(DIST_FOLDER_PATH));
});

gulp.task('default', ['lint'], function(done) {
  return runSequence('compile-es2015', 'compile-es2015-min', 'compile-es2016', done);
});
