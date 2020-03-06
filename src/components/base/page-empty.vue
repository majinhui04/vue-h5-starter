<template>
    <div class="uc-page-empty">
        <section class="body">
            <div class="icon"></div>
            <slot>
                <div class="message">暂无数据</div>
            </slot>
        </section>
        <section class="foot">
            <slot name="foot">
                <div class="note"></div>
            </slot>
        </section>
    </div>
</template>

<script>
export default {
    name: 'PageEmpty',
    props: {
        note: {
            type: String,
            default: ''
        }
    },
    data() {
        return {};
    },
    methods: {}
};
</script>
