/* eslint-disable */
const Index = () => import( /* webpackChunkName: "Index" */ '@/views/index');
export default {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
        parent: '',
        rank: 1,
        title: '',
        auth: false,
        keepAlive: false,
        aliveOnlyBack: false
    }
};
