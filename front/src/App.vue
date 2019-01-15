<template>
    <div class='container'>
        <header>
            <Header/>
        </header>
        <router-view/>
        <div
            class='modal-cont'
            v-if='isModalShow'>

            <div
                class='backdrop'
                v-on:click='showLogin'/>

            <div class='modal-window'>
                <Login/>
            </div>
        </div>
    </div>
</template>

<script>
    import Orders from './components/Orders/Orders';
    import Brand from './components/Brands/Brands';
    import Categories from './components/Categories/Categories';
    import Header from './components/Header/Header';
    import Login from './components/Login/Login';
    import * as types from './store/types';
    import * as loginTypes from './store/loginTypes';

    import {mapActions, mapGetters, mapMutations} from 'vuex';

    export default {
        components: {
            Orders,
            Brand,
            Categories,
            Header,
            Login
        },

        computed: {
            ...mapGetters({
                category: types.GET_CATEGORIES,
                isModalShow: loginTypes.MODAL_STATE
            })
        },

        created() {
            this.fetchBrands();
            this.initialDataFromLocalStorage();
        },

        methods: {
            ...mapActions({
                fetchBrands: types.FETCH_BRANDS

            }),

            ...mapMutations({
                initialDataFromLocalStorage: types.INITIAL_DATA_FROM_LOCAL_STORAGE,
                showLogin: loginTypes.SHOW_MODAL
            })
        },

    };
</script>

<style>
    body {
        margin: 0;
    }

    .backdrop {
        background: black;
        opacity: 0.5;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
    }

    .modal-cont {
        display: flex;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .modal-window {
        margin: auto;
        position: relative;
        z-index: 3;
    }
</style>
