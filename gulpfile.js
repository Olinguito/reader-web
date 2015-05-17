/*eslint-env node*/
var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var nib = require('nib');
var rename = require('gulp-rename');
var ghPages = require('gulp-gh-pages');
var jspm = require('jspm');

var path = {
    src: 'src/',
    scripts: 'src/**/*.js',
    html: 'src/**/*.jade',
    style: 'src/styles/**/*.styl',
    output: '.tmp/',
    out: 'dist/'
};
path.elementsStyleOut = path.output;

var inProd = function() {
    return process.env.NODE_ENV === 'production' ? true : false;
};

gulp.task('clean', function() {
    return gulp.src([path.output])
        .pipe(vinylPaths(del));
});

gulp.task('clean-dist', function() {
    return gulp.src([path.custElementsStyleCompiled, path.output + '**/*.map'])
        .pipe(vinylPaths(del));
});

gulp.task('build-style', function() {
    return gulp.src([path.src + 'styles/app.styl'])
        .pipe(stylus({use: [nib()], import: 'nib', compress: inProd()}))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(path.output));
});

gulp.task('build-html', function() {
    //var lang = 'es'; // TODO: be able to specify language on build

    return gulp.src(path.html)
        .pipe(changed(path.output, {extension: '.html'}))
//        .pipe(data(stringsFile))
        .pipe(jade({pretty: !inProd()}))
        .pipe(gulp.dest(path.output));

//    function stringsFile(file) {
//        var filePath = './strings/' + lang + '/' + p.basename(file.path, '.jade') + '.' + lang + '.json';
//        return fs.existsSync(filePath) ? require(filePath): {};
//    }
});

gulp.task('build', function(callback) {
    process.env.NODE_ENV = 'development';
    return runSequence(
        'clean',
        ['build-style', 'build-html'],
        callback
    );
});

gulp.task('serve', ['build'], function(done) {
    browserSync({
        open: false,
        port: 9000,
        server: {
            baseDir: [path.output, path.src],
            routes: {
                '/vendor': 'vendor'
            },
            middleware: function(req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        }
    }, done);
});

function reportChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('watch', ['serve'], function() {
    gulp.watch(path.scripts, browserSync.reload).on('change', reportChange);
    gulp.watch(path.html, ['build-html', browserSync.reload]).on('change', reportChange);
    gulp.watch(path.style, ['build-style', browserSync.reload]).on('change', reportChange);
});

// bundling/dist/deploy stuff

gulp.task('copy-lib', function() {
    return gulp.src('vendor/{system,es6-module-loader}.js', { base: '.'})
        .pipe(gulp.dest(path.out));
});

gulp.task('copy-assets', function() {
    return gulp.src([path.src + '**/*.{png,jpg,svg,json}', path.src + 'config.js'])
        .pipe(gulp.dest(path.out));
});

gulp.task('jspm-bundle', function(done) {
    var dependencies = [
        'yi/**/*',
        'lib/**/*'
        // ninja dependencies
    ];
    jspm.setPackagePath('.');
    jspm.bundle(
        dependencies.join(' + '),
        path.out + 'build.js',
        {
            minify: true,
            sourceMaps: false
        }
    ).then(done);
});

gulp.task('dist', function(done) {
    path.output = 'dist/';
    path.elementsStyleOut = path.src;
    // manually set NODE_ENV to 'production' // is it the best way?
    process.env.NODE_ENV = 'production';
    return runSequence(
        'clean',
        ['build-elements-style', 'build-style', 'build-html', 'copy-lib', 'copy-assets'],
        ['vulcanize', 'jspm-bundle'],
        'clean-dist',
        done
    );
});

gulp.task('deploy', ['dist'], function() {
    return gulp.src('dist/**/*')
        .pipe(ghPages({force: true}));
});
