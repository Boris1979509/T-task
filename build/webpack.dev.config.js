const path = require('path')
const Webpack = require('webpack').SourceMapDevToolPlugin
const ESLintPlugin = require('eslint-webpack-plugin');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config');

const plugins = () => {
    const base = [
        new Webpack({
            //filename: '[file].map'
        }),
        new ESLintPlugin()
    ]
    // if (isProd) {
    //     base.push(new BundleAnalyzerPlugin())
    // }
    return base
}
const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 8081,
        watchContentBase: true,
        contentBase: baseWebpackConfig.externals.paths.dist,
        overlay: true, // show errors in browser
        //publicPath: path.resolve(__dirname, 'dist'),
        open: true, // auto open browser
        hot: false
    },
    plugins: plugins(),
})
module.exports = new Promise((resolve, reject) => { resolve(devWebpackConfig) })
//module.exports = devWebpackConfig
