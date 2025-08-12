<template>
  <q-tabs
    :model-value="modelValue"
    inline-label
    :class="tabClass"
    :dense="dense"
    :shrink="shrink"
    :active-color="activeColor"
    :indicator-color="indicatorColor"
  >
    <q-tab
      v-for="tab in tabs"
      :key="tab.name"
      :name="tab.name"
      :icon="tab.icon"
      :label="tab.label"
      :disable="tab.disable || false"
      :no-caps="tab.noCaps ?? true"
      :class="tab.class || ''"
    />
  </q-tabs>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  tabs: {
    type: Array,
    required: true,
    default: () => [], // [{ name, icon, label, disable, noCaps, class }]
  },
  tabClass: {
    type: String,
    default: 'text-green-8 text-font',
  },
  dense: {
    type: Boolean,
    default: false,
  },
  shrink: {
    type: Boolean,
    default: false,
  },
  activeColor: {
    type: String,
    default: 'green',
  },
  indicatorColor: {
    type: String,
    default: 'green',
  },
});

const emit = defineEmits(['update:modelValue']);
</script>
