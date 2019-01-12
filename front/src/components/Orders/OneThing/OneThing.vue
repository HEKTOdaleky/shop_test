<template>
    <div class='order'>
        <router-link class="nav-link" :to="link">
            <div>
                <img
                        :src=image
                        alt=''
                        class=''>
            </div>
            <h6>{{name}}</h6>
            <p>{{price+' $'}}</p>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'OneThing',
        props: {
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            name: {
                type: String
            },
            click: {
                type: Function,
                required: true
            }
        },
        data() {
            return {
                link: '/order:' + this.name
            }
        }
    };
</script>

<style>
    .order {
        width: 25%;
        min-width: 250px;
        max-width: 350px;
    }

    img {
        width: 50%;
        height: auto;
    }
</style>