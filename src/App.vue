<script setup>
import AsideComponent from "@/components/AsideComponent.vue";
import {onMounted, onUnmounted, ref, watch} from "vue";
import CommandBar from "@/components/CommandBar.vue";
import ThemeA from "@/components/ThemeA.vue";
import {capitalizeWords, getRandomIntInclusive} from "@/utils.js";
import ThemeB from "@/components/ThemeB.vue";
import ThemeC from "@/components/ThemeC.vue";
import ThemeD from "@/components/ThemeD.vue";
import ThemeE from "@/components/ThemeE.vue";
import ThemeECopy from "@/components/ThemeECopy.vue";
import ThemeF from "@/components/ThemeF.vue";

const mode = ref('manual');
const theme = ref('E');
const images = ref([]);
const imageIndex = ref(0);
const commandShow = ref(false);
let intervalId = null
const intervalTime = 3000;
const themes = {
  'A': ThemeA,
  'B': ThemeB,
  'C': ThemeC,
  'D': ThemeD,
  'E': ThemeECopy,
  'F': ThemeF,
}
let timeOut = false;

function handlePressKey(ev) {
  let {key, ctrlKey} = ev;
  if (key.toLowerCase() === 'k' && ctrlKey || key === '/') {
    ev.preventDefault()
    commandShow.value = true;
  }
}

function closeCommand() {
  commandShow.value = false;
}

function submitCommand(counter) {
  switch (counter) {
    case 0:
      mode.value = 'manual';
      break;
    case 1:
      mode.value = 'automatic';
      break;
    case 2:
      mode.value = 'random';
      break;
    case 3:
      theme.value = 'A';
      break;
    case 4:
      theme.value = 'B';
      break;
    case 5:
      theme.value = 'C';
      break;
    case 6:
      theme.value = 'D';
      break;
    case 7:
      theme.value = 'E';
      break;
    case 8:
      theme.value = 'F';
      break;
  }
  closeCommand()
}

onMounted(() => {
  window.addEventListener('keydown', handlePressKey)
  loadDefaultImages()
})
onUnmounted(() => {
  window.removeEventListener('keydown', handlePressKey)
})

function handleInputFiles(ev) {
  let files = ev.target.files;
  [...files].forEach(file => {
    const url = URL.createObjectURL(file);
    const name = capitalizeWords(file.name);
    images.value.push({
      file: url,
      name: name
    });
  })
}

function handleDrop(ev) {
  [...ev.dataTransfer.files].forEach(file => {
    const url = URL.createObjectURL(file);
    const name = capitalizeWords(file.name);
    images.value.push({
      file: url,
      name: name
    });
  })
}

function loadDefaultImages() {
  let modules = import.meta.glob('@/fotos/*', {eager: true});
  for (const modulesKey in modules) {
    let names = modulesKey.split('/');
    images.value.push({
      file: '.' + modulesKey,
      name: capitalizeWords(names[names.length - 1]),
    })
  }
}

function moveIndex(moveTo) {
  imageIndex.value = (imageIndex.value + images.value.length + moveTo) % images.value.length;
}

function loadManual(ev) {
  if (timeOut) {
    return null;
  }
  timeOut = true;
  let {key} = ev;
  if (key === 'ArrowRight') {
    moveIndex(1);
  } else if (key === 'ArrowLeft') {
    moveIndex(-1);
  }
  setTimeout(() => {
    timeOut = false;
  }, 400)
}

function loadAutomatic() {
  intervalId = setInterval(() => {
    moveIndex(1)
  }, intervalTime)
}

function loadRandom() {
  intervalId = setInterval(() => {
    imageIndex.value = getRandomIntInclusive(0, images.value.length);
  }, intervalTime)
}

watch(mode, (value, oldValue) => {
  window.removeEventListener('keydown', loadManual);
  clearInterval(intervalId);
  if (value === 'manual') {
    window.addEventListener('keydown', loadManual);
  } else if (value === 'automatic') {
    loadAutomatic()
  } else if (value === 'random') {
    loadRandom();
  }
}, {immediate: true})
</script>

<template>
  <Transition name="command">
    <CommandBar v-if="commandShow" @close="closeCommand" @submit="submitCommand"/>
  </Transition>
  <div class="container-home">
    <AsideComponent
        v-model:mode="mode"
        v-model:theme="theme"
        v-model:images="images"
    />
    <component v-if="images.length > 0" :is="themes[theme]" :images="images" :imageIndex="imageIndex"/>
    <div v-else class="drop-area" @drop.prevent="handleDrop" @dragover.prevent="">
      <p>Drop the files here</p>
      <div>
        <button class="btn btn-secondary my-3" @click="loadDefaultImages">Load default Images</button>
      </div>
      <input class="" type="file" name="" id="" @change="handleInputFiles" multiple>
    </div>
  </div>
</template>

<style scoped>
.command-enter-from,
.command-leave-to {
  opacity: 0;
}

.command-enter-active,
.command-leave-active {
  transition: .4s;
}

.container-home {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.drop-area {
  width: 50%;
  height: 50%;
  border-radius: .5rem;
  border: 3px dashed var(--bs-primary);
  text-align: center;
  padding: 2rem;
}
</style>
