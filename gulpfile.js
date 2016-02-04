var gulp = require('gulp');
var sass = require('gulp-sass');
var static_site = require('gulp-static-site');
 
var paths = {
  sources: 'content/**',
  templates: 'templates/**',
  css: 'vendor/*/css/**',
  sass: 'styles/**',
  fonts: 'vendor/*/fonts/**',
  js: ['js/**', 'vendor/*/js/**'],
};
 
gulp.task('site', function () {
  return gulp
    .src(paths.sources + '/*.md')
    .pipe(static_site())
    .pipe(gulp.dest('build/'))
});
 
gulp.task('sass', function () {
  return gulp
    .src(paths.sass + '/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'));
});
 
gulp.task('css', function () {
  return gulp
    .src(paths.css + '/*.scss')
    .pipe(gulp.dest('build/css'));
});

gulp.task('fonts', function () {
  return gulp
    .src(paths.fonts + '/*')
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('js', function () {
  return gulp
    .src(paths.js.map(function(path) { return path + "/*"; }))
    .pipe(gulp.dest('build/js'));
});

gulp.task('default', ['site','sass','css','fonts','js'], function () {
	gulp.watch([paths.sources, paths.templates], ['site']);
  gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.css, ['css']);
  gulp.watch(paths.fonts, ['fonts']);
  gulp.watch(paths.js, ['js']);
});