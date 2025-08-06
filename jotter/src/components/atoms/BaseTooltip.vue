<template>
  <q-tooltip anchor="bottom middle" self="top middle">
  {{ props.label }}
</q-tooltip>
</template>

<script setup>
const props = defineProps({
  label: [String, Number]
})
</script>

<style>

</style>
