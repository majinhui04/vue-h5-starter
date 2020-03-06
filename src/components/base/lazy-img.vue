<template>
    <div ref="wrap" style="" class="lazy-wrap">
        <lazy-component @show="handler" class="lazy" v-if="lazy">
        </lazy-component>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        lazy: {
            type: Boolean,
            default: true
        },
        src: {
            type: String,
            default: ''
        },
        meta: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    name: 'LazyImg',
    data() {
        return {
            loading: false,
            url: '',
            temp: ''
        };
    },
    mounted() {
        if (!this.lazy) {
            this.handler();
        }
    },
    methods: {
        handler() {
            const src = this.src.replace('http://cdn.eyassx.com', '/cdn');
            const title = this.title;

            if (src.indexOf('.data') === -1) {
                return;
            }
            if (this.url) {
                return;
            }
            if (this.loading) {
                return;
            }
            this.loading = true;

            this.$fetchImg({
                url: `${this.src}?title=${title}`,
                retry: 3, // todo 不生效 config中没有这个属性
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
                        type: 'image/jpg'
                        // type: 'application/octet-stream'
                    });
                    const el = this.$refs.wrap;
                    const result = (
                        window.URL || window.webkitURL
                    ).createObjectURL(blob);
                    el.style = `background-image:url(${result});`;
                })
                .catch(err => {
                    console.error(this.meta.title, err);
                });
        }
    }
};
</script>
<style lang="less" scoped>
.lazy-wrap {
    background-color: #ddd;
}
.lazy,
.lazy-wrap {
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
