const path = require('path');
const pkg = require('./package.json');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const YAML = require('yamljs');
const _config = YAML.load('./_config.yml');
const glob = require('glob');
const pages = {};
const sites = _config.sites;
_config.date = new Date().toString();
_config.version = pkg.version;

function resolve(dir) {
    return path.join(__dirname, dir);
}
const port = _config.devServer.port;
const proxy = _config.proxy;
const isProd = process.env.NODE_ENV === 'production';
const targetUrl = proxy.targetUrl || `http://localhost:${port}/mock`;
console.log('VUE_APP_BASE_TARGET:::', targetUrl);
const externals = {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    vant: 'vant',
    axios: 'axios'
};
// cdn
const cdn = {
    // 开发环境
    dev: {
        css: ['/npm/vant@2.5.2/lib/css/index.css'],
        js: []
    },
    // 生产环境
    build: {
        css: ['https://cdn.jsdelivr.net/npm/vant@2.5.2/lib/index.css'],
        js: [
            // 'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.4.4/polyfill.js',
            // 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js',
            'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.1.3/vue-router.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/vuex/3.1.2/vuex.min.js',
            'https://cdn.jsdelivr.net/npm/vant@2.5.2/lib/vant.min.js'
        ]
    }
};
glob.sync('./src/pages/**/main.js').forEach(path => {
    const chunk = path.split('./src/pages/')[1].split('/main.js')[0];
    if (sites[chunk]) {
        pages[chunk] = {
            entry: path,
            template: 'public/index.html',
            apple: 'favicon.png',
            ...sites[chunk]
        };
    }
});
let webpackConfig = {
    ..._config.webpack
};
// 打包
if (isProd) {
    webpackConfig = {
        ..._config.webpack,
        ..._config.deploy
    };
}
module.exports = {
    pages,
    ...webpackConfig,
    configureWebpack: config => {
        if (isProd) {
            // externals里的模块不打包
            Object.assign(config, {
                externals: externals
            });
            if (process.env.VUE_APP_MODE === 'production') {
                config.optimization = {
                    // 默认命名 连接符
                    splitChunks: {
                        automaticNameDelimiter: '.'
                    },
                    minimizer: [
                        new TerserPlugin({
                            terserOptions: {
                                compress: {
                                    drop_debugger: true,
                                    drop_console: true
                                }
                            }
                        })
                    ]
                };
            }
        }
        // 生产环境打包分析体积
        if (
            process.env.NODE_ENV === 'production' &&
            process.env.npm_config_report
        ) {
            return {
                plugins: [new BundleAnalyzerPlugin()]
            };
        }
    },
    // 允许对内部的 webpack 配置进行更细粒度的修改。
    chainWebpack: config => {
        // CLI内部webpack配置
        config.plugins.delete('preload'); // TODO: need test
        config.plugins.delete('prefetch'); // TODO: need test
        /**
         * 单页配置 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
         */
        // 生产环境注入cdn + 多页面
        glob.sync('./src/pages/**/main.js').forEach(path => {
            const chunk = path.split('./src/pages/')[1].split('/main.js')[0];
            if (sites[chunk]) {
                config.plugin('html-' + chunk).tap(args => {
                    if (process.env.NODE_ENV === 'production') {
                        args[0].cdn = cdn.build;
                    }
                    if (process.env.NODE_ENV === 'development') {
                        args[0].cdn = cdn.dev;
                    }
                    return args;
                });
            }
        });
        // config.plugin('html').tap(args => {
        //     if (process.env.NODE_ENV === 'production') {
        //         args[0].cdn = cdn.build;
        //     }
        //     if (process.env.NODE_ENV === 'development') {
        //         args[0].cdn = cdn.dev;
        //     }
        //     return args;
        // });
        // 注入全局样式
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type =>
            addStyleResource(config.module.rule('less').oneOf(type))
        );
        // 命名
        config.resolve.alias.set('@', resolve('src'));
        // 打包文件带hash
        config.output.filename('[name].[hash].js').end();
        // config.output.chunkFilename('vendors.[contenthash].js').end();

        // 为了补删除换行而加的配置
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                // modify the options...
                options.compilerOptions.preserveWhitespace = true;
                return options;
            });
        // 把动态配置合并到process.env
        config.plugin('define').tap(args => {
            const name = 'process.env';
            // 使用 merge 合并，保证原始值不变
            args[0][name] = merge(args[0][name], {
                _config: JSON.stringify(_config)
            });
            return args;
        });
    },
    devServer: {
        ..._config.devServer,
        host: '0.0.0.0',
        disableHostCheck: true,
        // 配置自动启动浏览器
        proxy: {
            // change xxx-api/login => mock/login
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            [proxy.baseUrl]: {
                target: targetUrl,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + proxy.baseUrl]: ''
                }
            },
            '/cdn': {
                target: 'http://cdn.eyassx.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/cdn': ''
                }
            }
        },
        after: require('./mock/mock-server.js')
    }
};

// 全局样式 变量、函数
function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                resolve('src/assets/styles/variables.less'),
                resolve('src/assets/styles/mixin.less')
            ]
        });
}
