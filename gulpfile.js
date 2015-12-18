var gulp = require('gulp');
var jade = require('gulp-jade');
var babel = require('gulp-babel');
var ghPages = require('gulp-gh-pages');

var debug = require('gulp-debug');





var srcPath = './src/';
var src = {
  js: srcPath + 'js/',
  jade: srcPath,
  css: srcPath + 'css/',
  img: srcPath + 'img/',
  fonts: srcPath + 'fonts/',
};

var destPath = './dist/';
var dest = {
  js: destPath + 'js/',
  jade: destPath,
  css: destPath + 'css/',
  img: destPath + 'img/',
  fonts: destPath + 'fonts/',
};

var babelConfig = {
  presets: ['es2015']
};





gulp.task('default', ['build']);

gulp.task('build', ['js', 'jade', 'css', 'img', 'other']);

gulp.task('other', function() {
  return gulp.src(src.fonts + '/**')
    .pipe(gulp.dest(dest.fonts));
});

gulp.task('img', function() {
  return gulp.src(src.img + '/**')
    .pipe(gulp.dest(dest.img));
});

gulp.task('jade', function() {
  return gulp.src(src.jade + '/**.jade')
    .pipe(jade())
    .pipe(gulp.dest(dest.jade));
});

gulp.task('css', function() {
  return gulp.src(src.css + '/**.css')
    .pipe(gulp.dest(dest.css));
});

gulp.task('js', function() {
  return gulp.src(src.js + '/**.js')
    .pipe(babel(babelConfig))
    .pipe(gulp.dest(dest.js));
});

gulp.task('watch', ['build'], function() {
  gulp.watch(src.js + '/**.js', ['js']);
  gulp.watch(src.jade + '/**.jade', ['jade']);
  gulp.watch(src.css + '/**.css', ['css']);
  gulp.watch(src.img + '/**.img', ['img']);
});

gulp.task('deploy', ['build'], function() {
  return gulp.src(destPath + '/**/*')
    .pipe(ghPages({
      branch: 'master'
    }));
});
