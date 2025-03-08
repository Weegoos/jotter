<template>
  <div>
    <p>{{ allNotes }}</p>
  </div>
</template>

<script setup>
import axios from 'axios';
import { getMethod } from 'src/composables/api/getApi';
import { getCurrentInstance, onMounted, ref } from 'vue';

const {proxy} = getCurrentInstance()
const serverURL = proxy.$serverURL
const allNotes = ref([])
getMethod(serverURL, 'notes/all', allNotes)

</script>

<style>

</style>
