import Vue from 'vue';
import Vuex from 'vuex';
import orders from './modules/orders';
import brands from './modules/brands';
import category from './modules/category';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    orders,
    brands,
    category
  }
});
