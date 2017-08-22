const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css'); //压缩css
const path = require('path');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const imagemin = require('gulp-imagemin'); //图片压缩
const uglify = require('gulp-uglify'); //压缩js
const rename = require("gulp-rename");
const babel = require("gulp-babel");


// 静态服务器 + 监听 less/html 文件
gulp.task('serve', ['less'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch("./src/less/**/*.less", ['less']);
    gulp.watch("./pages/*.html").on('change', reload);
    gulp.watch("./dist/js/*.js").on('change', reload);
    gulp.watch("./dist/css/*.css").on('change', reload);
});


/*
 * 对less进行编译并压缩
 */
gulp.task('less', function() {
    gulp.src('./src/less/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: 'last 2 versions'
        }))
        .pipe(cleanCSS({ compatibility: 'ie7' }))
        .pipe(sourcemaps.write("."))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/css'));
});


/*
 * 图片进行压缩
 */
gulp.task('imagemin', function() {
    gulp.src('./src/images/*.{jpg,png}')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
});


/*
 * 压缩js
 */
gulp.task('script', function() {
    gulp.src('./src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write("."))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/js'))
})


/*
 *
 */

gulp.task('dev', ['serve'], function() {
    gulp.watch('src/js/*.js', ['script']);
});