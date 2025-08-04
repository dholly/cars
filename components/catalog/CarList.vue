<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue'
import {FreeMode} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import CarCard from './CarCard.vue'
import {useWindowSize} from '@vueuse/core'

interface Car {
  id: number;
  name: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  images: Array<{
    id: string | number;
    image: string;
    alt?: string;
  }>;
}

interface Props {
  cars: Array<Car>
}

const props = defineProps<Props>();
const {cars} = toRefs(props);

const {width} = useWindowSize()
const isMobile = computed(() => width.value < 1280)
const isHydrated = ref(false)
const carsToShow = computed(() => cars.value.slice(0, 8))

const modules = [FreeMode]

const swiperOptions = {
  slidesPerView: 'auto' as const,
  spaceBetween: 12,
  freeMode: true,
}

onMounted(() => {
  isHydrated.value = true
})
</script>

<template>
  <div class="catalog">
    <div
        v-if="!isHydrated || !isMobile"
        class="catalog__grid"
    >
      <CarCard
          v-for="car in carsToShow"
          :key="car.id"
          :car="car"
      />
    </div>

    <Swiper
        v-if="isHydrated && isMobile"
        :modules="modules"
        v-bind="swiperOptions"
        class="catalog__swiper"
    >
      <SwiperSlide
          v-for="car in carsToShow"
          :key="car.id"
          class="catalog__slide"
      >
        <CarCard :car="car"/>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/mixins" as *;

.catalog {
  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  .swiper {
    margin: -24px -16px;
    padding: 24px 16px;
  }

  .swiper-slide {
    max-width: 287px;
    @include respond($laptop) {
      max-width: 302px;
    }
  }
}
</style>