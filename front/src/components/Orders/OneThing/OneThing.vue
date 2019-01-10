<template>
    <div>
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

</style>