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
    import {mapActions, mapGetters, mapMutations} from 'vuex';


    export default {
        components: {
            Orders,
            Brand,
            Categories,
            Header
        },

        methods: {
            ...mapActions({
                fetchBrands: types.FETCH_BRANDS
            }),

            ...mapMutations({initialDataFromLocalStorage: types.INITIAL_DATA_FROM_LOCAL_STORAGE})
        },

        computed: {
            ...mapGetters({
                category: types.GET_CATEGORIES
            })
        },

        created() {
            this.fetchBrands();
            this.initialDataFromLocalStorage();
        }
    }
</script>

<style>
    body {
        margin: 0;
    }
</style>
