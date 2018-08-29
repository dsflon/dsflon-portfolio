/***************************************
** Root path name
***************************************/
const ROOT_PATH_NAME = 'public';

/***************************************
** SCSS Setting
***************************************/
const SCSS_ENTRY = {
    'assets/css/style': './src/scss/style.scss'
}
const SCSS_SOURCE_MAP_STYLE = 'inline-source-map'; // 'inline-source-map', 'source-map', etc.


/***************************************
** JS Setting
***************************************/
const ENTRY = {
    'assets/js/bundle': './src/js/main.js'
}
const SOURCE_MAP_STYLE = 'inline-source-map'; // 'inline-source-map', 'source-map', etc.


/***************************************
** devServer Setting
***************************************/
const DEV_SERVER = {
    contentBase: ROOT_PATH_NAME,
    // open: true,
    port: 5004,
    host: '0.0.0.0',
    watchContentBase: true,
    historyApiFallback: true
}


/***************************************
** Webpack Config
***************************************/
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let mode = process.argv.indexOf("production") !== -1 ? 'production' : 'development';
if( process.argv.indexOf("--watch") !== -1 ) mode = 'development';
let isDev = (mode === 'development');
let scssMinimize = (process.env.npm_lifecycle_event !== 'build:dev');

module.exports = [
    {

        // メインのJS
        entry: ENTRY,

        // 出力ファイル
        output: {
            //  出力ファイルのディレクトリ名
            path: `${__dirname}/${ROOT_PATH_NAME}`,
            filename: '[name].js'
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['env', 'react']
                            }
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    // 対象となるファイルの拡張子
                    test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
                    // 画像をBase64として取り込む
                    loader: 'url-loader'
                }
            ]
        },

        resolve: {
            extensions: ['.js'],
        },
        devtool: (isDev ? SOURCE_MAP_STYLE : ''),
        devServer: DEV_SERVER,
        performance: { hints: false },

        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /three|tween.js|react|react-dom|react-router-dom|redux|react-redux/,
                        name: "assets/js/vendor",
                        chunks: "initial",
                        enforce: true,
                    },
                },
            },
        }

    },

    {
        stats: { children: false },
        cache: true,
        watchOptions : {
            aggregateTimeout: 300
        },
        entry: SCSS_ENTRY,
        output: {
            path: `${__dirname}/${ROOT_PATH_NAME}`,
            filename: '[name].css'
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            { // CSSをバンドルするための機能
                                loader: 'css-loader',
                                options: {
                                    sourceMap: isDev,
                                    importLoaders: 2,
                                    minimize: scssMinimize
                                }
                            },
                            { // autoprefixer を利用するために postcss を利用
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: isDev
                                }
                            },
                            { // Sassをバンドルするための機能
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: isDev
                                }
                            }
                        ]
                    })
                },
                {
                    // 対象となるファイルの拡張子
                    test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
                    // 画像をBase64として取り込む
                    loader: 'url-loader'
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('[name].css')
        ],
        devtool: (isDev ? SCSS_SOURCE_MAP_STYLE : ''),
        performance: { hints: false },
    }
]

console.log("-------------------------------------------------------");
console.log("mode: " + mode);
console.log("-------------------------------------------------------");
