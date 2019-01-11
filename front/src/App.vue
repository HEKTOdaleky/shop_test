<template>
    <div>
        <Brand/>
    </div>
</template>

<script>
    import Orders from './components/Orders/Orders';
    import Brand from './components/Brands/Brands';
    import * as types from './store/types';
    import {mapActions, mapGetters} from 'vuex';


    export default {
        components: {
            Orders,
            Brand
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
            // this.fetchAllCategories();
            // this.fetchOrders();
            this.fetchBrands();

        }
    }
</script>

<style>

</style>
