<template>
  <div>
    <q-layout view="hHr LpR lFf" container class="w-screen h-screen">
      <BaseHeader @toggleDrawer="toggleDrawer" />
      <BaseDrawer :drawer="drawer" />
      <q-page-container>
        <q-page padding>
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseDrawer from "../components/atoms/BaseDrawer.vue";
import BaseHeader from "../components/atoms/BaseHeader.vue";

const drawer = ref(null);
const toggleDrawer = (newDrawerState) => {
  console.log(newDrawerState);
  drawer.value = newDrawerState;
};
</script>

<style></style>
