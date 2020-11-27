const path = require('path')
const fs = require('fs')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // Clean folder dist
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// const TerserWebpackPlugin = require('terser-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const PATHS = {
    src: path.resolve(__dirname, '../src'), // src/index.js
    dist: path.resolve(__dirname, '../dist'),
    assets: 'assets'
}
//const isDev = process.env.NODE_ENV === 'development'
//const isProd = !isDev


// const optimize = () => {
//     const config = {}
//     if (isProd) {
//         config.minimizer = [
//             new CssMinimizerPlugin(),
//             new TerserWebpackPlugin()
//         ]
//     }
//     return config
// }
//const getFilename = ext => isProd ? `[name].[fullhash].${ext}` : `[name].${ext}`
/**
 * Css, Sass, Scss
 */
// const cssLoaders = extra => {
//     const loader = [{
//         loader: MiniCssExtractPlugin.loader,
//         options: { publicPath: path.resolve(__dirname, 'src') }
//     }, 'css-loader']
//     if (extra) {
//         loader.options[config] = ''
//         loader.push(extra)
//     }
//     return loader;
// }
const PAGES_DIR = `${PATHS.src}/pug/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
    externals: {
        paths: PATHS
    },
    context: PATHS.src,
    entry: {
        app: ['@babel/polyfill', PATHS.src]
    },
    output: {
        filename: `${PATHS.assets}/js/[name].[contenthash].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    resolve: {
        // extensions: [],
        alias: {
            '@': PATHS.src
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}/css/[name].[hash].css`,
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${PATHS.src}/static`,
                    to: PATHS.dist
                },
                {
                    from: `${PATHS.src}/assets/images`,
                    to: `${PATHS.dist}/assets/images`
                },
                {
                    from: `${PATHS.src}/assets/fonts`,
                    to: `${PATHS.dist}/assets/fonts`
                }
            ]
        }),
        ...PAGES.map(page => new HtmlWebpackPlugin({ // pug
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/, '.html')}`
        }))
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: ['pug-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    process.env.NODE_ENV !== "production"
                        ? "style-loader"
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: './postcss.config.js' // minify
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                    }
                ]
            },
            {
                test: /.(jpe?g|png|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }

            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            }
        ]
    },
    //optimization: optimize(), // minify
    //devtool: isDev ? 'source-map' : 'inline-source-map'
};