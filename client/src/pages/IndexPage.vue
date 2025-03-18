<template>
  <div></div>
</template>

<script setup>
import { checkAccessToken } from "src/composables/javascript-function/checkAccessToken";
import { onMounted } from "vue";

onMounted(() => {
  checkAccessToken();
});
</script>

<style></style>
