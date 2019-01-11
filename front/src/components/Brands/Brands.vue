<template>
    <div class='brands'>
        <ul>
            <li v-for='(item,index) in brands'>
                {{item.name}}
            </li>
        </ul>
    </div>
</template>

<script>
    import * as types from './../../store/types';
    import {mapGetters} from 'vuex';

    export default {
        name: 'Brands',
        computed: {
            ...mapGetters({
                brands: types.GET_BRANDS
            })
        }
    }
</script>

<style>
    .brands {
        width: 25%;
        border: 1px solid black;
        height: 100%;
    }

    .brands li{

        cursor: pointer;
        margin: 2px 30px;
        padding: 5px 10px;
        list-style-type: none;
    }
</style>