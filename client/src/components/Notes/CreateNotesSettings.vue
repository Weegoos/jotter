<template>
  <div>
    <q-list bordered>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-toggle
            v-model="fullWidth"
            checked-icon="check"
            color="green"
            label="Full width"
            unchecked-icon="clear"
            @update:model-value="emit('fullWidth', fullWidth)"
          />
          <q-toggle
            v-model="smallText"
            checked-icon="check"
            color="green"
            label="Small Text"
            unchecked-icon="clear"
            @update:model-value="emit('smallText', smallText)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { ref } from "vue";

const fullWidth = ref(false);
const smallText = ref(false);
const emit = defineEmits(["fullWidth", "smallText"]);
</script>

<style></style>
