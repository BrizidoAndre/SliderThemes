<script setup>

import {useId} from "vue";

const id = useId();
defineProps(['name','value'])
const model = defineModel();
</script>

<template>
  <div class="form-check">
    <input class="form-check-input" type="radio" :name="name" :id="id" :value="value" v-model="model">
    <label class="form-check-label" :for="id">
      <slot></slot>
    </label>
  </div>
</template>

<style scoped>

</style>
