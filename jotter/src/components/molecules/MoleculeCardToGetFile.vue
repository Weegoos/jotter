<template>
  <q-card
    class="cursor-pointer"
    v-for="(document, index) in props.document"
    :key="index"
    @click="emit('pushToNote', document)"
  >
    <q-card-section>
      <div class="flex">
        <div class="flex-1">
          <h6>{{ useDateFormat(document.updatedAt) }}</h6>
        </div>
        <div class="flex-2">
          <q-btn
            flat
            icon="mdi-dots-horizontal"
            @click="
              (e) => {
                e.stopPropagation();
              }
            "
          >
            <q-menu anchor="bottom right" self="top right">
              <q-item clickable @click="emit('pin', document)">
                <q-item-section avatar>
                  <q-icon color="orange" name="mdi-pin" />
                </q-item-section>
                <q-item-section>{{ props.textForPinButton }}</q-item-section>
              </q-item>
              <q-item clickable @click="emit('changeStatus', document)">
                <q-item-section avatar>
                  <q-icon color="red" name="mdi-delete" />
                </q-item-section>
                <q-item-section>Move to the trash</q-item-section>
              </q-item>
            </q-menu>
          </q-btn>
        </div>
      </div>
      <div class="text-h6">{{ document.name }}</div>
      <p>{{ document.description || 'Description' }}</p>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useDateFormat } from 'src/composables/javascript-function/formatDate';

const props = defineProps({
  document: {
    type: [Object, Array],
    required: true,
  },
  textForPinButton: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['pin', 'changeStatus', 'pushToNote']);
</script>

<style></style>
