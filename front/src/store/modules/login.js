import * as types from '../loginTypes';
import axios from 'axios';
import {baseUrl} from '../../config';

const state = {
    isModalShow: false,
    loginPending: false,
    loginError: '',
    registerPending: false,
    registerError: '',
    userToken: '',
    userInfo: {}
};

const getters = {
    [types.MODAL_STATE]: state => state.isModalShow,

    [types.GET_LOGIN_PENDING]: state => state.loginPending,

    [types.GET_LOGIN_FAILURE]: state => state.loginError,

    [types.GET_USERNAME_INFO]: state => state.userInfo,

    [types.GET_USERNAME_TOKEN]: state => state.userToken,

    [types.GET_REGISTER_PENDING]: state => state.registerPending,

    [types.GET_REGISTER_FAILURE]: state => state.registerError
};

const mutations = {
    [types.SHOW_MODAL]: state => state.isModalShow = !state.isModalShow,

    [types.HIDE_MODAL]: state => state.isModalShow = false,

    [types.USER_LOGIN_PENDING]: state => {
        state.loginPending = true;
        state.loginError = '';
    },

    [types.USER_LOGIN_FAILURE]: (state, payload) => {
        state.loginPending = false;
        state.loginError = payload;
    },

    [types.USER_LOGIN_SUCCESS]: (state, payload) => {
        state.loginPending = false;
        state.loginError = '';
        const {user: {role, username}, token} = payload;
        state.userInfo = {role, username};
        state.userToken = token;
        localStorage.setItem('shop-token', token);
    },

    [types.USER_REGISTER_PENDING]: state => {
        state.registerPending = true;
        state.registerError = '';
    },

    [types.USER_REGISTER_FAILURE]: (state, payload) => {
        state.registerPending = false;
        state.registerError = payload;
    }
};

const actions = {
    [types.FETCH_USER_LOGIN]: ({commit}, payload) => {
        commit(types.USER_LOGIN_PENDING);
        axios.post(baseUrl + 'user/sessions', payload)
            .then(response => {
                commit(types.USER_LOGIN_SUCCESS, response.data);
                commit(types.SHOW_MODAL);
            }, error => {
                commit(types.USER_LOGIN_FAILURE, error.response.data && error.response.data.error);
            })
    },

    [types.FETCH_USER_REGISTER]: ({commit}, payload) => {
        const {username_r, password_r, confirm_r} = payload;
        if (password_r !== confirm_r)
            commit(types.USER_REGISTER_FAILURE, 'Passwords do not match!');
        commit(types.USER_REGISTER_PENDING);
        axios.post(baseUrl + 'user/', {username: username_r, password: password_r, confirm: confirm_r})
            .then(response => {
                commit(types.USER_REGISTER_SUCCESS, response.data)
            }, error => {
                commit(types.USER_REGISTER_FAILURE, error.response.data && error.response.data.message);
            })
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
