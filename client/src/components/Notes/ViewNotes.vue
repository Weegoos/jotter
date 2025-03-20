<template>
  <div class="q-pa-md">
    <q-scroll-area style="height: 70px" v-if="allTypes">
      <div class="row no-wrap">
        <div
          align="center"
          v-for="(types, index) in allTypes"
          :key="index"
          class="q-pa-sm"
        >
          <q-btn
            no-caps
            flat
            dense
            :class="
              currentType == types
                ? 'active-scroll-button'
                : 'scroll-button'
            "
            color="primary"
            :label="types"
            @click="getCurrentTypeNotes(types)"
          />
        </div>
      </div>
    </q-scroll-area>
    <q-card-section v-if="allNotesByFileId.length == 0">
      <p class="text-body1" align="center">
        Create notes and your notes will be displayed here.
      </p>
    </q-card-section>
    <q-card-section v-else-if="!currentType && allNotesByFileId.length != 0">
      <p class="text-body1" align="center">
        Click on one of the buttons to view the notes
      </p>
    </q-card-section>
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
      <div v-if="!allNotesByFileId.length && currentType">
        <p class="text-body1" align="center">Notes are missing</p>
      </div>
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
import { useMeta } from "quasar";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const getIdFromUrl = () => {
  const url = window.location.href;
  const parts = url.split("/");
  return parts[parts.length - 1];
};

const allTypes = ref([]);
const getAllTypes = async () => {
  await getMethod(serverURL, "types/usedByUser", allTypes, null);
  console.log(allTypes.value);
};

let ws = null;
const allNotesByFileId = ref([]);
const currentType = ref("");
onMounted(() => {
  if (currentType.value) {
    getCurrentTypeNotes();
  }
  getAllTypes();

  // 🔌 Подключаем WebSocket
  ws = new WebSocket("ws://localhost:3000"); // ⚠ Укажи свой WebSocket URL

  ws.onopen = () => {
    console.log("🔌 WebSocket подключен");
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log("📩 WebSocket Message:", message);
    if (message.event === "private_list") {
      console.log("📜 Обновляем список заметок:", message.notes);
      allNotesByFileId.value = [...message.notes].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt) // Сортировка по дате обновления (новые сверху)
      );

      console.log(
        "🔍 allNotesByFileId после обновления:",
        allNotesByFileId.value
      );
    }

    if (message.event === "types_userUsed") {
      // getAllTypes()
      console.log("📜 Обновляем список заметок:", message.types);
      allTypes.value = message.types

      console.log(
        "🔍 allTypes после обновления:",
        allTypes.value
      );
    }

    if (message.event === "create_note") {
      console.log("🔄 Обновление списка заметок по WebSocket...");
      if (currentType.value) {
        getCurrentTypeNotes();
      }
    }
  };

  ws.onclose = () => {
    console.log("❌ WebSocket отключен");
  };
});

const id = getIdFromUrl();
const getCurrentTypeNotes = async (name) => {
  const setCurrentTypeValue = name || 'private'
  localStorage.setItem('currentType', setCurrentTypeValue)
  currentType.value = localStorage.getItem('currentType');
  console.log(name);
  await getMethod(
    serverURL,
    `notes/${localStorage.getItem('currentType')}/${id}`,
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
  border: solid 1px #6495ed;
  border-radius: 20px;
  width: 120px;
}

.active-scroll-button {
  border: solid 1px #9fe2bf;
  border-radius: 20px;
  width: 120px;
  text-decoration: underline;
}
</style>
