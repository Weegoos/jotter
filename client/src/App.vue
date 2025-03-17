<template>
  <MainLayout />
</template>

<script setup>
import { onMounted } from "vue";
import MainLayout from "./layouts/MainLayout.vue";
import { checkAccessToken } from "./composables/javascript-function/checkAccessToken";

defineOptions({
  name: "App",
});

onMounted(() => {
  checkAccessToken()
})
</script>
