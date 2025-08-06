<template>
  <div class="w-screen">
    <q-drawer class="drawer" v-model="drawer" :width="250" :breakpoint="500" persistent>
      <q-toolbar class="h-[100px] q-my-xl text-white">
        <q-item clickable v-ripple>
          <q-toolbar-title class="logo-font text-white text-h2">
            <h1 class="text-4xl font-bold">
              <span
                class="bg-gradient-to-r from-white via-green-300 to-black logo-font text-h3 bg-clip-text text-transparent"
                >Jotter</span
              >
            </h1>
          </q-toolbar-title>
        </q-item>
      </q-toolbar>
      <q-list bordered>
        <q-item
          clickable
          v-ripple
          v-for="(option, index) in drawerOptions"
          :key="index"
          @click="$router.push(option.url)"
        >
          <q-item-section avatar>
            <q-icon color="white" :name="option.icon" />
          </q-item-section>
          <q-item-section>{{ option.name }}</q-item-section>
        </q-item>
      </q-list>
      <q-card class="absolute inset-x-0 bottom-0 h-16 text-black">
        <q-card-section class="flex">
          <q-avatar class="flex-1">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <div class="flex-2">
            <p>Batyr Ashim</p>
            <p>batyr.ashim@mail.ru</p>
          </div>
        </q-card-section>
      </q-card>
    </q-drawer>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Icon } from '../atoms';

// const props = defineProps({
//   drawer: {
//     type: Boolean,
//   },
// });
const drawer = ref(true);

// watch(
//   () => props.drawer,
//   (newValue) => {
//     drawer.value = newValue;
//   }
// );

const drawerOptions = [
  {
    name: 'Home',
    icon: 'mdi-home',
    url: '/',
  },
  {
    name: 'File',
    icon: 'mdi-file',
    url: '/get-file',
  },
  {
    name: 'Trash',
    icon: 'mdi-delete-empty',
    url: '/trash',
  },
];
</script>

<style></style>
