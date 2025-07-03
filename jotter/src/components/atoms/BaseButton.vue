<template>
  <div>
    <q-btn
      :color="color"
      :icon="icon"
      :label="label"
      no-caps
      dense
      @click="emit('emitClick')"
    />
  </div>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: "primary",
  },
  label: {
    type: [String, Number],
    default: "Base Button",
  },
  icon: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["emitClick"]);
</script>
