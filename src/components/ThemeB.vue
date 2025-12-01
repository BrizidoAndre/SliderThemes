<script setup>
import {computed} from "vue";

const props = defineProps(['images', 'imageIndex'])
const currentImage = computed(() => {
  return props.images[props.imageIndex]
})
</script>

<template>
  <Transition name="slider">
    <div class="container-slider" :key="imageIndex">
      <div class="slide">
        <img :src="currentImage.file" :alt="currentImage.name+ 's image'" class="image-slide">
        <p class="caption">{{ currentImage.name }}</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.container-slider {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  z-index: -1;
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

.caption {
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 0;
  padding: 1rem;
  border-radius: .5rem;
  background: white;
  transform: translateX(-100%);
  animation: show .5s .5s forwards;
}

@keyframes show {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
}

.slider-enter-from {
  transform: translateX(-100%);
}

.slider-leave-to {
  transform: translateX(100%);
}

.slider-enter-active,
.slider-leave-active {
  transition: .4s;
}
</style>
