var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    $ = require('gulp-load-plugins')(),
    del = require('del'),
    runSequence = require('run-sequence');

	
//TODO: add different build environments in json config

// browser sync for sass
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('lint', function () {
	gulp.src('./app/**/*.js')
        .pipe(jshint())
			.pipe(jshint.reporter(stylish))
			.pipe(jshint.reporter('error'));;
});

// minify CSS
gulp.task('minify-css', function() {
    gulp.src(['./styles/**/*.css', '!./styles/**/*.min.css'])
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe($.minifyCss({
            keepBreaks: true
        }))
        .pipe(gulp.dest('./styles/'))
        .pipe(gulp.dest('./_dist/css/'));
});

// minify HTML
gulp.task('minify-html', function() {
    var opts = {
        comments: true,
        spare: true,
        conditionals: true
    };

    gulp.src('./*.html')
        .pipe($.minifyHtml(opts))
        .pipe(gulp.dest('./_dist/'));
});

// start webserver
gulp.task('server', function(done) {
    return browserSync({
        server: {
            baseDir: './'
        }
    }, done);
});

// build dist
gulp.task('build', function(done) {
    return browserSync({
        server: {
            baseDir: './_dist/'
        }
    }, done);
});

// delete dist folder
gulp.task('clean:dist', function(cb) {
    del([
        './_dist/'
    ], cb);
});

// concat javascript files
// TODO: concat libraries
gulp.task('concat', function() {
    gulp.src('./app/**/*.js')
        .pipe($.concat('scripts.js'))
        .pipe(gulp.dest('./_dist/'));
});

// sass task, used in browser sync
gulp.task('sass', function() {
    return gulp.src('app/main.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            style: 'expanded'
        }))
        .on('error', $.notify.onError({
            title: 'SASS Failed',
            message: 'Error(s) occurred during compile!'
        }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('styles'))
        .pipe(reload({
            stream: true
        }))
        .pipe($.notify({
            message: 'Styles task complete'
        }));
});

// sass build
gulp.task('sass:dist', function() {
    var s = $.size();

    return gulp.src('app/main.scss')
        .pipe($.sass({
            style: 'compact'
        }))
        .pipe($.autoprefixer('last 3 version'))
        .pipe($.uncss({
            html: ['./index.html', './app/**/*.html'],
            ignore: [
                '.index',
                '.slick',
                /\.owl+/,
                /\.owl-next/,
                /\.owl-prev/
            ]
        }))
        .pipe($.minifyCss({
            keepBreaks: true,
            aggressiveMerging: false,
            advanced: false
        }))
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('_dist/css'))
        .pipe(s)
        .pipe($.notify({
            onLast: true,
            message: function() {
                return 'Total CSS size ' + s.prettySize;
            }
        }));
});

// BUGFIX: warning: possible EventEmitter memory leak detected. 11 listeners added.
require('events').EventEmitter.prototype._maxListeners = 100;

// index.html build
// script/css concatenation
gulp.task('usemin', function() {
    return gulp.src('./index.html')
        // add templates path
        .pipe($.htmlReplace({
            'templates': '<script type="text/javascript" src="js/templates.js"></script>'
        }))
        .pipe($.usemin({
            css: [$.minifyCss(), 'concat'],
            libs: [$.uglify()],
            nonangularlibs: [$.uglify()],
            angularlibs: [$.uglify()],
            appcomponents: [$.uglify()],
            mainapp: [$.uglify()]
        }))
        .pipe(gulp.dest('./_dist/'));
});

// reload all Browsers
gulp.task('bs-reload', function() {
    browserSync.reload();
});

// calculate build folder size
gulp.task('build:size', function() {
    var s = $.size();

    return gulp.src('./_dist/**/*.*')
        .pipe(s)
        .pipe($.notify({
            onLast: true,
            message: function() {
                return 'Total build size ' + s.prettySize;
            }
        }));
});


// default task to be run with `gulp` command
// this default task will run BrowserSync & then use Gulp to watch files.
// when a file is changed, an event is emitted to BrowserSync with the filepath.
gulp.task('default', ['browser-sync', 'sass', 'minify-css'], function() {
    gulp.watch('styles/**/*.css', function(file) {
        if (file.type === "changed") {
            reload(file.path);
        }
    });
    gulp.watch(['*.html', 'app/**/*.html'], ['bs-reload']);
    gulp.watch(['app/**/*.js', 'components/**/*.js', 'js/*.js'], ['bs-reload']);
    gulp.watch('app/**/*.scss', ['sass', 'minify-css']);
});




gulp.task('build', function(callback) {
    runSequence(
        'clean:dist',
        'sass:dist',
        'usemin',
        'build:size',
        callback);
});