<template>
    <div id="app">
        <keep-alive :exclude="views">
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'App',
    data() {
        return {};
    },
    computed: {
        ...mapState({
            views: state => {
                return state.router.views || [];
            }
        })
    },
    watch: {
        $route(to, from) {
            console.log(
                '欢迎访问...',
                this.$route.name,
                this.$route.meta.keepAlive
            );
        }
    },
    created() {}
};
</script>
