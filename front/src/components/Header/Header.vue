<template>
    <div class='header'>
        <p
            v-if='token'
            class='header__user'>
            {{`Hello! ${getUsername.username}. `}}
        </p>
        <div class='signIn'>
            <p
                v-if='token'
                v-on:click='()=>logOut(token)'>
                {{`Logout`}}
            </p>
            <p
                v-on:click='showLogin'
                v-if='!token'>
                Login/Register
            </p>
        </div>

        <div>
            <router-link
                class="nav-link"
                to="/">
                Main Menu
            </router-link>
        </div>

        <div class="header__info">
            <router-link
                class="nav-link"
                to="/cart">
                <div class="header__cart-block">
                    <i class="header__cart"/>
                    <i
                        class="header__counter"
                        v-if='getCart'>
                        {{getCart}}
                    </i>
                    <p>Cart</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import * as types from '../../store/types';
    import * as loginTypes from '../../store/loginTypes';


    export default {
        name: 'Header',
        computed: {
            ...mapGetters({
                getCart: types.GET_CART_COUNTER,
                token: loginTypes.GET_USERNAME_TOKEN,
                getUsername: loginTypes.GET_USERNAME_INFO
            })
        },

        methods: {
            ...mapMutations({
                showLogin: loginTypes.SHOW_MODAL
            }),

            ...mapActions({
                logOut: loginTypes.FETCH_USER_LOGOUT
            })
        }
    };
</script>

<style>
    .header {
        width: 100%;
        height: 55px;
        background: gainsboro;
        margin-bottom: 40px;
        display: flex;
        justify-content: flex-end;
    }

    .header__info {
        padding: 5px 25px 5px;
    }

    .header__info > .nav-link {
        display: block;
        width: 100%;
        text-decoration: none;
        color: black;
    }

    .header__info > .nav-link:hover {
        opacity: 0.8;
        transform: scale(0.95);
    }

    .header__cart {
        display: inline-block;
        padding: 14px;
        background-image: url("../../assets/icons/cart.png");
        background-size: cover;
    }

    .header__cart-block {
        cursor: pointer;
    }

    .header__cart-block > p {
        margin: 0;
        font-size: 12px;
    }

    .header__counter {
        vertical-align: middle;
        margin-left: 5px;
    }

    .signIn {
        width: 15%;
    }

    .signIn > p {
        cursor: pointer;
    }

    .header__user {
        cursor: auto;
        font-weight: bold;
        margin-right: 50px;
    }
</style>
