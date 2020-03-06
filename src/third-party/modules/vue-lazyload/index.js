import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import axios from 'axios';
Vue.use(VueLazyload, {
    lazyComponent: true,
    preLoad: 1.3,
    attempt: 3,
    // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
    listenEvents: ['scroll'],
    // adapter: {
    //     loaded({
    //         bindType,
    //         el,
    //         naturalHeight,
    //         naturalWidth,
    //         $parent,
    //         src,
    //         loading,
    //         error,
    //         Init
    //     }) {
    //         // do something here
    //         // example for call LoadedHandler
    //         console.log('src', src)
    //     },
    //     loading(listender, Init) {
    //         const src = listender.src;
    //         //listender.src = 'https://manhua.qpic.cn/operation/0/05_17_14_0a557a22c73f26bc8dbe4efdadb86524_1572945269304.jpg/0'
    //         //return;
    //     },
    //     error(listender, Init) {
    //         console.log('error', listender.src)
    //     }
    // },
    filter: {
        progressive(listener, options) {
            const isCDN = /qiniudn.com/;
            if (isCDN.test(listener.src)) {
                listener.el.setAttribute('lazy-progressive', 'true');
                listener.loading = listener.src + '?imageView2/1/w/10/h/10';
            }
        },
        webp(listener, options) {
            const src = listener.src;
            const isCDN = /\.data/;
            if (isCDN.test(listener.src)) {
                axios
                    .get(listener.src, {
                        responseType: 'arraybuffer'
                    })
                    .then(res => {
                        const oldArrayBuffer = res.data;
                        const oldTypedArray = new Int8Array(oldArrayBuffer);
                        const newTypedArray = new Int8Array(
                            oldArrayBuffer.byteLength + 2
                        );
                        newTypedArray.set([0xff, 0xd8], 0);
                        newTypedArray.set(oldTypedArray, 2);
                        const blob = new Blob([newTypedArray], {
                            type: 'application/octet-stream'
                        });
                        const result = window.URL.createObjectURL(blob);
                        listener.src = result;
                        console.log('ok');
                    })
                    .catch(err => {
                        console.error(src, err);
                    });
            }
        }
    }
});
