<template>
    <div class="page-loading" :class="{ fail: fail, loading: !loaded }">
        <page-title :title="title" v-if="title"></page-title>
        <template v-if="loaded">
            <template v-if="empty">
                <slot name="empty">
                    <page-empty></page-empty>
                </slot>
            </template>
            <template v-else-if="fail">
                <slot name="fail">
                    <page-result
                        :isShowCancel="false"
                        status="fail"
                        :message="message"
                        @reload="handleReload"
                        :confirmButton="{ name: '重新加载', event: 'reload' }"
                    ></page-result>
                </slot>
            </template>
            <template v-else>
                <slot></slot>
            </template>
        </template>
        <template v-else>
            <slot name="loading">
                <div class="loading">
                    <van-skeleton title avatar :row="6" />
                    <van-loading size="24px" class="panel-loading">{{
                        loadingTxt
                    }}</van-loading>
                </div>
            </slot>
        </template>
    </div>
</template>
<script>
export default {
    name: 'PageSkeleton',
    props: {
        // 重载是否强制刷新 可传具体地址
        flush: {
            type: [Boolean, String],
            default: false
        },
        loadingTxt: {
            type: String,
            default: '加载中...'
        },
        auto: {
            type: Boolean,
            default: true
        },
        empty: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        // 是否在激活状态也重新获取数据
        activated: {
            type: Boolean,
            default: false
        },
        syncDataFn: {
            type: Function,
            default() {
                return Promise.resolve();
            }
        }
    },
    data() {
        return {
            loaded: false,
            lock: false,
            fail: false,
            message: ''
        };
    },
    watch: {},
    methods: {
        handleReload() {
            const uri = location.href;
            if (this.flush) {
                location.href =
                    typeof this.flush === 'string' ? this.flush : uri;
            } else {
                this.reload();
            }
        },
        reload() {
            this.lock = true;
            this.loaded = false;
            this.empty = false;
            this.fail = false;
            this.message = '';
            this.syncDataFn()
                .then(() => {
                    console.log(111111);
                })
                .catch(err => {
                    console.log(342343234323);

                    this.fail = true;
                    this.message = err.message;
                })
                .finally(() => {
                    this.lock = false;
                    this.loaded = true;
                });
        }
    },
    created() {
        !this.lock && this.auto && this.reload();
    },
    activated() {
        !this.lock && this.activated && this.auto && this.reload();
    }
};
</script>
<style lang="less">
.page-loading {
    &.fail {
        background-color: transparent;
    }
    &.loading {
        background-color: #fff;
        padding: 15px;
    }
    > .content {
        padding: 30px;
    }

    > .panel-loading {
        margin-top: 30px;
    }
}
</style>
