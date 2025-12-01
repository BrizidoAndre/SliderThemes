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
      <div class="slide left">
        <img :src="currentImage.file" :alt="currentImage.name+ 's image'" class="image-slide">
      </div>
      <div class="slide right">
        <img :src="currentImage.file" :alt="currentImage.name+ 's image'" class="image-slide">
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.container-slider {
  width: 100vw;
  height: 100%;
  overflow: hidden;
  position: absolute;
  transition: .4s;
  perspective: 1000px;
}

.slide {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
  backface-visibility: hidden;
}

.left {
  left: 0;
  transform-origin: left center;
}

.right {
  right: 0;
  transform-origin: right center;
}

.image-slide {
  display: block;
  width: 200%;
  height: 100%;
  object-fit: cover;
  object-position: left;
  position: absolute;
}

.right .image-slide {
  right: 0;
}

.slider-enter-from,
.slider-leave-to,
.slider-enter-from .slide,
.slider-leave-to .slide {
  transition: .7s;
}

.slider-enter-active {
  z-index: 1;
}

.slider-leave-active {
  z-index: 2;
}

.slider-leave-to .left {
  transform: rotateY(-120deg);
}

.slider-leave-to .right {
  transform: rotateY(120deg);
}
</style>
