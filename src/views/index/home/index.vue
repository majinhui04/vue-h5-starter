<template>
    <div class="page IndexHome">
        <div class="notification" v-if="tip">
            <div class="logo"></div>
            <div class="info"></div>
            <div class="btn" @click="showTip" v-if="!isAndroid">
                添加到主屏幕
            </div>
            <a class="btn" :href="apk_url" v-if="isAndroid">下载APP </a>
            <div class="close" @click="handleRemove"></div>
        </div>
        <van-popup
            v-model="show"
            position="bottom"
            :style="{ height: '70px' }"
            class="notify-popup"
        >
            <div class="notify-tip">
                <div class="logo"></div>
                <div class="info">
                    请轻点<img
                        width="20"
                        src="~@/assets/img/icon/share.png"
                        alt=""
                    />
                    ，然后点击”添加到主屏幕”
                </div>
                <div class="arrow"></div>
            </div>
        </van-popup>
        <div class="navbar">
            <div
                class="tab-item"
                @click="handleChangeTab(tab)"
                v-for="(tab, index) in recommend"
                :key="index"
                :class="{ active: activeName === tab.classify }"
            >
                <span class="font-16">{{ tab.classify }}</span>
                <div class="arrow-top"></div>
            </div>
        </div>
        <div
            class="tab-body"
            v-for="(tab, index) in recommend"
            :key="index"
            v-show="activeName === tab.classify"
        >
            <div class="site-list">
                <div
                    class="site-item"
                    v-for="(item, index) in tab.items"
                    :key="index"
                    @click="handleRedirect(item.link)"
                >
                    <div class="icon">
                        <img :src="item.icon" alt="" />
                    </div>
                    <div class="title">{{ item.title }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'IndexHome',
    components: {},
    data() {
        return {
            isAndroid: false,
            apk_url: '',
            tip: true,
            show: false,
            activeName: '',
            tabList: []
        };
    },
    computed: {
        ...mapState({
            recommend: state => state.site.recommend
        })
        // list() {
        //     const result = this.tabList.filter(item => { return item.classify === this.activeName })[0];
        //     if (result) {
        //         return result.items
        //     } else {
        //         return []
        //     }
        // }
    },
    watch: {},
    created() {
        const u = navigator.userAgent;
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        if (isAndroid) {
            this.isAndroid = true;
        }
        this.syncData();
    },
    mounted() {
        console.log('1', this.recommend);
    },
    methods: {
        handleRemove() {
            this.tip = false;
        },
        showTip() {
            this.show = true;
        },
        handleRedirect(link) {
            location.href = link;
        },
        handleChangeTab(item) {
            this.activeName = item.classify;
        },
        syncData() {
            this.$store
                .dispatch('site/SyncRecommendData')
                .then(res => {
                    const list = res.data || [];
                    console.log('res1222', res, res.apk_url);

                    this.activeName = list[0].classify;
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }
};
</script>

<style lang="less" scoped>
.IndexHome {
}
</style>
