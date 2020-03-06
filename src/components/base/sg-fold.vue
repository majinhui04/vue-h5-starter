<template>
    <div class="sg-fold">
        <div class="content" :class="{ active: active }"><slot></slot></div>
        <div class="action">
            <slot name="action">
                <span @click="toggle">{{ this.active ? '收起' : '展开' }}</span>
            </slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SgFold',
    props: {
        foldClass: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            active: false
        };
    },

    methods: {
        toggle() {
            const active = this.active;
            this.active = !active;
        }
    },
    mounted: function() {}
};
</script>
<style lang="less">
.sg-fold {
    > .content {
        height: 100px;
        overflow: hidden;
        &.active {
            height: auto !important;
        }
    }
    > .action {
        padding: 7px;
        text-align: center;
    }
}
</style>
