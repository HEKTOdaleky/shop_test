<template>
    <div class='brands'>
        <ul>
            <li
                v-for='(item,index) in brands'
                :key='index'
                v-on:click='()=>getCategories(item.name)'>
                {{item.name}}
            </li>
        </ul>
    </div>
</template>

<script>
    import * as types from './../../store/types';
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: 'Brands',

        computed: {
            ...mapGetters({
                brands: types.GET_BRANDS
            })
        },

        methods: {
            ...mapActions({
                getCategories: types.FETCH_BRAND_CATEGORIES
            })
        }

    };
</script>

<style>
    .brands {
        width: 25%;
        border: 1px solid black;
        height: auto;
        min-height: 630px;
    }

    .brands li {

        cursor: pointer;
        margin: 2px 30px;
        padding: 5px 10px;
        list-style-type: none;
    }
</style>
