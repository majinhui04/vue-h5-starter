/* eslint-disable */
const Add = () => import( /* webpackChunkName: "Add" */ '@/views/add');
export default {
    path: '/add',
    name: 'Add',
    component: Add,
    meta: {
        parent: '',
        rank: 1,
        title: '',
        auth: false,
        keepAlive: true
    }
};
