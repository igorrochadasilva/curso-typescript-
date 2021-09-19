const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'production', // development
    entry: './src/main.ts', //ponto de entrada, a partir desse arquivo, ele acha o restante
    devServer: {  //devServer configuração
        contentBase: path.join(__dirname, 'dist'),
        port: 9000,
        hot: true
    },
    output: { //pasta de saida
        filename: 'app.min.js',//nome do bundle final
        path: path.join(__dirname, 'dist') //local que sera gerado o app.min.js
    },
    plugins: [
        new CopyPlugin([
            { from: 'public' }, //plugin copiar files
        ])
    ],
    resolve: {
        extensions: [ '.ts', '.js' ] //extensões que ele vai precisar resolver
    },
    module: {   //regras e como sera tratado
        rules: [{
            test: /\.ts$/, //quais arquivos seram processados?, os arquivos com final .ts
            use: 'ts-loader', //o ts-loader irá processar esse cara
            exclude: /node_modules/ //excluir node_modules
        }]
    }
}