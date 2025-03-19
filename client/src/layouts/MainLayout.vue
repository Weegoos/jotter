<template>
  <div>
    <q-layout view="lHr Lpr lFr" container style="height: 100vh">
      <q-header reveal elevated>
        <q-toolbar class="bg-black text-white row" v-if="!isAuthPage">
          <q-btn flat round dense icon="menu" @click="drawer = !drawer" />
          <h5 class="q-ml-md">Jotter</h5>
          <div class="col-10 flex justify-center">
            <section class="row no-wrap">
              <q-btn
                v-for="(btn, index) in headerButtons"
                :key="index"
                flat
                no-caps
                :label="btn.name"
                class="q-mx-xs"
                @click="$router.push(btn.path)"
              />
            </section>
          </div>
        </q-toolbar>
      </q-header>
      <q-drawer
        v-if="!isAuthPage"
        v-model="drawer"
        show-if-above
        :width="250"
        :breakpoint="400"
      >
        <q-scroll-area
          style="
            height: calc(100% - 150px);
            margin-top: 150px;
            border-right: 1px solid #ddd;
          "
          class="bg-black text-white"
        >
          <q-list bordered>
            <q-item
              clickable
              v-ripple
              v-for="(buttons, id) in navigationButtons"
              :key="id"
              @click="navigateToThePage(buttons.path)"
            >
              <q-item-section avatar>
                <q-icon  :name="buttons.icon" />
              </q-item-section>
              <q-item-section>{{ buttons.name }}</q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img
          class="absolute-top"
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent" align="center">
            <div>
              <q-avatar size="56px" class="q-mb-sm">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </div>
            <div class="text-weight-bold">Razvan Stoenescu</div>
            <div>@rstoenescu</div>
          </div>
        </q-img>
      </q-drawer>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// global variables
const drawer = ref(true);
const route = useRoute();
const router = useRouter()

const isAuthPage = computed(() => {
  return route.path === "/login";
});

const createPage = computed(() => {
  return (
    route.path === "/createFile" ||
    route.path === "/login" ||
    route.path === "/createNote" ||
    route.path === "/registration"
  );
});

const headerButtons = ref([
  { name: "Домой", path: "/" },
  { name: "Создать файл", path: "/createFile" },
  { name: "Создать заметку", path: "/createNote" },
  { name: "Настройки", path: "/settings" },
]);

const navigationButtons = ref([
  {
    name: "Файлы",
    path: "files",
    icon: "note",
  },
]);

const navigateToThePage =  (route) => {
  router.push(route)
}
</script>

<style></style>
