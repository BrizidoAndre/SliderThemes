<script setup>
import {computed} from "vue";

const props = defineProps(['images', 'imageIndex'])

</script>

<template>
  <Transition name="portal">
    <div class="container-slider" :key="imageIndex">
      <div class="half first">
        <img :src="images[imageIndex].file" :alt="images[imageIndex].name" class="half-image">
      </div>
      <div class="half second">
        <img :src="images[imageIndex].file" :alt="images[imageIndex].name" class="half-image">
      </div>
      <div class="half third">
        <img :src="images[imageIndex].file" :alt="images[imageIndex].name" class="half-image">
      </div>
      <div class="half forth">
        <img :src="images[imageIndex].file" :alt="images[imageIndex].name" class="half-image">
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.container-slider {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
}

.half {
  width: 25vw;
  height: 100vh;
  position: absolute;
  top: 0;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  overflow: hidden;
  transition: .4s;
}

.first {
  left: 0;
}

.second {
  left: 25%;
}

.third {
  left: 50%;
}

.forth {
  left: 75%;
}

.half-image {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  object-fit: cover;
}

.first .half-image {
  left: 0;
}

.second .half-image {
  left: -100%;
}

.third .half-image {
  left: -200%;
}

.forth .half-image {
  left: -300%;
}

.portal-leave-active {
  z-index: 2;
  transition: .4s;
}

.portal-enter-active {
  z-index: 1;
  transition: .4s;
}

.portal-leave-to .half {
  transform: rotateY(90deg);
}
</style>
