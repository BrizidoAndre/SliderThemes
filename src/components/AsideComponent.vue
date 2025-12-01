<script setup>
import Radio from "@/components/Radio.vue";
import {ref} from "vue";

const mode = defineModel('mode');
const theme = defineModel('theme');
const images = defineModel('images');
const show = ref(false);
let elementDragged = null;

function handleDrop(insertTo) {
  if (elementDragged === null) {
    return null;
  }
  let objectDragged = images.value[elementDragged];
  let objectReplaced = images.value[insertTo];
  images.value.splice(insertTo, 1, objectDragged);
  images.value.splice(elementDragged, 1, objectReplaced);
  elementDragged = null;
}
</script>

<template>
  <img @click="show = !show" class="aside-btn" src="@/assets/setting-icon.png" alt="Presso to toggle side menu">
  <aside class="aside-slider text-light"
         :class="{
    'show': show
    }"
  >
    <h2>Modos</h2>
    <Radio v-model="mode" name="mode" value="manual">Modo manual</Radio>
    <Radio v-model="mode" name="mode" value="automatic">Automático</Radio>
    <Radio v-model="mode" name="mode" value="random">Randômico</Radio>
    <h2>Temas</h2>
    <Radio v-model="theme" name="theme" value="A">Tema A</Radio>
    <Radio v-model="theme" name="theme" value="B">Tema B</Radio>
    <Radio v-model="theme" name="theme" value="C">Tema C</Radio>
    <Radio v-model="theme" name="theme" value="D">Tema D</Radio>
    <Radio v-model="theme" name="theme" value="E">Tema E</Radio>
    <Radio v-model="theme" name="theme" value="F">Tema F</Radio>
    <h2>Ordenação</h2>
    <div
        v-for="(item, index) in images"
        class="slide-drag mb-3"
        draggable="true"
        @dragover.prevent
        @drop.prevent="handleDrop(index)"
        @dragstart="elementDragged = index"
    >
      <img class="aside-image" :key="item.name + item.file" :src="item.file"
           :alt="item.name+ 's  image'">
      <p>{{ item.name }}</p>
    </div>
  </aside>
</template>

<style scoped>

.aside-slider {
  z-index: 4;
}

.slide-drag {
  transition: .4s;
  padding: .5rem;
  border-radius: .5rem;
  cursor: pointer;
}

.slide-drag:hover {
  background: rgba(255, 255, 255, .5);
}
</style>
