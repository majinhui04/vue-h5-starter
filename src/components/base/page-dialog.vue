<template>
    <van-dialog
        class="uc-dialog"
        v-model="show"
        v-bind="$attrs"
    >
        <div class="uc-dialog-body">
            <slot></slot>
        </div>
        <div class="uc-dialog-foot" v-if="hasClose">
            <a href="javascript:void(0)" class="btn-close" @click="handleClose"></a>
        </div>
    </van-dialog>
</template>

<script>
    export default {
        name: 'PageDialog',
        props: {
            // 弹窗是否显示
            visible: {
                type: Boolean,
                default: false
            },
            // 弹窗是否显示
            hasClose: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                show: false
            };
        },
        watch: {
            visible(val) {
                this.show = val;
                this.$emit('update:visible', val);
            }
        },
        methods: {
            // 关闭弹窗前的回调
            handleClose() {
                this.show = false;
                this.$emit('update:visible', false);
            }
        }
    };
</script>
