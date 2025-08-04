<template>
  <div class="demo-page">
    <div class="container">
      <HoverSwiper :slides="slides" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface SlideItem {
  id: string | number
  image: string
}

const slides: SlideItem[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop'
  }
]
</script>

<style scoped>
.demo-page {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 2rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}
</style>