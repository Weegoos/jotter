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
    <EditNote
      :isOpenEditPage="isOpenEditPage"
      :noteIdentification="noteIdentification"
      @closeEditPage="closeEditPage"
    />
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

let ws = null;
const allNotesByFileId = ref([]);
onMounted(() => {
  getAllNotesByFileId(); // Загружаем заметки при загрузке страницы

  // 🔌 Подключаем WebSocket
  ws = new WebSocket("ws://localhost:3000"); // ⚠ Укажи свой WebSocket URL

  ws.onopen = () => {
    console.log("🔌 WebSocket подключен");
  };

  ws.onmessage = (event) => {
  const message = JSON.parse(event.data);

  if (message.event === "notes_list" && message.fileId === Number(id)) {
    console.log("📜 WebSocket прислал новые заметки:", message.notes);
    allNotesByFileId.value = message.notes;
  }

  // 📌 Если пришло обновление заметки — перезагружаем список
  if (message.event === "update_note") {
    console.log("🔄 Обновление списка заметок по WebSocket...");
    getAllNotesByFileId(); // Загружаем обновлённые заметки
  }
};

  ws.onclose = () => {
    console.log("❌ WebSocket отключен");
  };
});

const id = getIdFromUrl();
const getAllNotesByFileId = async () => {
  getMethod(
    serverURL,
    `notes/${id}`,
    allNotesByFileId,
    "Заметки успешно получены!"
  );
};

const isOpenEditPage = ref(false);
const noteIdentification = ref(0);
const openEditPage = async (noteID) => {
  isOpenEditPage.value = true;
  noteIdentification.value = Number(noteID);
};

const closeEditPage = () => {
  isOpenEditPage.value = false;
};
</script>

<style></style>
