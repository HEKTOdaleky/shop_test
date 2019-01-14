<template>
    <div class='cart'>
        <div
            v-for='(item,index) in cart'
            :key='index'
            v-if='userCart[item.orderNum]'
            class='cart-item'>
            <img :src='imageUrl+item.image'>
            <p>{{item.brand.name+' '+item.name}}</p>
            <p>{{`${item.price} $ x ${userCart[item.orderNum] && userCart[item.orderNum].count}=${item.price*userCart[item.orderNum].count}`}}</p>
            <div
                class='cart__counter'>
                <p v-on:click='()=>removeFromCart(item)'>
                    -
                </p>
                <p v-on:click='()=>addToCart(item)'>
                    +
                </p>
            </div>
        </div>
        <p
            class='cart__total'>
            {{`Total ${totalSum}$`}}
        </p>
    </div>
</template>

<script>
    import * as types from '../../store/types';
    import {mapActions, mapGetters, mapMutations} from 'vuex';
    import {imageUrl} from '../../config';

    export default {
        name: 'Cart',

        data() {
            return {
                imageUrl,
                totalSum: 0
            };
        },

        computed: {
            ...mapGetters({
                cart: types.GET_CART_ORDERS,
                userCart: types.GET_USER_CART,
                count: types.GET_CART_COUNTER
            })
        },

        watch: {
            'count'() {
                this.totalSum = 0;
                this.cart.forEach(item => {
                    this.totalSum += item.price * this.userCart[item.orderNum].count;
                });
            }
        },

        created() {
            this.getCartList();
            this.cart.forEach(item => {
                this.totalSum += item.price * this.userCart[item.orderNum].count;
            });
        },

        methods: {
            ...mapActions({getCartList: types.FETCH_CART_ORDERS_INFO}),
            ...mapMutations({
                addToCart: types.ADD_ITEM_TO_CART,
                removeFromCart: types.REMOVE_ITEM_FROM_CART
            })
        }
    };
</script>

<style>
    .cart {
        padding: 10px 40px;
        width: 50%;
    }

    .cart-item {
        border: 1px solid black;
        display: flex;
        padding: 4px 20px;
        text-align: end;
    }

    .cart-item > img {
        width: 6%;
        height: 3%;
    }

    .cart-item > p {
        padding: 0 20px;
    }

    .cart__total {
        text-align: right;
        font-size: 18px;
    }

    .cart__counter {
        display: flex;
        justify-content: space-between;
    }

    .cart__counter > p {
        display: block;
        border: 1px solid black;
        padding: 5px 10px;
        cursor: pointer;
    }
</style>
