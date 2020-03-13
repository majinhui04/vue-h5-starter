<template>
    <div class="page IndexHome">
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
        this.syncData();
    },
    mounted() {
        console.log('1', this.recommend);
    },
    methods: {
        handleRedirect(link) {
            location.href = link;
        },
        handleChangeTab(item) {
            this.activeName = item.classify;
        },
        syncData() {
            this.$store
                .dispatch('site/SyncRecommendData')
                .then(list => {
                    console.log('res1', list);

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
