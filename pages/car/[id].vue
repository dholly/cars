<script setup>
import {useCars} from "../../composable/useCars.js";

const route = useRoute()
const { getCarById } = useCars()
const car = getCarById(route.params.id)


</script>

<template>
  <div class="container">
    <div class="page-layout">
      <div class="main-content">
        <div class="gallery-container">
          <GallerySwiper :slides="car.images"/>
        </div>
        <div class="car-info">

        </div>
        <div class="car-info">

        </div>
        <div class="car-info">

        </div>
        <div class="car-info">

        </div>
      </div>
      <div class="sidebar">
        <div class="car-owner">

        </div>
      </div>
    </div>
  </div>
</template>

<style>
.page-layout {
  display: flex;
  gap: 32px;
}

.main-content {
  flex: 1;
  max-width: 1164px;
}

.sidebar {
  width: 424px;
}

.gallery-container{
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
}

.car-info{
  border-radius: 24px;
  padding: 24px;
  width: 100%;
  height: 261px;
  background: #fff;
  margin-top: 12px;
}

.car-owner{
  position: sticky;
  top: 20px;

  border-radius: 24px;
  padding: 16px;
  width: 100%;
  height: 184px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.07);
  background: #fff;
}

body{
  background: #f5f5f5;
  color: #1a1a1a;
}

.container{
  max-width: 1660px;
  margin-right: auto;
  margin-left: auto;
}

</style>