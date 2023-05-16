// Initialize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const browsersync = require('browser-sync').create();

// Sass Task
function scssTask() {
  return src('app/scss/style.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('dist', { sourcemaps: '.' }));
}

// Browsersync
function browserSyncServe(cb) {
  browsersync.init({
    server: { baseDir: '.' },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
      },
    },
  });
  cb();
}

function browserSyncReLoad(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch('*.html', browserSyncReLoad);
  watch(['app/scss/**/*.scss'], series(scssTask, browserSyncReLoad));
}

// Default Gulp Task
exports.default = series(scssTask, browserSyncServe, watchTask);
