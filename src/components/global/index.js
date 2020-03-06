import Vue from 'vue';
const path = require('path');
const files = require.context('@/components/base', false, /\.vue$/);
const components = {};
files.keys().forEach(key => {
    const name = path.basename(key, '.vue');
    components[name] = files(key).default || files(key);
});
Object.entries(components).forEach(item => {
    Vue.component(item[0], item[1]);
});
// Object.keys(modules).forEach(item => {
//     Vue.component(item.name, item)
// })
