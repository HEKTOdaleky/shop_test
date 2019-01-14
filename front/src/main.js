import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';

import App from './App.vue';
import OrderDescription from './components/OrderDescription/OrderDescription';
import Main from './components/Main';
import Cart from './components/Cart/Cart';

import {store} from './store/store';

Vue.use(Vuex);
Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {path: '/', component: Main},
        {path: '/order:id', component: OrderDescription},
        {path: '/cart', component: Cart},
        // { path: '/register', component: RegisterPage },

        {path: '*', redirect: '/'}
    ]
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
