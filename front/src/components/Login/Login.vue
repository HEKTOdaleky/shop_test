<template>
    <div class='login'>
        <div
            class='preloader'
            v-if='loginPending || registerPending'/>
        <div v-if='!loginPending && !registerPending'>
            <div
                class='login__user-data'
                v-if='login'>
                <h6>Login</h6>
                <i v-if='loginError'>
                    {{loginError}}
                </i>
                <div>
                    <label for='username'>
                        Username
                    </label>
                    <input
                        id='username'
                        v-model='username'>
                </div>

                <div>
                    <label for='password'>
                        Password
                    </label>
                    <input
                        id='password'
                        v-model='password'
                        type='password'>
                </div>
                <button v-on:click='()=>loginUser({username, password})'>
                    Login
                </button>
                <p v-on:click='changeModal'>
                    Register
                </p>
            </div>

            <div
                class='login__user-data'
                v-if='!login'>
                <h6>Register</h6>
                <i v-if='registerError'>
                    {{registerError}}
                </i>
                <div>
                    <label for='username_r'>
                        Username
                    </label>
                    <input
                        id='username_r'
                        v-model='username_r'>
                </div>

                <div>
                    <label for='password_r'>
                        Password
                    </label>
                    <input
                        id='password_r'
                        v-model='password_r'
                        type='password'>
                </div>

                <div>
                    <label for='confirm_r'>
                        Confirm Password
                    </label>
                    <input
                        id='confirm_r'
                        v-model='confirm_r'
                        type='password'>
                </div>

                <button
                    v-on:click='()=>registerUser({username_r, password_r, confirm_r})'>
                    Register
                </button>
                <p v-on:click='changeModal'>
                    Login
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from '../../store/loginTypes';
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: 'Login',

        data() {
            return {
                login: true,
                username: '',
                password: '',
                username_r: '',
                password_r: '',
                confirm_r: ''
            };
        },

        computed: {
            ...mapGetters({
                loginPending: types.GET_LOGIN_PENDING,
                loginError: types.GET_LOGIN_FAILURE,
                registerPending: types.GET_REGISTER_PENDING,
                registerError: types.GET_REGISTER_FAILURE,
            })
        },

        methods: {
            changeModal() {
                this.login = !this.login;
            },

            ...mapActions({
                loginUser: types.FETCH_USER_LOGIN,
                registerUser: types.FETCH_USER_REGISTER
            })
        }
    };
</script>

<style>
    .login {
        width: 460px;
        height: 320px;
        background: gainsboro;
        padding: 30px;
        position: relative;
    }

    .login__user-data h6 {
        text-align: center;
        font-size: 18px;
        margin: 0;
        padding: 20px;
    }

    .login__user-data > div {
        margin-bottom: 15px;
        display: flex;
        justify-content: space-between;
        width: 70%;
    }

    .login__user-data input {
        margin-left: 15px;
    }

    .login__user-data p {
        text-align: center;
        cursor: pointer;
        margin-top: 30px;
    }

    .login__user-data button {
        margin: 10px auto 0;
        display: block;
        padding: 5px 10px;
    }

    .login__user-data i {
        color: red;
        padding: 20px 5px;
        text-align: center;
    }

    .preloader {
        height: 150px;
        width: 150px;
        vertical-align: middle;
        margin: 0 auto;
        background-image: url('../../assets/icons/preloader.svg');
        background-size: contain;
    }
</style>
