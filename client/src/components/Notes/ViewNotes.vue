<template>
  <div class="q-pa-md">
    <q-card
      class="my-card q-ma-sm"
      v-for="(notes, id) in allNotesByFileId"
      :key="id"
    >
      <q-card-section>
        <div class="text-h6">{{ notes.title }}</div>
      </q-card-section>
      <q-card-section>
        {{ notes.content }}
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat icon="edit" @click="openEditPage(notes.id)" />
        <q-btn flat color="red" icon="delete" />
      </q-card-actions>
    </q-card>
    <EditNote :isOpenEditPage="isOpenEditPage" @closeEditPage="closeEditPage"/>
  </div>
</template>

<script setup>
import { getMethod } from "src/composables/api/getApi";
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import EditNote from "./EditNote.vue";

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

const isOpenEditPage = ref(false);
const openEditPage = async (noteID) => {
  isOpenEditPage.value = true;
};

const closeEditPage = () => {
  isOpenEditPage.value = false
}

onMounted(() => {
  getAllNotesByFileId();
});
</script>

<style></style>
