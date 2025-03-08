<template>
  <div class="q-pa-md">
    <q-input v-model="user.name" type="text" label="Name" />
    <q-input v-model="user.surname" type="text" label="Surname" />
    <q-btn color="green-4" no-caps label="Send" @click="sendMessage" />
    <p>{{ finalText }}</p>
  </div>
</template>

<script setup>
import axios from "axios";
import { getCurrentInstance, ref } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;

const user = ref({
  name: "",
  surname: "",
});
const finalText = ref("");

const sendMessage = async () => {
  try {
    const response = await axios.post(`${serverURL}sendMessage`, user.value);
    console.log(response.data);
    // finalText.value = response.data.message
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
</script>

<style></style>
