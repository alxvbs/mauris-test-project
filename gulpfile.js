var gulp = require('gulp'),
	pug = require('gulp-pug'),
	stylus = require('gulp-stylus'),
	autoprefixer = require('autoprefixer-stylus'),
	myth = require('gulp-myth'),
	imagemin = require('gulp-imagemin'),
	clean = require('gulp-clean'),
	connect = require('gulp-connect');

gulp.task('pug', function() {
	return gulp.src('./src/tmpl/*.pug')
		.pipe(pug({pretty: true}))
		.on('error', console.log)
		.pipe(gulp.dest('./public/'))
		.pipe(connect.reload());
});

gulp.task('stylus', function() {
	return gulp.src('./src/stylus/*.styl')
		.pipe(stylus({
			use: [autoprefixer('last 2 versions')]
		}))
		.pipe(myth())
		.on('error', console.log)
		.pipe(gulp.dest('./public/css/'))
		.pipe(connect.reload());
});

gulp.task('images', function() {
	return gulp.src('./src/img/*')
		.pipe(imagemin())
		.on('error', console.log)
		.pipe(gulp.dest('./public/img/'))
		.pipe(connect.reload());
});

gulp.task('connect', function() {
	connect.server({
		name: 'Mauris Test Project',
		root: 'public',
		port: 8000,
		livereload: true
	});
});

gulp.task('clean', function () {
	return gulp.src('public/*', {read: false})
		.pipe(clean());
});

gulp.task('build', ['clean'], function() {
	gulp.run('pug', 'stylus', 'images');
});

gulp.task('watch', function() {
	gulp.run('build');
	gulp.watch(['src/tmpl/*.pug'], ['pug']);
	gulp.watch(['src/stylus/*.styl'], ['stylus']);
	gulp.watch(['src/img/*'], ['images']);
	gulp.watch(['src/fonts/*/**'], ['fonts']);
});

gulp.task('default', ['connect', 'watch']);