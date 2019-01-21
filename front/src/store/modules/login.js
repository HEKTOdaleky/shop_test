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
    userInfo: {},
    logoutPending: false,
    logoutError: false
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
    },

    [types.USER_LOGOUT_PENDING]: state => {
        state.logoutPending = true;
        state.logoutError = false;
    },

    [types.USER_LOGOUT_FAILURE]: state => {
        state.logoutPending = false;
        state.logoutError = true;
    },

    [types.USER_LOGOUT_SUCCESS]: state => {
        state.logoutPending = false;
        state.logoutError = false;
        state.userToken = '';
        state.userInfo = {};
        localStorage.removeItem('shop-token');
        localStorage.removeItem('shop-cart');
    },
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
            });
    },

    [types.FETCH_USER_REGISTER]: ({commit}, payload) => {
        const {username_r, password_r, confirm_r} = payload;
        if (password_r !== confirm_r)
            commit(types.USER_REGISTER_FAILURE, 'Passwords do not match!');
        commit(types.USER_REGISTER_PENDING);
        axios.post(baseUrl + 'user/', {username: username_r, password: password_r, confirm: confirm_r})
            .then(response => {
                commit(types.USER_REGISTER_SUCCESS, response.data);
            }, error => {
                commit(types.USER_REGISTER_FAILURE, error.response.data && error.response.data.message);
            });
    },

    [types.CHECK_TOKEN]: ({commit, dispatch, state}) => {
        const token = state.userToken || localStorage.getItem('shop-token');

        if (token) {
            axios.request(baseUrl + 'user/check', {
                method: 'post',
                headers: {
                    'Token': token
                }
            })
                .then(response => {
                    commit(types.USER_LOGIN_SUCCESS, response.data);
                }, error => {
                    console.log('token not valid: ', error.response && error.response.data);
                    dispatch(types.FETCH_USER_LOGOUT, token);
                });
        }
    },

    [types.FETCH_USER_LOGOUT]: ({commit}, payload) => {

        commit(types.USER_LOGOUT_PENDING);
        axios.request(baseUrl + 'user/sessions/', {
            method: 'delete',
            headers: {
                'Token': payload
            }
        })
            .then(response => {
                commit(types.USER_LOGOUT_SUCCESS);
                console.log('LOGOUT_SUCCESS', response.data);

            }, error => {
                commit(types.USER_LOGOUT_SUCCESS);
                console.log('LOGOUT_ERROR', error.response && error.response.data);
            });
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
