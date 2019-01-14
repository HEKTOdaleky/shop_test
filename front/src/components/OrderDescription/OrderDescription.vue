<template>
    <div>
        <div
            v-if='!error && !pending'
            class="order-description">
            <div class='order-description__image'>
                <div class='order-description__img'>
                    <img :src='imageUrl+order.image'>
                </div>
                <div class='order-description__preview'/>
            </div>

            <div class='order-description__description'>
                <div class="order-description__container">
                    <h6 class='order-description__name'>
                        {{order.brand && order.brand.name +' '+order.name}}
                    </h6>

                    <p class='order-description__price'>
                        {{order.price+'$'}}
                    </p>

                    <button
                        v-if='!getCart[order.orderNum]'
                        v-on:click='()=>addToCart(order)'>
                        ADD TO CART
                    </button>

                    <div
                        v-if='getCart[order.orderNum]'
                        class='order-description__counter'>
                        <p v-on:click='()=>removeFromCart(order)'>
                            -
                        </p>
                        <p class='order-description__counter--info'>
                            {{getCart[order.orderNum] && getCart[order.orderNum].count}}
                        </p>
                        <p v-on:click='()=>addToCart(order)'>
                            +
                        </p>
                    </div>

                    <strong>Description:</strong>
                    <p>{{order.about}}</p>
                </div>
            </div>
        </div>
        <div
            class='order-description--error'
            v-if='error'>
            <p>{{error.message}}</p>
            <div class="order-description__main-link">
                <router-link to='/'>
                    Go to main menu
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from '../../store/types';
    import {mapActions, mapGetters, mapMutations} from 'vuex';
    import {imageUrl} from '../../config';

    export default {
        name: 'OrderDescription',

        data() {
            return {
                imageUrl
            };
        },

        computed: {
            ...mapGetters({
                order: types.GET_ONE_ORDER,
                error: types.GET_ONE_ORDER_ERROR,
                pending: types.GET_ONE_ORDER_PENDING,
                getCart: types.GET_USER_CART
            })
        },

        created() {
            this.getCurrentOrder(window.location.pathname.split(':')[1]);
        },

        methods: {
            ...mapActions({
                getCurrentOrder: types.FETCH_ONE_ORDER
            }),
            ...mapMutations({
                addToCart: types.ADD_ITEM_TO_CART,
                removeFromCart: types.REMOVE_ITEM_FROM_CART
            })
        },

    };
</script>

<style>
    .order-description {
        display: flex;
        padding: 0 30px;
        justify-content: space-between;

    }

    .order-description__image {
        width: 48%;
        display: flex;
    }

    .order-description__img {
        width: 80%;
    }

    .order-description__preview {
        width: 10%;
        border: 1px solid gainsboro;
        margin-left: 30px;
    }

    .order-description__description {
        width: 48%;
    }

    .order-description__container {
        margin: 80px;
        width: 50%;
    }

    .order-description__container > button {
        width: 100%;
        background: dimgrey;
        border: none;
        padding: 10px;
        margin: 30px 0;
        color: white;
        font-weight: bold;
        cursor: pointer;
    }

    .order-description__name {
        font-size: 18px;
        margin-bottom: 5px;
    }

    .order-description__price {
        font-size: 18px;
        font-weight: bold;
        margin: 0;
    }

    .order-description--error > p {
        font-size: 28px;
        font-weight: bold;
        text-align: center;
        padding: 80px 80px 0;
    }

    .order-description__main-link {
        display: block;
        margin: 0 auto;
        width: 250px;
    }

    .order-description__counter {
        width: 100%;
        display: flex;
        border: 1px solid black;

    }

    .order-description__counter > p {
        width: 25%;
        display: block;
        margin: 0;
        text-align: center;
        padding: 10px;
        font-size: 18px;
        cursor: pointer;
        user-select: none;
    }

    .order-description__counter > .order-description__counter--info {
        width: 48%;
        border-left: 1px solid black;
        border-right: 1px solid black;
        cursor: auto;
    }
</style>
