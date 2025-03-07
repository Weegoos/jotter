<template>
<div class="q-pa-md">
  <q-input v-model="content" autogrow type="text" label="Напиши заметку..." />
  <q-btn color="green-4"  label="Send" @click="sendNote" />
</div>
</template>

<script setup>
import axios from 'axios';
import { getCurrentInstance, ref } from 'vue';

const {proxy} = getCurrentInstance()
const serverURL = proxy.$serverURL
console.log(serverURL);

const content = ref('')

const sendNote = async () => {
  try {
    const response = await axios.post(`${serverURL}notes/create`, {content: content.value})
    console.log(response.data);

  } catch (error) {
    console.error(error);

  }
}
</script>

<style>

</style>
