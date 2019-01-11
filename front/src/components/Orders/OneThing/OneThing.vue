<template>
    <div class='order'>
        <div>
            <img
                    :src=image
                    alt=''
                    class=''>
        </div>
        <h6>{{name}}</h6>
        <p>{{price+' $'}}</p>
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