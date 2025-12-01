<script setup>
import {computed} from "vue";

const props = defineProps(['images', 'imageIndex'])
const currentImage = computed(() => {
  return props.images[props.imageIndex]
})
</script>

<template>
  <div class="container-slider">
    <div class="slide">
      <img :src="currentImage.file" :alt="currentImage.name+ 's image'" class="image-slide">
      <p class="caption">{{ currentImage.name }}</p>
    </div>
  </div>
</template>

<style scoped>
.container-slider {
  width: 100%;
  height: 100%;
}

.slide {
  width: 100%;
  height: 100%;
}

.image-slide {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.caption{
  position: absolute;
  left: 0;
  bottom:0;
  margin: 0;
  padding: 1rem;
  border-radius: .5rem;
  background:white;
}
</style>
