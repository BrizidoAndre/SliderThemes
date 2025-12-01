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
        <p class="caption">
          <span
              v-for="(word, index) in currentImage.name.split(' ')"
              class="me-1"
              :style="{
            '--anim-delay': (index * .4) + 's'
            }"
          >
          {{ word }}
          </span>
        </p>
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
}

.caption span {
  display: inline-block;
  opacity: 0;
  transform: translateY(100%);
  animation: showup .4s var(--anim-delay) forwards;
}

@keyframes showup {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
}

.slider-enter-from {
  transform: translateY(100%);
}

.slider-leave-to {
  transform: translateY(-100%);
}

.slider-enter-active,
.slider-leave-active {
  transition: .4s;
}
</style>
