<template>
    <div class="uc-panel uc-result">
        <section class="body">
            <div class="icon" :class="status"></div>
            <div class="message">{{ message }}</div>
            <div class="tip">{{ tip }}</div>
        </section>
        <section class="foot">
            <button
                class="uc-btn transparent cancel"
                v-if="cancelButton && isShowCancel"
                @click="handleClick(cancelButton.event)"
            >
                {{ cancelButton.name }}
            </button>
            <button
                class="uc-btn confirm"
                v-if="confirmButton"
                @click="handleClick(confirmButton.event)"
            >
                {{ confirmButton.name }}
            </button>
        </section>
    </div>
</template>

<script>
export default {
    name: 'PageResult',
    props: {
        // 结果状态 'success'、'fail'、'logo'
        status: {
            type: String,
            default: 'logo'
        },
        // 信息
        message: {
            type: String,
            default: ''
        },
        // 提示
        tip: {
            type: String,
            default: ''
        },
        isShowCancel: {
            type: Boolean,
            default: true
        },
        // 返回按钮
        cancelButton: {
            type: Object,
            default() {
                return {
                    name: '返回首页',
                    event: 'home'
                };
            }
        },
        // 确认按钮
        confirmButton: {
            type: Object,
            default() {
                return null;
            }
        }
    },
    data() {
        return {};
    },
    methods: {
        handleClick(env) {
            this.$emit(`${env}`);
            if (env === 'home') {
                this.$router.push({ path: '/' });
            }
        }
    }
};
</script>
