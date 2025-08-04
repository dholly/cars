<template>
  <div class="gallery-swiper">
    <div class="main-swiper-container">
      <div ref="mainSwiperElement" class="swiper main-swiper">
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
      </div>
    </div>

    <div class="thumbs-swiper-container">
      <div ref="thumbsSwiperElement" class="swiper thumbs-swiper">
        <div class="swiper-wrapper">
          <div
              v-for="(slide, index) in slides"
              :key="`thumb-${slide.id}`"
              class="swiper-slide thumb-slide"
              :class="{ 'thumb-slide--active': index === activeSlideIndex }"
          >
            <NuxtImg
                :src="slide.thumbnail || slide.image"
                :alt="slide.alt"
                class="thumb-image"
                fit="cover"
            />
          </div>
          <div
              v-for="(slide, index) in slides"
              :key="`thumb-${slide.id}`"
              class="swiper-slide thumb-slide"
              :class="{ 'thumb-slide--active': index === activeSlideIndex }"
          >
            <NuxtImg
                :src="slide.thumbnail || slide.image"
                :alt="slide.alt"
                class="thumb-image"
                fit="cover"
            />
          </div>
          <div
              v-for="(slide, index) in slides"
              :key="`thumb-${slide.id}`"
              class="swiper-slide thumb-slide"
              :class="{ 'thumb-slide--active': index === activeSlideIndex }"
          >
            <NuxtImg
                :src="slide.thumbnail || slide.image"
                :alt="slide.alt"
                class="thumb-image"
                fit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Swiper } from 'swiper'
import { Thumbs, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'

interface SlideItem {
  id: string | number
  image: string
  thumbnail?: string
  alt?: string
}

interface Props {
  slides: SlideItem[]
}

const props = defineProps<Props>()

const mainSwiperElement = ref<HTMLElement>()
const thumbsSwiperElement = ref<HTMLElement>()
const activeSlideIndex = ref(0)

let mainSwiper: Swiper | null = null
let thumbsSwiper: Swiper | null = null

const initSwipers = () => {
  if (!mainSwiperElement.value || !thumbsSwiperElement.value) return

  thumbsSwiper = new Swiper(thumbsSwiperElement.value, {
    modules: [FreeMode],
    slidesPerView: 'auto',
    freeMode: {
      enabled: true,
      sticky: false
    },
    direction: 'vertical',
    watchSlidesProgress: true,
    centerInsufficientSlides: true
  })

  mainSwiper = new Swiper(mainSwiperElement.value, {
    modules: [Thumbs],
    spaceBetween: 0,
    speed: 300,
    thumbs: {
      swiper: thumbsSwiper
    },
    on: {
      slideChange: (swiper: Swiper) => {
        activeSlideIndex.value = swiper.activeIndex
      }
    }
  })
}

const goToSlide = (index: number) => {
  mainSwiper?.slideTo(index)
}

watch(() => props.slides, () => {
  if (mainSwiper) {
    mainSwiper.update()
  }
  if (thumbsSwiper) {
    thumbsSwiper.update()
  }
}, { deep: true })

onMounted(() => {
  initSwipers()
})

onUnmounted(() => {
  mainSwiper?.destroy()
  thumbsSwiper?.destroy()
})

defineExpose({
  goToSlide,
  nextSlide: () => mainSwiper?.slideNext(),
  prevSlide: () => mainSwiper?.slidePrev(),
  getCurrentIndex: () => mainSwiper?.activeIndex || 0
})
</script>

<style scoped lang="scss">
@use "@/styles/mixins" as *;

.gallery-swiper {
  display: flex;
  width: 100%;
  height: 520px;
}

.main-swiper-container {
  flex: 1;
  min-height: 0;
  overflow: hidden;

  @include respond($laptop) {
    border-radius: 20px;
  }
}

.main-swiper {
  width: 100%;
  height: 100%;

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
}

.thumbs-swiper-container {
  width: 130px;
  height: 100%;
}

.thumbs-swiper {
  height: 100%;

  .swiper-wrapper {
    flex-direction: column;
  }

  .thumb-slide {
    width: 100%;
    height: 130px;
    object-fit: cover;
    overflow: hidden;
    cursor: pointer;
  }

  .thumb-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>