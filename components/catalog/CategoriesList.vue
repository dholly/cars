<script setup lang="ts">
interface Category {
  id: number;
  title: string;
  icon: string;
  iconColor?: string;
  link?: string;
}

interface Props {
  categories: Array<Category>
}

const props = defineProps<Props>();
const {categories} = toRefs(props);
</script>

<template>
  <div class="categories">
    <div class="categories__grid">
      <div
          v-for="category in categories"
          :key="category.id"
          class="category-card"
      >
        <div class="category-card__icon-wrapper">
          <NuxtImg
              :src="category.icon"
              :alt="category.title"
              class="category-card__icon"
          />
        </div>
        <h3 class="category-card__title">{{ category.title }}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/mixins" as *;

.categories {
  &__grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
    @include respond(1279px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @include respond($laptop) {
      grid-template-columns: repeat(2, 1fr);
    }
    @include respond(399px){
      grid-template-columns: 1fr;
    }
  }
}

.category-card {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.07);
  background: #fff;
  border-radius: 24px;
  padding: 0px 16px 24px 16px;

  h3 {
    font-weight: 700;
    font-size: 18px;
    text-align: center;
    margin-top: 10px;
  }

  &__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 138px;
      height: 108px;
    }
  }
}
</style>