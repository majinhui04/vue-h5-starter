// 自定义
import 'babel-polyfill';
import Vue from 'vue';
import router from '@/router';
import '@/components/global';
import '@/third-party';
import '@/router/intercept';
import App from './app.vue';
import '@/assets/styles/app.less';
import VueI18n from 'vue-i18n';
import messages from '@/i18n';
import store from '@/store';
const locale = 'zh-cn'; // zh-cn or en-us
Vue.use(VueI18n);
const i18n = new VueI18n({
    locale, // 设置地区
    messages // 设置地区信息
});

Vue.prototype.$redirect = function (data) {
    this.$router.push(data);
};
Vue.prototype.$goBack = function (data) {
    history.go(-1);
};
Vue.config.productionTip = false;
window.myApp.instance = new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app');
