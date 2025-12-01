<script setup>
import {onMounted, onUnmounted, ref} from "vue";

const props = defineProps(['show'])
const emits = defineEmits(['close', 'submit'])
const indexList = ref(0);

function changeIndexList(newIndex) {
  indexList.value = (indexList.value + 9 + newIndex) % 9;
}

function handlePressKey(ev) {
  let {key, ctrlKey} = ev;
  if (key === 'Escape') {
    emits('close')
  } else if (key === 'ArrowDown') {
    changeIndexList(1);
  } else if (key === 'ArrowUp') {
    changeIndexList(-1)
  } else if (key === 'Enter'){
    emits('submit', indexList.value);
  }
}

onMounted(() => {
  window.addEventListener('keydown', handlePressKey)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handlePressKey)
})
</script>

<template>
  <div class="position-fixed vw-100 vh-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center z-3"
       @click="emits('close')"
       @click.right.prevent="emits('close')"
  >
    <div class="p-5 bg-light rounded-3" @click.stop.prevent="">
      <h2>Linha de comando</h2>
      <input type="text" class="form-control my-3">
      <ul class="list-group">
        <li :class="{'active': indexList === 0}" class="list-group-item">Modo manual</li>
        <li :class="{'active': indexList === 1}" class="list-group-item">Modo automático</li>
        <li :class="{'active': indexList === 2}" class="list-group-item">Modo random</li>
        <li :class="{'active': indexList === 3}" class="list-group-item">Tema A</li>
        <li :class="{'active': indexList === 4}" class="list-group-item">Tema B</li>
        <li :class="{'active': indexList === 5}" class="list-group-item">Tema C</li>
        <li :class="{'active': indexList === 6}" class="list-group-item">Tema D</li>
        <li :class="{'active': indexList === 7}" class="list-group-item">Tema E</li>
        <li :class="{'active': indexList === 8}" class="list-group-item">Tema F</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.show {
  display: block;
}
</style>
