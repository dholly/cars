<script setup lang="ts">
import CarList from "../components/catalog/CarList.vue";
import {useCars} from "../composable/useCars.js";
import CategoriesList from "../components/catalog/CategoriesList.vue";
import PromoSwiper from "../components/catalog/PromoSwiper.vue";

const { cars } = useCars();

const categoriesData = [
  {
    id: 1,
    title: 'Buy car',
    icon: '/images/category-0.png',
    link: '/cars/buy'
  },
  {
    id: 2,
    title: 'Rent car',
    icon: '/images/category-1.png',
    link: '/cars/rent'
  },
  {
    id: 3,
    title: 'Car finance',
    icon: '/images/category-2.png',
    link: '/cars/finance'
  },
  {
    id: 4,
    title: 'Buy property',
    icon: '/images/category-3.png',

    link: '/property/buy'
  },
  {
    id: 5,
    title: 'Rent property',
    icon: '/images/category-4.png',
    link: '/property/rent'
  },
  {
    id: 6,
    title: 'Mortgage',
    icon: '/images/category-5.png',
    link: '/property/mortgage'
  }
];
const promoData = [
  {
    id: 1,
    title: 'Car mortgage in UAE starting at 3.79%',
    image: '/images/promo-1.png',
    tags: ['Mortgage', 'Until 25 July'],
    link: '/promo/car-mortgage'
  },
  {
    id: 2,
    title: 'Special offer on luxury cars',
    image: '/images/promo-2.png',
    tags: ['Limited time', 'Premium'],
    link: '/promo/luxury-cars'
  },
  {
    id: 3,
    title: 'Electric cars with 0% financing',
    image: '/images/promo-3.png',
    tags: ['Eco-friendly', 'Zero interest'],
    link: '/promo/electric-cars'
  },
]
</script>

<template>
  <div class="container cars-listing">
    <div>
      <PromoSwiper :promos="promoData" />
    </div>
    <div>
      <h2>Categories</h2>
      <CategoriesList :categories="categoriesData" />
    </div>
    <div>
      <h2>Recently in cars</h2>
      <CarList :cars="cars"/>
    </div>
    <div>
      <h2>Popular in cars</h2>
      <CarList :cars="cars"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/mixins" as *;

body {
  background: #f5f5f5;
  color: #1a1a1a;
}

.container {
  width: 100%;
  max-width: 1620px;
  padding-left: 48px;
  padding-right: 48px;
  margin-right: auto;
  margin-left: auto;
  @include respond(1279px) {
    padding-left: 16px;
    padding-right: 16px;
  }
}

.cars-listing {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

h2 {
  font-weight: 700;
  font-size: 24px;
  line-height: 106%;
  margin-bottom: 32px;
}
</style>