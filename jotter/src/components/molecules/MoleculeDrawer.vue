<template>
  <div class="lg:hidden w-screen">
    <q-drawer v-model="drawer" :width="200" :breakpoint="500" overlay bordered>
      <q-list bordered>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="bluetooth" />
          </q-item-section>
          <q-item-section>Icon as avatar</q-item-section>
        </q-item>
      </q-list></q-drawer
    >
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  drawer: {
    type: Boolean,
  },
});
const drawer = ref(props.drawer);
const miniState = ref(true);

watch(
  () => props.drawer,
  (newValue) => {
    drawer.value = newValue;
  }
);
</script>

<style></style>
