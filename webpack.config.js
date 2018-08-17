let path = require("path");
// const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = () => ({
    entry: {
        app: [
            './index.js'
        ]
    },
    mode: "development",
    output: {
        path: path.resolve(__dirname + '/build'),
        filename: 'elm-app.js',
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: [/node_modules/, /bower_components/],
                loader: 'file-loader?name=[name].[ext]',
            },
            {
                test: /\.elm$/,
                exclude: [/elm-stuff/, /node_modules/],
                loader: 'elm-webpack-loader?verbose=true&warn=true',
            }
        ],
        noParse: /\.elm$/,
    },
    devServer: {
        inline: true,
        stats: {colors: true},
    },
});