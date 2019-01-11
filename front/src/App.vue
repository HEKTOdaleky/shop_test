<template>
    <div>
        <ul>
            <li v-for='(item,index) in category'>
                {{item.category && item.category.name}}
            </li>
        </ul>
        <Orders/>
    </div>
</template>

<script>
    import Orders from './components/Orders/Orders';
    import * as types from './store/types';
    import {mapActions, mapGetters} from 'vuex';


    export default {
        components: {
            Orders
        },

        methods: {
            ...mapActions({
                fetchAllCategories: types.FETCH_ALL_CATEGORIES,
                fetchOrders: types.FETCH_ORDERS
            }),
        },

        computed: {
            ...mapGetters({
                category: types.GET_CATEGORIES
            })
        },

        created() {
            this.fetchAllCategories();
            this.fetchOrders();

        }
    }
</script>

<style>
    li {
        display: inline-block;
        cursor: pointer;
        margin: 2px 30px;
        padding: 5px 10px;
    }
</style>
