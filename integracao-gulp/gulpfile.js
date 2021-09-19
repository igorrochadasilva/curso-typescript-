const { series, parallel, src, dest } = require('gulp')
const del = require('del')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const tsify = require('tsify')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')

function limparDist() {
    return del(['dist']) //deleta a pasta dist
}

function copiarHTML(cb) {
    return src('public/**/*')//o **/* copia toda a hierarquia de pastas
        .pipe(dest('dist'))//seleciona os arquivos e joga para pasta dist os arquivos copiados
}

function gerarJS(cb) {
    return browserify({
        basedir: '.',
        entries: ['src/main.ts']
    })
        .plugin(tsify) //gerar o javascript
        .bundle() //gerar o bundle
        .pipe(source('app.js')) //gerar o source string
        .pipe(dest('dist')) // mandar pra pasta de destino
}

function gerarJSProducao() {
    return src('dist/app.js') // selecionar dist
        .pipe(rename('app.min.js')) //renomear file
        .pipe(uglify()) //minificar arquivo
        .pipe(dest('dist')) // jogar na pasta dest
}

exports.default = series(
    limparDist,
    parallel(gerarJS, copiarHTML),
    gerarJSProducao
)