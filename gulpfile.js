const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

const ghPages = require('gulp-gh-pages');
const debug = require('gulp-debug');

/* =Config
 *------------------------------------------------------------*/

const srcPath = './src/';
const src = {
  js: srcPath + 'js/',
  pug: srcPath,
  scss: srcPath + 'css/',
  img: srcPath + 'img/',
  fonts: srcPath + 'fonts/',
};

const destPath = './dist/';
const dest = {
  js: destPath + 'js/',
  pug: destPath,
  css: destPath + 'css/',
  img: destPath + 'img/',
  fonts: destPath + 'fonts/',
};

const babelConfig = {
  presets: ['es2015']
};

const sassConfig = {
  outputStyle: 'compact'
};

/* =Tasks
 *------------------------------------------------------------*/

gulp.task('default', ['build']);

gulp.task('build', ['js', 'pug', 'scss', 'img', 'other']);

gulp.task('other', function() {
  return gulp.src(src.fonts + '/**')
    .pipe(gulp.dest(dest.fonts));
});

gulp.task('img', function() {
  return gulp.src(src.img + '/**')
    .pipe(gulp.dest(dest.img));
});

gulp.task('pug', function() {
  return gulp.src(src.pug + '/**.pug')
    .pipe(pug())
    .pipe(gulp.dest(dest.pug));
});

gulp.task('scss', function() {
  return gulp.src(src.scss + '/**.scss')
    .pipe(sass(sassConfig).on('error', sass.logError))
    .pipe(gulp.dest(dest.css));
});

gulp.task('js', function() {
  return gulp.src(src.js + '/**.js')
    .pipe(babel(babelConfig))
    .pipe(gulp.dest(dest.js));
});

gulp.task('watch', ['build'], function() {
  gulp.watch(src.js + '/**.js', ['js']);
  gulp.watch(src.pug + '/**.pug', ['pug']);
  gulp.watch(src.scss + '/**.scss', ['scss']);
  gulp.watch(src.img + '/**.img', ['img']);
});

gulp.task('deploy', ['build'], function() {
  return gulp.src(destPath + '/**/*')
    .pipe(ghPages({
      branch: 'master'
    }));
});
