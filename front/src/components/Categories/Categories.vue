<template>
    <div class='categories'>
        <ul>
            <li
                    v-for='(item,index) in categories'>
                {{item.category.name}}
            </li>
        </ul>
    </div>
</template>

<script>
    import * as types from '../../store/types';
    import {mapGetters} from 'vuex';


    export default {
        name: 'Categories',
        computed: {
            ...mapGetters({
                categories: types.GET_CATEGORIES
            })
        }
    }
</script>

<style>
    .categories {
        border: 1px solid brown;
    }

    .categories li {

        cursor: pointer;
        margin: 2px 30px;
        padding: 5px 10px;
        list-style-type: none;
    }
</style>