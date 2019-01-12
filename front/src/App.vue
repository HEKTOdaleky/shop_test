<template>
    <div class='container'>
        <header>
            <Header/>
        </header>
        <router-view></router-view>
    </div>
</template>

<script>
    import Orders from './components/Orders/Orders';
    import Brand from './components/Brands/Brands';
    import Categories from './components/Categories/Categories';
    import Header from './components/Header/Header';
    import * as types from './store/types';
    import {mapActions, mapGetters} from 'vuex';


    export default {
        components: {
            Orders,
            Brand,
            Categories,
            Header
        },

        methods: {
            ...mapActions({
                // fetchAllCategories: types.FETCH_ALL_CATEGORIES,
                // fetchOrders: types.FETCH_ORDERS,
                fetchBrands: types.FETCH_BRANDS
            }),
        },

        computed: {
            ...mapGetters({
                category: types.GET_CATEGORIES
            })
        },

        created() {
            this.fetchBrands();

        }
    }
</script>

<style>
    body {
    margin: 0;
    }
</style>
