<template>
  <div>{{ data }}</div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const data = ref(null)
const getMessage = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/message", {
      headers: {
        "Content-Type": "appliction/json",
              },
      withCredentials: true,
    });
    console.log(response.data);
    data.value = response.data.message
  } catch (error) {
    console.error(error);

  }
};

onMounted(() => {
  getMessage()
})
</script>

<style></style>
