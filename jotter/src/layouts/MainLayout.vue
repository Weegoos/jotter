<template>
  <div>
    <q-layout view="hHr LpR lFf" container class="w-screen h-screen">
      <BaseHeader v-if="!authPage" @toggleDrawer="toggleDrawer" />
      <BaseDrawer :drawer="drawer" />
      <q-page-container>
        <q-page>
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import BaseDrawer from "../components/molecules/MoleculeDrawer.vue";
import BaseHeader from "../containers/HeaderContainer.vue";
import { useRoute } from "vue-router";

const drawer = ref(null);
const toggleDrawer = (newDrawerState) => {
  console.log(newDrawerState);
  drawer.value = newDrawerState;
};

const route = useRoute();
const authPage = computed(() => {
  return route.path === "/login" || route.path === "/register";
});
</script>

<style></style>
