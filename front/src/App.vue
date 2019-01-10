<template>
    <div>
        <ul>
            <li v-for='(item,index) in category'>
                {{item.name}}
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
                fetchAllCategories: types.FETCH_ALL_CATEGORIES
            }),
        },

        computed: {
            ...mapGetters({
                category: types.GET_CATEGORIES
            })
        },

        created() {
            this.fetchAllCategories();
        }
    }
</script>

<style>

</style>
