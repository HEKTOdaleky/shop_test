import * as types from '../loginTypes';
// import axios from 'axios';
// import {baseUrl} from '../../config';

const state = {
    isModalShow: false
};

const getters = {
    [types.MODAL_STATE]: state => state.isModalShow
};

const mutations = {
    [types.SHOW_MODAL]: state => state.isModalShow = !state.isModalShow,

    [types.HIDE_MODAL]: state => state.isModalShow = false
};

const actions = {};

export default {
    state,
    mutations,
    actions,
    getters
};
