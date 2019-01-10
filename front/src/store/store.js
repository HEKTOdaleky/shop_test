import Vue from 'vue';
import Vuex from 'vuex';
import main from './modules/main';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        main
    }
});
