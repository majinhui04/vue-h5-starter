/* eslint-disable */
const IndexMy = () => import(/* webpackChunkName: "IndexMy" */ '@/views/index/my');
export default {
path: '/index/my',
name: 'IndexMy',
component: IndexMy,
    meta: {
        parent: 'Index',
        rank: '2',
        title: '',
        auth: false,
        keepAlive: true
    }
};