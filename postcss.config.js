module.exports = {
    plugins: {
        autoprefixer: {},
        'postcss-pxtorem': {
            rootValue: 37.5, // 设计稿宽度的1/10
            unitPrecision: 5, // 小数位
            minPixelValue: 1, // 转换的最小单位
            // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。目前我使用 selectorBlackList字段，来过滤
            // 如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
            selectorBlackList: ['weui', 'mu', 'swiper'], // 忽略的样式, 正则
            propList: ['*'] // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部，正则
        }
    }
};
