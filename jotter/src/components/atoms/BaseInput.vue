<template>
  <q-input
    :model-value="modelValue"
    @update:model-value="val => emit('update:modelValue', val)"
    outlined
    :placeholder="placeholder"
  />
</template>

<script setup>
const { modelValue, placeholder } = defineProps(['modelValue', 'placeholder'])
const emit = defineEmits(['update:modelValue'])
</script>
