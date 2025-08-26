<template>
  <section>
    <q-dialog v-model="isOpen" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">You are currently not connected to any network.</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="emit('closeManageCategory')" />
          <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isManageCategoryOpen: {
    type: Boolean,
    required: true,
  },
});

const isOpen = ref(props.isManageCategoryOpen);
watch(
  () => props.isManageCategoryOpen,
  (newVal) => {
    isOpen.value = newVal;
  }
);

const emit = defineEmits(['closeManageCategory']);
</script>

<style></style>
