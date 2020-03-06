<template>
    <div v-lazy:background-image="src" class="lazy"><slot></slot></div>
</template>
<script>
export default {
    props: ['src'],
    name: 'Cover',
    data() {
        return {
            url: ''
        };
    },
    mounted() {}
};
</script>
<style lang="less" scoped>
.lazy {
    background-color: #dddddd;
}
</style>
