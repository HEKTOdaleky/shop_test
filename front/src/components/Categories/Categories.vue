<template>
    <div class='categories'>
        <ul>
            <li
                    v-for='(item,index) in categories'
                    v-on:click='()=>fetchOrders({category:item.category.name, brand:item.brand.name})'>
                {{item.category.name}}
            </li>
        </ul>
    </div>
</template>

<script>
    import * as types from '../../store/types';
    import {mapGetters, mapActions} from 'vuex';


    export default {
        name: 'Categories',
        methods: {
            ...mapActions({
                fetchOrders: types.FETCH_ORDERS
            })
        },

        computed: {
            ...mapGetters({
                categories: types.GET_CATEGORIES
            })
        }
    }
</script>

<style>
    .categories {
        border: 1px solid black;
        height: auto;
        min-height: 630px;
        width: 25%;
    }

    .categories li {

        cursor: pointer;
        margin: 2px 30px;
        padding: 5px 10px;
        list-style-type: none;
    }
</style>