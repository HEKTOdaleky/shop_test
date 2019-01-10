import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
window.Vue = require('vue');
import {store} from './store/store';
import AppLayout from './App.vue';


Vue.component('example-component', AppLayout);

const app = new Vue({
    el: '#app',
    store,
    render: h => h(AppLayout)
});
