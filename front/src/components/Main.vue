<template>
    <div class='main'>
        <Brand/>
        <Categories/>
        <Orders/>
    </div>
</template>

<script>
import Orders from './Orders/Orders';
import Brand from './Brands/Brands';
import Categories from '../components/Categories/Categories';

export default {
  components: {
    Orders,
    Brand,
    Categories
  }

};
</script>

<style>
    .main {
        display: flex;
    }
</style>
