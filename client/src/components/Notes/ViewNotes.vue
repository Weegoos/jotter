<template>
  <div class="q-pa-md">
    <q-scroll-area style="height: 70px">
      <div class="row no-wrap">
        <div v-for="(types, index) in allTypes" :key="index" class="q-pa-sm">
          <q-btn
            no-caps
            flat
            dense
            class="scroll-button"
            color="primary"
            :label="types.name"
            @click="getCurrentTypeNotes"
          />
        </div>
      </div>
    </q-scroll-area>

    <q-scroll-area style="height: 100vh">
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
    </q-scroll-area>
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

const panel = ref("mails");

const getIdFromUrl = () => {
  const url = window.location.href;
  const parts = url.split("/");
  return parts[parts.length - 1];
};

const allTypes = ref([]);
const getAllTypes = async () => {
  await getMethod(serverURL, "types", allTypes, null);
  console.log(allTypes.value);
};

let ws = null;
const allNotesByFileId = ref([]);
onMounted(() => {
  getAllNotesByFileId();
  getAllTypes();

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

const getCurrentTypeNotes = () => {};

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

<style scoped>
.scroll-button {
  border: solid 1px green;
  border-radius: 15px;
  width: 70px;
}
</style>
