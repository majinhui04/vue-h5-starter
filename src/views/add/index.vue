<template>
    <div class="page Add">
        <div class="navbar white">
            <div class="left" @click="$goBack">
                <img
                    src="~@/assets/img/icon/icon_tianjia_fanhui@2x.png"
                    alt=""
                    class="arrow"
                    width="10px"
                />
                <span>返回</span>
            </div>
            <div class="headline">
                <span class="font-18"></span>
            </div>
            <div class="right">
                <van-button
                    block
                    type="info"
                    size="mini"
                    class="add-site-btn"
                    @click="handleShowForm"
                    >自定义添加</van-button
                >
            </div>
        </div>
        <div class="body">
            <div class="block-list">
                <div
                    class="block-item"
                    v-for="(data, index) in recommend"
                    :key="index"
                >
                    <div class="block-item-head">
                        <span>{{ data.classify }}</span>
                    </div>
                    <div class="block-item-main">
                        <div class="site-list2">
                            <div
                                class="site-item"
                                v-for="(item, index) in data.items"
                                :key="index"
                            >
                                <div class="icon">
                                    <img :src="item.icon" alt="" />
                                </div>
                                <div class="title">{{ item.title }}</div>
                                <div
                                    class="add"
                                    @click="handleToggleAdd(item)"
                                    :class="handleCheckStatus(item)"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="block-item-foot">
                        <div class="action">查看更多</div>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="action" @click="$goBack">关闭</div>
        </div>
        <van-popup
            v-model="show"
            closeable
            position="bottom"
            :style="{ height: '50%' }"
        >
            <van-form @submit="onSubmit" class="add-form">
                <van-field
                    size="large"
                    v-model="title"
                    name="title"
                    label=""
                    placeholder="请输入网址"
                />
                <van-field
                    size="large"
                    v-model="link"
                    name="link"
                    label=""
                    placeholder="请输入网站名称"
                />
                <div style="margin: 16px;">
                    <van-button
                        round
                        block
                        type="info"
                        native-type="submit"
                        :disabled="!valid"
                    >
                        确定添加
                    </van-button>
                </div>
            </van-form>
        </van-popup>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'Add',
    components: {},
    data() {
        return {
            title: '',
            link: '',
            show: false,
            dataList: []
        };
    },
    computed: {
        ...mapState({
            recommend: state => state.site.recommend,
            favorite: state => state.site.favorite
        }),
        valid() {
            if (this.title && this.link) {
                console.log('123');

                return true;
            } else {
                return false;
            }
        },
        sites() {
            if (this.recommend) {
                const result = [];
                this.recommend
                    .map(item => item.items)
                    .forEach(item => {
                        result.push(...item);
                    });
                console.log('sites', result);

                return result;
            } else {
                return [];
            }
        }
    },
    watch: {},
    created() {
        this.syncData();
    },
    mounted() {},
    methods: {
        handleShowForm() {
            this.title = '';
            this.link = '';
            this.show = true;
        },
        handleCheckStatus(item) {
            const sites = this.favorite;
            const result = sites.filter(site => site.id === item.id);

            if (result.length) {
                return 'remove';
            } else {
                return '';
            }
        },
        handleToggleAdd(item) {
            const result = this.favorite.filter(site => site.id === item.id);
            if (!result.length) {
                console.log('add');
                this.$Toast('已添加至导航');
                this.$store.commit('site/AddFavorite', item);
            } else {
                console.log('remove');
                this.$Toast('已从导航移除');
                this.$store.commit('site/RemoveFavorite', item);
            }
            console.log('handleToggleAdd', item);
        },
        onSubmit(values) {
            const icon = require('@/assets/img/icon/icon_logo_default@2x.png');
            const item = {
                id: +new Date(),
                icon,
                ...values
            };
            this.$store.commit('site/AddFavorite', item);
            this.show = false;
            history.go(-1);
            console.log('submit', item);
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

<style lang="less">
.Add {
    padding-bottom: 88px;

    .add-site-btn {
        width: auto;
        padding: 3px 7px;
        line-height: 1;
    }

    .add-form {
        padding-top: 50px;

        .van-cell::after {
            border: none;
        }
        .van-field__control {
            height: 48px;
            padding: 0 20px;
            border-radius: 24px;
            background-color: rgba(245, 245, 245, 1);
        }
    }
    > .body {
        height: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    > .footer {
        position: fixed;
        width: 375px;
        left: 0;
        bottom: 0;
        z-index: 10;
        background-color: #fff;
        box-shadow: 0px -4px 8px 0px rgba(240, 240, 240, 1);
        height: 56px;
        .flexbox(align-center justify-center);

        .action {
            height: 100%;
            // background: rgba(104, 101, 240, 1);
            font-size: 16px;
            color: #333;
            .flexbox(align-center justify-center);
        }
    }

    .site-list2 {
        padding: 20px 14px;
        .flexbox(wrap);
        &::after {
            content: ' ';
            flex: 1;
        }
        .site-item:not(:nth-child(4n)) {
            margin-right: calc(31px / 3);
        }
        .site-item {
            width: 79px;
            height: 124px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 8px 0px rgba(240, 240, 240, 1);
            border-radius: 16px;
            margin-bottom: 12px;
            overflow: hidden;
            .flexbox(v align-center);
            .add {
                margin-top: 7px;
                width: 46px;
                height: 18px;
                background: url('~@/assets/img/icon/btn_tanjia_normal_tanjia@2x.png')
                    no-repeat;
                background-size: cover;

                &.remove {
                    background-image: url('~@/assets/img/icon/btn_tanjia_selected_tanjia@2x.png');
                }
            }

            .icon {
                position: relative;
                width: 56px;
                height: 56px;
                background-color: #ddd;
                border-radius: 10px;

                margin-bottom: 7px;
                margin-top: 5px;
            }

            .title {
                width: 100%;
                text-align: center;
                height: 20px;
                line-height: 20px;
                .text-overflow();
            }
        }
    }
}
</style>
