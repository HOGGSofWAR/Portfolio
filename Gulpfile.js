const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const server = require("browser-sync").create();
const fileinclude = require("gulp-file-include");
const clean = require("gulp-clean");
const jsImport = require("gulp-js-import");
const cssmin = require("gulp-cssmin");
const uglify = require("gulp-uglify");
// const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const cssbeautify = require("gulp-cssbeautify");
const htmlbeautify = require("gulp-html-beautify");
const embedSvg = require("gulp-embed-svg");

function reload(done) {
  server.reload();
  done();
}

function serve() {
  server.init({
    server: {
      baseDir: "docs",
    },
  });
}

function html() {
  return src("src/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "./src/assets/partials",
      })
    )
    .pipe(
      embedSvg({
        root: "./src/assets/svgs",
      })
    )
    // .pipe(htmlbeautify())
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("docs"));
}

function css() {
  return src("src/assets/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      cssbeautify({
        indent: "  ",
        openbrace: "separate-line",
        autosemicolon: true,
      })
    )
    .pipe(cssmin())
    .pipe(dest("docs/assets/css"));
}

function js() {
  return (
    src("src/assets/js/main.js")
      .pipe(
        jsImport({
          hideConsole: true,
        })
      )
      // .pipe(concat('all.js'))
      //   .pipe(gulpIf(isProd, uglify()))
      // .pipe(uglify())
      .pipe(dest("docs/assets/js"))
  );
}

function img() {
  return (
    src("src/assets/images/**/*")
      // .pipe(imagemin())
      .pipe(dest("docs/assets/images/"))
  );
}

function video() {
  return (
    src("src/assets/videos/**/*")
      .pipe(dest("docs/assets/videos/"))
  );
}

function fonts() {
  return src("src/assets/fonts/*.{eot,svg,ttf,woff,woff2}").pipe(
    dest("docs/assets/fonts/")
  );
}

function watchFiles() {
  watch("src/**/*.html", series(html, reload));
  watch("src/assets/**/*.scss", series(css, reload));
  watch("src/assets/**/*.js", series(js, reload));
  watch("src/assets/img/**/*.*", series(img));
  watch("src/assets/videos/**/*.*", series(video));
  watch("src/assets/**/*.{eot,svg,ttf,woff,woff2}", series(fonts));

  return;
}

function del() {
  return src("docs/*", { read: false }).pipe(clean());
}

exports.css = css;
exports.html = html;
exports.js = js;
exports.fonts = fonts;
exports.img = img;
exports.del = del;
exports.serve = parallel(html, css, js, img, video, fonts, watchFiles, serve);
exports.default = series(del, html, css, js, img, video, fonts);
