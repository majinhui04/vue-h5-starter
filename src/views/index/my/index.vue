<template>
    <div class="page IndexMy">
        <!-- <van-nav-bar title="我的" class="navbar">
            <div slot="right"><span>完成</span></div>
        </van-nav-bar> -->
        <div class="navbar">
            <div class="left">&nbsp;</div>
            <div class="headline">
                <span class="font-18">我的导航</span>
            </div>
            <div class="right" @click="handleEdit">
                <span class="font-14">{{ isEdit ? '完成' : '编辑' }}</span>
            </div>
        </div>
        <div class="body">
            <div class="site-list">
                <div class="site-item">
                    <div class="icon icon-add"></div>
                    <div class="title">添加导航</div>
                </div>
                <div
                    :class="{ edit: isEdit }"
                    class="site-item"
                    v-for="(item, index) in dataList"
                    @click="handleSelect(item)"
                    :key="index"
                >
                    <div class="icon" :class="{ selected: item.selected }">
                        <img :src="item.icon" alt="" />
                        <div class="select"></div>
                    </div>
                    <div class="title">{{ item.title }}</div>
                </div>
            </div>
        </div>
        <div class="placeholder" style="height:50px"></div>
        <div class="footer" v-show="isEdit">
            <div class="action">全选</div>
            <div class="action">删除</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'IndexMy',
    components: {},
    data() {
        return {
            isEdit: false,
            dataList: [
                {
                    selected: false,
                    title: 'facebook',
                    icon:
                        'http://34.209.57.245:3366/img/icon/1e553325-5532-4d17-99f3-6a04f867f24b.png',
                    link: 'http://www.facebook.com'
                },
                {
                    selected: false,
                    title: '这是标题',
                    icon:
                        'http://34.209.57.245:3366/img/icon/3c76a05b-12ba-4eea-a09f-3718a45c787e.png',
                    link: 'www.facebook.com'
                },
                {
                    selected: false,
                    title: 'facebook',
                    icon:
                        'http://34.209.57.245:3366/img/icon/1e553325-5532-4d17-99f3-6a04f867f24b.png',
                    link: 'http://www.facebook.com'
                },
                {
                    selected: false,
                    title: '这是标题',
                    icon:
                        'http://34.209.57.245:3366/img/icon/3c76a05b-12ba-4eea-a09f-3718a45c787e.png',
                    link: 'www.facebook.com'
                },
                {
                    selected: false,
                    title: 'facebook',
                    icon:
                        'http://34.209.57.245:3366/img/icon/1e553325-5532-4d17-99f3-6a04f867f24b.png',
                    link: 'http://www.facebook.com'
                },
                {
                    selected: false,
                    title: '这是标题',
                    icon:
                        'http://34.209.57.245:3366/img/icon/3c76a05b-12ba-4eea-a09f-3718a45c787e.png',
                    link: 'www.facebook.com'
                },
                {
                    selected: false,
                    title: 'facebook',
                    icon:
                        'http://34.209.57.245:3366/img/icon/1e553325-5532-4d17-99f3-6a04f867f24b.png',
                    link: 'http://www.facebook.com'
                },
                {
                    selected: false,
                    title: '这是标题',
                    icon:
                        'http://34.209.57.245:3366/img/icon/3c76a05b-12ba-4eea-a09f-3718a45c787e.png',
                    link: 'www.facebook.com'
                },
                {
                    selected: false,
                    title: 'facebook',
                    icon:
                        'http://34.209.57.245:3366/img/icon/1e553325-5532-4d17-99f3-6a04f867f24b.png',
                    link: 'http://www.facebook.com'
                },
                {
                    selected: false,
                    title: '这是标题',
                    icon:
                        'http://34.209.57.245:3366/img/icon/3c76a05b-12ba-4eea-a09f-3718a45c787e.png',
                    link: 'www.facebook.com'
                },
                {
                    selected: false,
                    title: 'facebook',
                    icon:
                        'http://34.209.57.245:3366/img/icon/1e553325-5532-4d17-99f3-6a04f867f24b.png',
                    link: 'http://www.facebook.com'
                },
                {
                    selected: false,
                    title: '这是标题',
                    icon:
                        'http://34.209.57.245:3366/img/icon/3c76a05b-12ba-4eea-a09f-3718a45c787e.png',
                    link: 'www.facebook.com'
                },
                {
                    selected: false,
                    title: 'facebook',
                    icon:
                        'http://34.209.57.245:3366/img/icon/1e553325-5532-4d17-99f3-6a04f867f24b.png',
                    link: 'http://www.facebook.com'
                },
                {
                    selected: false,
                    title: '这是标题',
                    icon:
                        'http://34.209.57.245:3366/img/icon/3c76a05b-12ba-4eea-a09f-3718a45c787e.png',
                    link: 'www.facebook.com'
                },
                {
                    selected: false,
                    title: 'facebook',
                    icon:
                        'http://34.209.57.245:3366/img/icon/1e553325-5532-4d17-99f3-6a04f867f24b.png',
                    link: 'http://www.facebook.com'
                },
                {
                    selected: false,
                    title: '这是标题',
                    icon:
                        'http://34.209.57.245:3366/img/icon/3c76a05b-12ba-4eea-a09f-3718a45c787e.png',
                    link: 'www.facebook.com'
                }
            ]
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        handleSelectAll(action) {
            this.dataList.forEach(item => {
                item.selected = action;
            });
        },
        handleSelect(item) {
            item.selected = !item.selected;
        },
        handleEdit() {
            console.log('1', this.isEdit);

            this.isEdit = !this.isEdit;
        }
    }
};
</script>

<style lang="less" scoped>
.IndexMy {
    .footer {
        position: fixed;
        height: 50px;
        width: 375px;
        margin: 0 auto;
        left: 0;
        bottom: 50px;
        border-top: 1px solid #ddd;
        background-color: #fff;
        z-index: 99;
        .flexbox(align-center);

        .action {
            flex: 1;
            text-align: center;
            line-height: 50px;
        }
    }
}
</style>
