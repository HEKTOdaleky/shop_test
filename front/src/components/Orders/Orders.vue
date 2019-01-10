<template>
    <div>
        <OneThing
                v-for='(item,index) in orders'
                :image='item.image'
                :name='item.name'
                :price='item.price'/>
    </div>
</template>

<script>
    import OneThing from './OneThing/OneThing';
    import * as types from '../../store/types';
    import {mapGetters} from 'vuex';

    export default {
        components: {
            OneThing
        },

        computed: {
            ...mapGetters({
                orders: types.GET_ORDERS
            })
        }

    }
</script>

<style>

    
</style>