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
        <q-btn flat color="red" icon="delete" @click="deleteNote(notes.id)" />
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
import { deleteMethod } from "src/composables/api/delete";

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
    console.log("📩 WebSocket Message:", message);
    if (message.event === "notes_list") {
      console.log("📜 Обновляем список заметок:", message.notes);
      allNotesByFileId.value = [...message.notes].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt) // Сортировка по дате обновления (новые сверху)
      );

      console.log(
        "🔍 allNotesByFileId после обновления:",
        allNotesByFileId.value
      );
    }

    if (message.event === "create_note") {
      console.log("🔄 Обновление списка заметок по WebSocket...");
      getAllNotesByFileId();
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

const deleteNote = (noteId) => {
  deleteMethod(serverURL, "notes", noteId);
};
</script>

<style></style>
