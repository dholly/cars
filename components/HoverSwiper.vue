<template>
  <div
      ref="sliderContainer"
      class="hover-swiper"
      :class="{ 'hover-swiper--mobile': isMobile }"
  >
    <div ref="swiperElement" class="swiper">
      <div class="swiper-wrapper">
        <div
            v-for="(slide, index) in slides"
            :key="slide.id"
            class="swiper-slide"
        >
          <NuxtImg
              :src="slide.image"
              :alt="slide.alt"
              class="slide-image"
              fit="cover"
          />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>

    <div
        v-if="!isMobile"
        class="hover-zones"
    >
      <div
          v-for="(_, index) in slides"
          :key="`zone-${index}`"
          class="hover-zone"
          @mouseenter="goToSlide(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Swiper } from 'swiper'
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

interface SlideItem {
  id: string | number
  image: string
  alt?: string
}

interface Props {
  slides: SlideItem[]
  autoplay?: boolean
  autoplayDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: false,
  autoplayDelay: 3000
})

const sliderContainer = ref<HTMLElement>()
const swiperElement = ref<HTMLElement>()
const isMobile = ref(false)
let swiper: Swiper | null = null

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1280 || 'ontouchstart' in window
}

const goToSlide = (index: number) => {
  swiper?.slideTo(index)
}

const initSwiper = () => {
  if (!swiperElement.value) return

  checkMobile()

  const effect = isMobile.value ? 'slide' : 'fade'

  swiper = new Swiper(swiperElement.value, {
    modules: [Pagination, Autoplay, EffectFade],
    slidesPerView: 1,
    spaceBetween: 0,
    speed: effect === 'fade' ? 120 : 80,
    effect,
    nested: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },

    allowTouchMove: isMobile.value,

    ...(props.autoplay && {
      autoplay: {
        delay: props.autoplayDelay,
        disableOnInteraction: false
      }
    })
  })
}

const handleResize = () => {
  const currentMobile = window.innerWidth <= 768 || 'ontouchstart' in window

  if (currentMobile !== isMobile.value) {
    isMobile.value = currentMobile
    swiper?.destroy()
    initSwiper()
  }
}

onMounted(() => {
  initSwiper()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  swiper?.destroy()
})

defineExpose({
  goToSlide,
  nextSlide: () => swiper?.slideNext(),
  prevSlide: () => swiper?.slidePrev()
})
</script>

<style scoped lang="scss">
@use "@/styles/mixins" as *;

.hover-swiper {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hover-zones {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 10;
  pointer-events: none;
}

.hover-zone {
  flex: 1;
  pointer-events: all;
  cursor: pointer;
}

:deep(.swiper-pagination) {
  bottom: 12px;
}

:deep(.swiper-pagination-bullet) {
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.4);
  opacity: 1;
}

:deep(.swiper-pagination-bullet-active) {
  background: #fff;
}


</style>