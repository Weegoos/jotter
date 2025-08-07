<template>
  <section>
    <div class="grid lg:grid-cols-2 text-font">
      <q-scroll-area style="width: 100%; height: 100vh">
        <div class="flex flex-row gap-4">
          <div class="basis-3/4">
            <Form @submit="submitDocument">
              <Input v-model="searchDocument" placeholder="Поиск по заметкам..." />
            </Form>
          </div>
          <div class="flex-2">
            <q-btn icon="mdi-plus" @click="$router.push('/create-document')">
              <Tooltip label="Add a note" />
            </q-btn>
          </div>
        </div>
        <div class="flex-1">
          <p class="logo-font text-h4 text-bold p-[20px] text-black">
            <q-icon name="mdi-pin" /> Pinned Notes
          </p>
          <ListToViewDocument
            :document="pinnedNote.filter((note) => note.type !== 'saved')"
            :noteId="Number(noteId)"
            :pinButtonText="String('Unpin')"
            @showNoteContent="showNoteContent"
            @pin="pinNote"
            @delete="deleteNote"
            @edit="updateNote"
          />

          <p class="logo-font text-h4 text-bold p-[20px] text-black">
            <q-icon name="mdi-note" /> Notes
          </p>
          <ListToViewDocument
            :document="rows.filter((note) => note.type !== 'saved')"
            :noteId="Number(noteId)"
            :pinButtonText="String('Pin')"
            @showNoteContent="showNoteContent"
            @pin="pinNote"
            @delete="deleteNote"
            @edit="updateNote"
          />
        </div>
      </q-scroll-area>
      <div class="p-[15px] flex-2">
        <q-scroll-area style="width: 100%; height: 100vh">
          <div class="note-content" v-html="noteContent || 'Здесь будет отображаться текст'"></div>
        </q-scroll-area>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { getMethod } from 'src/composables/api-method/get';
import { getCurrentInstance, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { deleteMethod } from 'src/composables/api-method/delete';
import { putMethod } from 'src/composables/api-method/put';
import { useWebSocket } from 'src/composables/javascript-function/websocket';
import { Editor, Form, ListToViewDocument } from 'src/components/molecules';
import { Button, Input, Tooltip } from 'src/components/atoms';

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const webSocketURL = proxy.$webSocketURL;
const socket = new WebSocket(webSocketURL);
const router = useRouter();

useWebSocket(webSocketURL);

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.event === 'create_note') {
    getNotesById();
  }
  if (data.event === 'notes_list') {
    getNotesById();
  }
  if (data.event === 'delete_note') {
    getNotesById();
  }
};

const route = useRoute();
const id = route.params.fileId;
const noteId = ref(route.params.noteId);

watch(
  () => route.params.noteId,
  (newId) => {
    noteId.value = newId;
  }
);

const noteContent = ref('');
const showNoteContent = async (noteInfo) => {
  router.push(`/view-notes/${id}/${noteInfo.id}`);
  const response = await getMethod(serverURL, `notes/note/${noteInfo.id}`, $q, 'Заметки получены!');
  noteContent.value = response.content;
};

const rows = ref([]);
const pinnedNote = ref([]);
const savedNote = ref([]);
const getNotesByPinned = async (id, pinnedValue) => {
  try {
    const response = await getMethod(
      serverURL,
      `notes/${id}/${pinnedValue}`,
      $q,
      'Заметки получены!'
    );
    return response;
  } catch (error) {
    console.error('Ошибка при получении заметок:', error);
    return [];
  }
};

const getSavedNotes = async (type) => {
  try {
    const response = await getMethod(serverURL, `notes/${type}`, $q, 'Заметки получены');
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getNotesById = async () => {
  try {
    rows.value = await getNotesByPinned(id, false);
    pinnedNote.value = await getNotesByPinned(id, true);
    savedNote.value = await getSavedNotes('saved');
  } catch (error) {
    console.error(error);
  }
};

const searchDocument = ref('');
const submitDocument = () => {
  const searchQuery = searchDocument.value.trim();
  if (!searchQuery) {
    getNotesById();
    return;
  }
  getMethod(serverURL, `notes/${id}/search?search=${searchQuery}`, $q, 'Заметки найдены')
    .then((response) => {
      const notes = response.notes;
      pinnedNote.value = notes.filter((note) => note.pinned === true);
      rows.value = notes.filter((note) => !note.pinned);
    })
    .catch((error) => {
      console.error('Ошибка при поиске заметок:', error);
    });
};

onMounted(() => {
  getNotesById();
});

const isOpenDetailedInformation = ref(false);
const detailedInformation = ref([]);
const updateNote = (row) => {
  router.push(`/update-note/${row.id}`);
};

const onDecryptedNoteOpen = (noteData) => {
  detailedInformation.value = noteData;
  isOpenDetailedInformation.value = true;
};

const deleteNote = async (row) => {
  try {
    await deleteMethod(serverURL, 'notes', row.id);
  } catch (error) {
    console.error(error);
  }
};

const pinNote = async (row) => {
  try {
    const payload = {
      value: (row.pinned = !row.pinned),
    };

    await putMethod(serverURL, `notes/${row.id}/pin`, payload, $q, {});
  } catch (error) {
    console.error(error);
  }
};
</script>
