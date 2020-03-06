/* eslint-disable */
const IndexShare = () => import(/* webpackChunkName: "IndexShare" */ '@/views/index/share');
export default {
path: '/index/share',
name: 'IndexShare',
component: IndexShare,
    meta: {
        parent: 'Index',
        rank: 3,
        title: '',
        auth: false,
        keepAlive: true
    }
};