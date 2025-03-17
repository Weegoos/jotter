<template>
  <div>{{ allNotesByFileId }}</div>
</template>

<script setup>
import { getMethod } from "src/composables/api/getApi";
import { getCurrentInstance, onMounted, ref } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL

const getIdFromUrl = () => {
  const url = window.location.href;
  const parts = url.split("/");
  return parts[parts.length - 1]; // Берем последний элемент (3)
};

const id = getIdFromUrl();
const allNotesByFileId = ref([])
const getAllNotesByFileId = async () => {
  getMethod(serverURL, `notes/${id}`, allNotesByFileId, "Заметки успешно получены!")
}

onMounted(() => {
  getAllNotesByFileId()
})
</script>

<style></style>
