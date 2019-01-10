import Vue from 'vue';
import Vuex from 'vuex';
import {store} from './store/store';
import AppLayout from './App.vue';
import NotFound from './components/NotFound/NotFound'

Vue.use(Vuex);
window.Vue = require('vue');


Vue.component('example-component', AppLayout);


const routes = {
    '/': AppLayout,
    '*': NotFound
}

new Vue({
    el: '#app',
    data: {
        currentRoute: window.location.pathname
    },
    computed: {
        ViewComponent() {
            return routes[this.currentRoute] || NotFound
        }
    },
    store,
    render(h) {
        return h(this.ViewComponent)
    }
});
