import Vue from 'vue';
import Vuex from 'vuex';
import main from './modules/main';
import brands from './modules/brands'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        main,
        brands
    }
});
