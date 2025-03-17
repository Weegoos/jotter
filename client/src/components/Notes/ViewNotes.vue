<template>
  <div class="q-pa-md">
    <q-card class="my-card" v-for="(notes, id) in allNotesByFileId" :key="id">
      <q-card-section>
        <div class="text-h6">{{ notes.title }}</div>
      </q-card-section>
      <q-card-section>
        {{ notes.content }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { getMethod } from "src/composables/api/getApi";
import { getCurrentInstance, onMounted, ref } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;

const getIdFromUrl = () => {
  const url = window.location.href;
  const parts = url.split("/");
  return parts[parts.length - 1];
};

const id = getIdFromUrl();
const allNotesByFileId = ref([]);
const getAllNotesByFileId = async () => {
  getMethod(
    serverURL,
    `notes/${id}`,
    allNotesByFileId,
    "Заметки успешно получены!"
  );
};

onMounted(() => {
  getAllNotesByFileId();
});
</script>

<style></style>
