<script setup="">

defineProps(['images', 'imageIndex'])
</script>

<template>
  <Transition name="door">
    <div class="container-slider" :key="imageIndex">
      <div class="half left">
        <img :src="images[imageIndex].file" :alt="images[imageIndex].name" class="image-half">
      </div>
      <div class="half right">
        <img :src="images[imageIndex].file" :alt="images[imageIndex].name" class="image-half">
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.container-slider {
  position: absolute;
  width: 100vw;
  height: 100vh;
  perspective: 1000px;
}

.half {
  position: absolute;
  width: 50vw;
  height: 100vh;
  top: 0;
  overflow: hidden;
  transition: .4s;
  transform-style: preserve-3d;
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

.image-half {
  position: absolute;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  top: 0;
}

.left .image-half {
  left: 0;
}

.right .image-half {
  right: 0;
}

.door-leave-active {
  transition: .4s;
  z-index: 2;
}

.door-enter-active {
  transition: .4s;
  z-index: 1;
}

.door-enter-from .half {
  transform: rotateY(0deg);
}

.door-leave-to .right {
  transform: rotateY(90deg);
}

.door-leave-to .left {
  transform: rotateY(-90deg);
}
</style>
