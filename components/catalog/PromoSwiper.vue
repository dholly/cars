<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue'
import {FreeMode, Pagination} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

interface PromoCard {
  id: number;
  title: string;
  image: string;
  tags: string[];
  link?: string;
}

interface Props {
  promos: Array<PromoCard>
}

const props = defineProps<Props>();
const {promos} = toRefs(props);

const modules = [FreeMode, Pagination]

const swiperOptions = {
  slidesPerView: 1,
  spaceBetween: 16,
  freeMode: true,
}
</script>

<template>
  <div class="promo-swiper">
    <Swiper
        :modules="modules"
        v-bind="swiperOptions"
        class="promo-swiper__container"
    >
      <SwiperSlide
          v-for="promo in promos"
          :key="promo.id"
          class="promo-swiper__slide"
      >
        <div
            class="promo-card"
            :style="{ backgroundImage: `url(${promo.image})` }"
        >
          <div class="promo-card__overlay"></div>
          <div class="promo-card__content">
            <div class="promo-card__tags">
              <span
                  v-for="tag in promo.tags"
                  :key="tag"
                  class="promo-card__tag"
              >
                {{ tag }}
              </span>
            </div>
            <h3 class="promo-card__title">{{ promo.title }}</h3>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped lang="scss">
.promo-swiper {
  padding: 40px 20px 20px 20px;
  width: 802px;
  height: 555px;
  .swiper{
    border-radius: 24px;
    height: 100%;
  }
}

.promo-card {
  position: relative;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  cursor: pointer;

  &__content {
    position: relative;
    z-index: 1;
    padding: 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  &__tag {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    color: #374151;
  }

  &__title {
    color: white;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.2;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
}

:deep(.swiper-pagination) {
  bottom: 10px;
}

:deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.5);
  opacity: 1;
  width: 8px;
  height: 8px;
}

:deep(.swiper-pagination-bullet-active) {
  background: white;
}
</style>