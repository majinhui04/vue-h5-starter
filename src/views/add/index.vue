<template>
    <div class="page Add">
        <div class="navbar">
            <div class="left">返回</div>
            <div class="headline">
                <span class="font-18">添加导航</span>
            </div>
            <div class="right"></div>
        </div>
        <div class="body">
            <div class="block-list">
                <div
                    class="block-item"
                    v-for="(data, index) in dataList"
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
                                <div class="add"></div>
                            </div>
                        </div>
                    </div>
                    <div class="block-item-foot">
                        <div class="action">查看更多</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="action">自定义添加</div>
        </div>
        <van-popup
            v-model="show"
            closeable
            position="bottom"
            :style="{ height: '60%' }"
        >
            <van-form @submit="onSubmit" class="add-form">
                <van-field
                    size="large"
                    v-model="title"
                    name="title"
                    label=""
                    placeholder="请输入网址"
                    :rules="[{ required: true, message: '请输入网址' }]"
                />
                <van-field
                    size="large"
                    v-model="link"
                    name="link"
                    label=""
                    placeholder="请输入网站名称"
                    :rules="[{ required: true, message: '请输入网站名称' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                        确定添加
                    </van-button>
                </div>
            </van-form>
        </van-popup>
    </div>
</template>

<script>
export default {
    name: 'Add',
    components: {},
    data() {
        return {
            title: '',
            link: '',
            show: true,
            dataList: [
                {
                    classify: '常用网址',
                    items: [
                        {
                            title: 'facebook',
                            icon:
                                'http://34.209.57.245:3366/img/icon/1e553325-5532-4d17-99f3-6a04f867f24b.png',
                            link: 'http://www.facebook.com'
                        },
                        {
                            title: '这是事实上题',
                            icon:
                                'http://34.209.57.245:3366/img/icon/3c76a05b-12ba-4eea-a09f-3718a45c787e.png',
                            link: 'www.facebook.com'
                        },
                        {
                            title: '这是事实上题',
                            icon:
                                'http://34.209.57.245:3366/img/icon/3c76a05b-12ba-4eea-a09f-3718a45c787e.png',
                            link: 'www.facebook.com'
                        }
                    ]
                },
                {
                    classify: '福利网址',
                    items: [
                        {
                            title: 'facebook',
                            icon:
                                'http://34.209.57.245:3366/img/icon/1e553325-5532-4d17-99f3-6a04f867f24b.png',
                            link: 'http://www.facebook.com'
                        },
                        {
                            title: '这是标题',
                            icon:
                                'http://34.209.57.245:3366/img/icon/3c76a05b-12ba-4eea-a09f-3718a45c787e.png',
                            link: 'www.facebook.com'
                        },
                        {
                            title: '这是标题',
                            icon:
                                'http://34.209.57.245:3366/img/icon/3c76a05b-12ba-4eea-a09f-3718a45c787e.png',
                            link: 'www.facebook.com'
                        },
                        {
                            title: '这是标题',
                            icon:
                                'http://34.209.57.245:3366/img/icon/3c76a05b-12ba-4eea-a09f-3718a45c787e.png',
                            link: 'www.facebook.com'
                        },
                        {
                            title: '这是标题',
                            icon:
                                'http://34.209.57.245:3366/img/icon/3c76a05b-12ba-4eea-a09f-3718a45c787e.png',
                            link: 'www.facebook.com'
                        }
                    ]
                }
            ]
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        onSubmit(values) {
            console.log('submit', values);
        }
    }
};
</script>

<style lang="less">
.Add {
    padding-top: 50px;
    padding-bottom: 88px;

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
        border-top: 1px solid #ddd;
        height: 88px;

        .flexbox(align-center justify-center);

        .action {
            width: 347px;
            height: 48px;
            background: rgba(104, 101, 240, 1);
            border-radius: 24px;
            font-size: 16px;
            color: #fff;
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
