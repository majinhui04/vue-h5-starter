/* eslint-disable */
import router from './index';
import store from '@/store';

// 路由导航守卫
router.beforeEach((to, from, next) => {
    // 假如缓存页面跳转到其他页面则不缓存
    if (from.meta.keepAlive && from.meta.aliveOnlyTo) {
        if (!from.meta.aliveOnlyTo.includes(to.name)) {
            console.log('不缓存',from.name);
            store.commit('router/ADD_EXCLUDE_VIEW', from);
        }
    }
    next();
});

router.afterEach((to, from) => {
    const title = to.meta.title || '';
    let body = document.body;
    title && setDocumentTitle(title);
    // 只要跳转到缓存页面则默认缓存
    if (to.meta.keepAlive && to.meta.aliveOnlyTo) {
        // 假如回退则缓存
        console.log('缓存',to.name);
        store.commit('router/DEL_EXCLUDE_VIEW', to);
    }
    if (to.meta.bodyClass) {
        body.className = to.meta.bodyClass;
    } else {
        body.className = '';
    }
    
});
// 移动端设置title
function setDocumentTitle(title) {
    document.title = title;
    const ua = navigator.userAgent;
    if (/ip(hone|od|ad)/i.test(ua)) {
        var i = document.createElement('iframe');
        i.src = 'javascript:void(0)';
        i.style.display = 'none';
        i.onload = function () {
            setTimeout(function () {
                i.remove();
            }, 9);
        };
        document.body.appendChild(i);
    }
}
