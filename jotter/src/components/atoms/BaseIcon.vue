<template>
  <div class="row">
    <img
      v-bind="$attrs"
      @click="toggleDrawer"
      class="h-8 w-auto"
      src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
      alt="icon"
    />
    <BadgeVersion />
  </div>
</template>

<script setup>
import { BadgeVersion } from ".";

BadgeVersion
</script>

<style></style>
