<template>
    <div class="page IndexMy">
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
                <div class="site-item" @click="$redirect('/add')">
                    <div class="icon icon-add"></div>
                    <div class="title">添加导航</div>
                </div>
                <div
                    :class="{ edit: isEdit }"
                    class="site-item"
                    v-for="(item, index) in favorite"
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
        <div class="footer my-footer" v-show="isEdit">
            <div class="action" @click="handleToggleAll">
                {{ isAll ? '反选' : '全选' }}
            </div>
            <div class="action" @click="handleDelete">删除</div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'IndexMy',
    components: {},
    data() {
        return {
            // 是否全选
            isAll: false,
            isEdit: false
        };
    },
    computed: {
        ...mapState({
            favorite: state => state.site.favorite
        })
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {
        handleSelect(item) {
            if (this.isEdit) {
                item.selected = !item.selected;
            } else {
                location.href = item.link;
            }
        },
        handleToggleAll() {
            this.isAll = !this.isAll;
            this.favorite.forEach(item => {
                item.selected = this.isAll;
            });
        },
        handleDelete() {
            const result = this.favorite.filter(item => item.selected);
            console.log(1111, result);
            this.$store.commit('site/RemoveFavorite', result);
        },
        handleEdit() {
            console.log('1', this.isEdit);

            if (!this.isEdit) {
                this.favorite.forEach(item => {
                    this.$set(item, 'selected', false);
                });
            }
            this.isEdit = !this.isEdit;
        }
    }
};
</script>

<style lang="less" scoped>
.IndexMy {
    .footer {
        position: fixed;
        width: 375px;
        margin: 0 auto;
        left: 0;
        bottom: 50px;
        right: 0;
        border-top: 1px solid #ddd;
        background-color: #fff;
        z-index: 99;
        .flexbox(align-center);

        .action {
            flex: 1;
            text-align: center;
            height: 50px;
            line-height: 50px;
        }
    }
}
</style>
