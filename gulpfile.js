var gulp = require('gulp'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    fontName = 'seti';

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

gulp.task('icon', ['font']);
gulp.task('icons', ['font']);
