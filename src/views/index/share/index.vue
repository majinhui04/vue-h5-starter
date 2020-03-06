<template>
    <div class="page IndexShare">
        <div class="navbar">
            <div class="left"></div>
            <div class="headline">
                <span class="font-18">转发分享</span>
            </div>
            <div class="right"></div>
        </div>
        <div class="body">
            <div class="qrcode mb-12"></div>
            <div class="message font-14 mb-12">
                <p>扫描上方二维码即可跳转至下载页面</p>
                <p>（不建议您使用微信扫一扫）</p>
            </div>
            <div class="mb-12" style="width:255px;">
                <van-button
                    id="copy"
                    round
                    block
                    type="info"
                    class="mb-12"
                    @click="handleShowDialog"
                >
                    <span>复制推广链接</span>
                </van-button>
            </div>

            <div class="message font-12" style="width:254px;">
                <p>
                    点击“复制推广链接”复制链接后，建议直接去浏览器地址栏处粘贴链接，然后下载软件。
                </p>
            </div>
        </div>
        <van-dialog
            class="share-dialog"
            v-model="show"
            title="复制以下链接去分享"
            show-cancel-button
            cancelButtonText="再考虑下"
            confirmButtonText="复制链接"
        >
            <p class="share_info">{{ share_info }}</p>
        </van-dialog>
    </div>
</template>

<script>
import ClipboardJS from 'clipboard';
export default {
    name: 'IndexShare',
    components: {},
    data() {
        return {
            share_link: '',
            share_info: '',
            show: false
        };
    },
    computed: {},
    watch: {},
    created() {
        this.syncData();
    },
    mounted() {
        const clipboard = new ClipboardJS('#copy', {
            text: () => {
                const url = this.share_link;
                console.log(11, url);
                return url;
            }
        });
        clipboard.on('success', () => {
            console.log('复制成功');
        });
        clipboard.on('error', () => {
            console.error('复制失败');
        });
    },
    methods: {
        syncData() {
            this.$api
                .gateway({ opt: 2 })
                .then(res => {
                    this.share_info = res.share_info;
                    this.share_link = res.share_link;
                    console.log('res1', res);
                })
                .catch(err => {
                    console.error(err);
                });
        },
        handleShowDialog() {
            this.show = true;
        }
    }
};
</script>

<style lang="less" scoped>
.IndexShare {
    > .body {
        padding-top: 50px;
        .flexbox(v align-center);

        .qrcode {
            width: 200px;
            height: 200px;
            background: rgba(216, 216, 216, 1);
        }
        .message {
            text-align: center;
        }
    }
    .share_info {
        font-size: 12px;
        padding: 15px;
        color: #999;
    }
}
</style>
