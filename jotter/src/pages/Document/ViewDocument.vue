<template>
  <section>
    <div class="grid lg:grid-cols-2 text-font">
      <q-scroll-area style="width: 100%; height: 100vh">
        <div class="flex-1">
          <p class="logo-font text-h4 text-bold p-[20px] text-black">
            <q-icon name="mdi-pin" /> Pinned Notes
          </p>
          <q-list
            bordered
            v-for="(note, index) in pinnedNote.filter((note) => note.type !== 'saved')"
            :key="index"
          >
            <q-item
              clickable
              v-ripple
              @click="showNoteContent(note)"
              :class="note.id == noteId ? 'bg-grey-4' : ''"
            >
              <q-item-section>
                <section class="grid grid-cols-2">
                  <div>
                    <p class="text-h6">{{ note.title }}</p>
                  </div>
                  <div align="right">
                    <q-btn
                      flat
                      icon="mdi-dots-horizontal"
                      @click="
                        (e) => {
                          e.stopPropagation();
                        }
                      "
                    >
                      <q-menu anchor="bottom right" self="top right">
                        <q-item clickable @click="pinNote(note)">
                          <q-item-section avatar>
                            <q-icon color="orange" name="mdi-pin" />
                          </q-item-section>
                          <q-item-section>Unpin</q-item-section>
                        </q-item>
                        <q-item clickable @click="deleteNote(note)">
                          <q-item-section avatar>
                            <q-icon color="red" name="mdi-delete" />
                          </q-item-section>
                          <q-item-section>Move to the trash</q-item-section>
                        </q-item>
                      </q-menu>
                    </q-btn>
                  </div>
                </section>
                <div class="py-[10px] q-gutter-sm">
                  <q-btn color="primary" class="rounded-full" no-caps :label="note.type" />

                  <q-btn
                    v-for="(hashtag, index) in note.hashtags"
                    :key="index"
                    color="secondary"
                    class="rounded-full"
                    no-caps
                    :label="hashtag"
                  />
                </div>
              </q-item-section>
            </q-item>
            <q-separator dark />
          </q-list>

          <p class="logo-font text-h4 text-bold p-[20px] text-black">
            <q-icon name="mdi-note" /> Notes
          </p>
          <q-list
            bordered
            v-for="(note, index) in rows.filter((note) => note.type !== 'saved')"
            :key="index"
          >
            <q-item
              clickable
              v-ripple
              @click="showNoteContent(note)"
              :class="note.id == noteId ? 'bg-grey-4' : ''"
            >
              <q-item-section>
                <section class="grid grid-cols-3">
                  <div class="col-span-2">
                    <p class="text-h6">{{ note.title }}</p>
                  </div>
                  <div align="right">
                    <q-btn
                      flat
                      icon="mdi-dots-horizontal"
                      @click="
                        (e) => {
                          e.stopPropagation();
                        }
                      "
                    >
                      <q-menu anchor="bottom right" self="top right">
                        <q-item clickable @click="pinNote(note)">
                          <q-item-section avatar>
                            <q-icon color="orange" name="mdi-pin" />
                          </q-item-section>
                          <q-item-section>Pin</q-item-section>
                        </q-item>
                        <q-item clickable @click="updateNote(note)">
                          <q-item-section avatar>
                            <q-icon color="amber-5" name="mdi-pencil" />
                          </q-item-section>
                          <q-item-section>Edit</q-item-section>
                        </q-item>
                        <q-item clickable @click="deleteNote(note)">
                          <q-item-section avatar>
                            <q-icon color="red" name="mdi-delete" />
                          </q-item-section>
                          <q-item-section>Move to the trash</q-item-section>
                        </q-item>
                      </q-menu>
                    </q-btn>
                  </div>
                </section>

                <div class="mt-[10px] q-gutter-sm">
                  <q-btn color="primary" class="rounded-full" no-caps :label="note.type" />

                  <q-btn
                    v-for="(hashtag, index) in note.hashtags"
                    :key="index"
                    color="secondary"
                    class="rounded-full"
                    no-caps
                    :label="hashtag"
                  />
                </div>
              </q-item-section>
            </q-item>
            <q-separator dark />
          </q-list>
        </div>
      </q-scroll-area>
      <div class="p-[15px] flex-2">
        <p v-html="noteContent || 'Здесь будет отображаться текст'"></p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { getMethod } from 'src/composables/api-method/get';
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDateFormat } from 'src/composables/javascript-function/formatDate';
import { deleteMethod } from 'src/composables/api-method/delete';
import { putMethod } from 'src/composables/api-method/put';
import { useWebSocket } from 'src/composables/javascript-function/websocket';
import { Form, Table } from 'src/components/molecules';
import { Input } from 'src/components/atoms';
import { NoteInformation } from 'src/components/organism ';

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
const viewDetailedInfoAboutNote = (evt, row, index) => {
  detailedInformation.value = row;
  isOpenDetailedInformation.value = true;
};

const closeDetailedInformationSection = () => {
  isOpenDetailedInformation.value = false;
};

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
