import Vue from 'vue';
import Vant, {
    Toast
} from 'vant';
// import 'vant/lib/index.css';
Vue.use(Vant);
Vue.prototype.$Toast = Toast;
window.myApp.$Toast = Toast
