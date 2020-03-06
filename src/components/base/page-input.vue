<template>
    <div class="uc-form-item">
        <slot name="prefix"></slot>
        <input class="uc-input" @focus="changefocus" @blur.prevent="changeBlur" @input="onInputEvent" :disabled="disabled" :placeholder="placeholder" :type="type" />
        <slot name="suffix"></slot>
    </div>
</template>

<script>
export default {
    name: 'PageInput',
    props: {
        name: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text' // password
        },
        clearable: {
            type: Boolean,
            default: true
        },
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: [String, Number],
            default: ''
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
        }
    },
    data() {
        return {
            currentValue: this.value
        };
    },
    methods: {
        onInputEvent(value) {
            this.$emit('input', this.name, value);
        },
        reset() {
            this.currentValue = '';
        },
        changefocus() {
            let u = navigator.userAgent;
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
            if (isAndroid) {
                setTimeout(() => {
                    try {
                        document.activeElement.scrollIntoViewIfNeeded();
                        document.activeElement.scrollIntoView();
                    } catch (e) {
                        console.error(e);
                    }
                }, 500);
            }
        },
        changeBlur() {
            let u = navigator.userAgent;
            let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if (isIOS) {
                console.log(1);
                setTimeout(() => {
                    const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                }, 200);
            }
        }
    }
};
</script>
