// Require gulp
var gulp = require('gulp'); 

// Include Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');

// Lint our javascript
gulp.task('lint', function() {
    return gulp.src('src/*.js')
          .pipe(jshint())
          .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('src/*.scss')
        .pipe(sass())
        .pipe(rename('alajo.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('build/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/*.js')
        .pipe(concat('alajo.min.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(rename('alajo.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/*.js', ['lint', 'scripts']);
    gulp.watch('src/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
