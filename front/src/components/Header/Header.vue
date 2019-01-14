<template>
    <div class='header'>
        <div>
            <router-link class="nav-link" to="/">Main Menu</router-link>
        </div>
        <div class="header__info">
            <div class="header__cart-block">
                <i class="header__cart"></i>
                <i class="header__counter" v-if='getCart'>{{getCart}}</i>
                <p>Cart</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import * as types from '../../store/types';

    export default {
        name: 'Header',
        computed: {
            ...mapGetters({
                getCart: types.GET_CART_COUNTER
            })
        }
    }
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
</style>