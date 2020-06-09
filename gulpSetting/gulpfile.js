var fileinclude = require('gulp-file-include');
var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');

//파일 인크루드
gulp.task('fileinclude', function(){
    gulp.src(['app/src/*.html'])
    .pipe(fileinclude({
        prefix:'@@',
        basepath:'@file'
    }))
    .pipe(gulp.dest('./end'));
})

// Sass
gulp.task('sass', function(){
    return gulp.src('app/css/*.scss')
    .pipe(sass({outputStyle : 'compact'}).on('error', sass.logError))
    .pipe(gulp.dest('end/css'));
});

gulp.task('sass:watch', function(){
    gulp.watch('app/css/*.scss', ['sass']);
});


gulp.task('connect', function(){
    connect.server({
        root: 'end',
        livereload: true,
        port: 3000
    });
});

gulp.task('html', function(){
    gulp.src('app/src/index.html')
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest('end'))
    .pipe(connect.reload());
});

gulp.task('watch', function(){
    gulp.watch(['app/**/*.html'], ['html']); // html 리로드
    gulp.watch(['app/css/*.scss'], ['sass']); // sass 자동 컴파일
});

gulp.task('default', ['html','connect', 'watch']);
