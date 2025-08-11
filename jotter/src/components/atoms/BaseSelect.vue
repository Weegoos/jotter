<template>
  <q-select
    :model-value="modelValue"
    @update:model-value="(val) => emit('update:modelValue', val)"
    :options="options"
    :label="label"
    :type="type"
    :dense="dense"
    :outlined="outlined"
    :placeholder="placeholder"
  />
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number, Object],
  placeholder: String,
  type: {
    type: String,
    default: 'text',
  },
  label: String,
  dense: {
    type: Boolean,
    default: true,
  },
  outlined: {
    type: Boolean,
    default: true,
  },
  options: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);
</script>

<style></style>
