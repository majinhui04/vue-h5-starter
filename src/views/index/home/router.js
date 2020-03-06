/* eslint-disable */
const IndexHome = () => import( /* webpackChunkName: "IndexHome" */ '@/views/index/home');
export default {
    path: '/index/home',
    name: 'IndexHome',
    component: IndexHome,
    meta: {
        parent: 'Index',
        rank: 1,
        title: '',
        auth: false,
        keepAlive: true
    }
};
