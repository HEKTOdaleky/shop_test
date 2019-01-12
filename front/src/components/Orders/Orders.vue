<template>
    <div class='orders'>
        <OneThing
                v-for='(item,index) in orders'
                :image='imageUrl + item.image'
                :name='item.name'
                :price='item.price'
                :click='()=>console.log(item.name)'
                :modelId='item.orderNum'/>
    </div>
</template>

<script>
    import OneThing from './OneThing/OneThing';
    import * as types from '../../store/types';
    import {mapGetters} from 'vuex';
    import {imageUrl} from '../../config';

    export default {
        components: {
            OneThing
        },

        computed: {
            ...mapGetters({
                orders: types.GET_ORDERS
            })
        },

        data() {
            return {
                imageUrl
            }
        }

    }
</script>

<style>
    .orders {
        display: flex;
        flex-wrap: wrap;
        width: 47%;
        margin-left: 60px;
    }

</style>