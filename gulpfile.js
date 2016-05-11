var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var reload = browserSync.reload;

/* ========================================================
 * Tasks with Browser Sync
 * ======================================================== */
gulp.task('browserSync', function() {

    var files = [
        '*.css',
        '*.php',
        './inc/*.php',
        './inc/js/*.js',
        './inc/sass/*.scss',
        './inc/sass/**/*.scss',
    ];

    browserSync.init(files, {
        proxy: "http://localhost/gamalardi/",
        notify: 'false'
    });
});

gulp.task('sass', function() {
    return gulp.src('./inc/sass/main.scss')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./')) //output the file at root (app/)
        .pipe(reload({ stream: true }));
});

gulp.task('js', function() {
    return gulp.src([
            './node_modules/jquery/dist/jquery.js',
            './node_modules/fastclick/lib/*.js',
            './node_modules/slick-carousel/slick/slick.js',
            './inc/js/main.js',
        ])
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./'))
        .pipe(reload({ stream: true }));
});


gulp.task('default', ['sass', 'js', 'browserSync'], function() {
    gulp.watch('*.scss', {cwd: './inc/sass/'}, ['sass']);
    gulp.watch('**/*.scss', {cwd: './inc/sass/'}, ['sass']);
    gulp.watch('*.js', {cwd: './inc/js/'}, ['js']);
});
