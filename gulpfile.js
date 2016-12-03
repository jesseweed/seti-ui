var fontName    = 'seti',
    gulp        = require('gulp'),
    iconfont    = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    svgmin      = require('gulp-svgmin');

gulp.task('font', function(){
  gulp.src(['./icons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: './styles/_fonts/_template.less',
      targetPath: '../seti.less/',
      fontPath: './styles/_fonts/seti/'
    }))
    .pipe(iconfont({
      normalize: true,
      fontName: fontName,
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg']
     }))
    .pipe(gulp.dest('./styles/_fonts/seti/'));
});

gulp.task('icon', ['svg', 'font']);
gulp.task('icons', ['svg', 'font']);

gulp.task('svg', function() {
  gulp.src('./icons/*.svg')
      .pipe(svgmin())
      .pipe(gulp.dest('./icons'));
});
