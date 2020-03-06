<template>
    <div class="page Index">
        <div class="body">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
        <van-tabbar
            v-model="active"
            active-color="#6865F0"
            inactive-color="#999"
        >
            <van-tabbar-item
                icon="search"
                replace
                :to="item.to"
                v-for="(item, index) in tabbar"
                :key="index"
            >
                <span>{{ item.label }}</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? item.active : item.inactive"
                />
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name: 'Index',
    components: {},
    data() {
        return {
            tabbar: [
                {
                    label: '导航',
                    to: '/index/home',
                    active: require('./assets/img/tab_selected_daohang@2x.png'),
                    inactive: require('./assets/img/tab_daohang@2x.png')
                },
                {
                    label: '我的',
                    to: '/index/my',
                    active: require('./assets/img/tab_selected_wpd@2x.png'),
                    inactive: require('./assets/img/tab_normal_wod@2x.png')
                },
                {
                    label: '分享',
                    to: '/index/share',
                    active: require('./assets/img/tab_normal_fenxiang@2x.png'),
                    inactive: require('./assets/img/tab_normal_fenxiang@2x.png')
                }
            ],
            active: 0
        };
    },
    computed: {},
    watch: {
        $route: {
            handler: function(newVal, oldVal) {
                const path = this.$route.path;
                const target = this.tabbar.filter(item => item.to === path)[0];
                this.active = this.tabbar.indexOf(target);
            },
            immediate: true
        }
    },
    created() {},
    mounted() {},
    methods: {}
};
</script>

<style lang="less">
.Index {
    padding: 50px 0;
    > .body {
        height: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
}
</style>
