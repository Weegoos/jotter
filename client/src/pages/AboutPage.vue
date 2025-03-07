<template>
  <div class=q-pa-md>
    <q-input v-model="text" type="text" label="Message" />
    <q-btn color="green-4" no-caps label="Send" @click="sendMessage" />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const text = ref('')
const sendMessage = async () => {
  try {
    const response = await axios.post('http://localhost:3000/sendMessage', {
      message: text.value
    })
    console.log(response.data);


  } catch (error) {
    console.error('Error sending message:', error);
  }
}
</script>

<style>

</style>
