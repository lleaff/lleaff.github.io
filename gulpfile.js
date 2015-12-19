var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var babel = require('gulp-babel');

var ghPages = require('gulp-gh-pages');
var debug = require('gulp-debug');

/* =Config
 *------------------------------------------------------------*/

var srcPath = './src/';
var src = {
  js: srcPath + 'js/',
  jade: srcPath,
  scss: srcPath + 'css/',
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

var sassConfig = {
  outputStyle: 'compact'
};


/* =Tasks
 *------------------------------------------------------------*/

gulp.task('default', ['build']);

gulp.task('build', ['js', 'jade', 'scss', 'img', 'other']);

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
  gulp.watch(src.jade + '/**.jade', ['jade']);
  gulp.watch(src.scss + '/**.scss', ['scss']);
  gulp.watch(src.img + '/**.img', ['img']);
});

gulp.task('deploy', ['build'], function() {
  return gulp.src(destPath + '/**/*')
    .pipe(ghPages({
      branch: 'master'
    }));
});
