// src sirve para Buscar un archivo
// dest sirve para Guardar un archivo
// watch sirve para seguir compilando
const {src, dest, watch, parallel} = require("gulp");
// CSS
const sass = require("gulp-sass")(require('sass'))
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps")

// Imagenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

// JavaScripts
const tercer = require("gulp-terser-js");

function css (done) {
    
    src('src/scss/**/*.scss')// identificar el archivo SASS
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe( sass() ) // compilar
    .pipe(postcss([autoprefixer(), cssnano() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest("docs/css"))// almacenarla en el disco duro

    done();// callback que avisa a gulp cuando llegamos al final
}
function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('docs/img'))

    done();
}
function versionWebp(done) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
    .pipe( webp(opciones) )
    .pipe( dest("docs/img"))

    done();
}
function versionAvif(done) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
    .pipe( avif(opciones) )
    .pipe( dest("docs/img"))

    done();
}
function javascript(done) {

    src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe( tercer() )
    .pipe(sourcemaps.write("."))
    .pipe(dest('docs/js'))

    done();
}
function dev (done) {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript)

    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp,versionAvif,javascript, dev);