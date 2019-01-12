<template>
    <div>
        <div v-if='!this.error && !this.pending' class="order-description">
            <div class='order-description__image'>
                <div class='order-description__img'><img :src='imageUrl+order.image'/></div>
                <div class='order-description__preview'></div>
            </div>
            <div class='order-description__description'>
                <div class="order-description__container">
                    <h6 class='order-description__name'>{{order.brand +' '+order.name}}</h6>
                    <p class='order-description__price'>{{order.price+'$'}}</p>
                    <button>ADD TO CART</button>
                    <strong>Description:</strong>
                    <p>{{order.about}}</p>
                </div>
            </div>
        </div>
        <div
                class='order-description--error'
                v-if='this.error'>
            <p>{{this.error.message}}</p>
            <div class="order-description__main-link">
                <router-link to='/'>Go to main menu</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from '../../store/types';
    import {mapActions, mapGetters} from 'vuex';
    import {imageUrl} from '../../config';

    export default {
        name: 'OrderDescription',

        methods: {
            ...mapActions({getCurrentOrder: types.FETCH_ONE_ORDER})
        },

        computed: {
            ...mapGetters({
                order: types.GET_ONE_ORDER,
                error: types.GET_ONE_ORDER_ERROR,
                pending: types.GET_ONE_ORDER_PENDING
            })
        },

        created() {
            this.getCurrentOrder(window.location.pathname.split(':')[1]);
        },

        data() {
            return {
                imageUrl
            }
        }
    }
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
</style>