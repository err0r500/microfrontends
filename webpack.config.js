let path = require("path");

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
                exclude: /node_modules/,
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