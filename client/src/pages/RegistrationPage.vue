<template>
  <div>
    <p>{{ allNotes }}</p>
  </div>
</template>

<script setup>
import { getMethod } from 'src/composables/api/getApi';
import { getCurrentInstance, ref } from 'vue';

// global variables
const {proxy} = getCurrentInstance()
const serverURL = proxy.$serverURL

const allNotes = ref([])


getMethod(serverURL, 'notes/all', allNotes, 'Все заметки успешно загружены!')
</script>

<style>

</style>
