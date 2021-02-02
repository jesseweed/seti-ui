var fontName = 'seti',
  gulp = require('gulp'),
  iconfont = require('gulp-iconfont'),
  iconfontCss = require('gulp-iconfont-css'),
  svgmin = require('gulp-svgmin');

exports.font = function font () {
  return gulp.src(['./icons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: './styles/_fonts/_template.less',
      targetPath: '../seti.less/',
      fontPath: './styles/_fonts/seti/'
    }))
    .pipe(iconfont({
      normalize: true,
      fontHeight: 1000,
      fontName: fontName,
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg']
    }))
    .pipe(gulp.dest('./styles/_fonts/seti/'));
};

exports.svg = function svg () {
  return gulp.src('./icons/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./icons'));
};

exports.default = exports.icon = exports.icons = gulp.series([exports.svg, exports.font]);
