<template>
  <div v-if="Object.keys(rows).length > 0 || Object.keys(pinnedNote).length > 0">
    <Form @submit="submitDocument" class="q-pa-sm">
      <Input v-model="searchDocument" placeholder="Поиск по заметка..." />
    </Form>
    <Table
      :notes="pinnedNote.filter((note) => note.type !== 'saved')"
      :title="'Закрепленные заметки'"
      :columns="columns"
      @delete="deleteNote"
      @pin="pinNote"
      @update="updateNote"
      @row-click="viewDetailedInfoAboutNote"
    />

    <Table
      :notes="rows.filter((note) => note.type !== 'saved')"
      :title="String('Заметки')"
      :columns="columns"
      @delete="deleteNote"
      @pin="pinNote"
      @update="updateNote"
      @row-click="viewDetailedInfoAboutNote"
    />

    <Table
      :notes="savedNote"
      :title="'Черновики'"
      :columns="columns"
      @delete="deleteNote"
      @update="updateNote"
      @row-click="viewDetailedInfoAboutNote"
    />

    <NoteInformation
      :isOpenDetailedInformation="isOpenDetailedInformation"
      @closeDetailedInformationSection="closeDetailedInformationSection"
      :detailedInformation="detailedInformation"
      @openDecryptedNote="onDecryptedNoteOpen"
    />
  </div>
  <div v-else>
    <p class="text-center text-h6">Файл пуст</p>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { getMethod } from 'src/composables/api-method/get';
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDateFormat } from 'src/composables/javascript-function/formatDate';
import { deleteMethod } from 'src/composables/api-method/delete';
import { putMethod } from 'src/composables/api-method/put';
import { useWebSocket } from 'src/composables/javascript-function/weboscket';
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
const id = route.params.id;

const columns = computed(() => [
  {
    name: 'title',
    label: 'Name',
    align: 'left',
    field: (row) => (row.type !== 'private' ? row.title : 'Введите пароль'),
    sortable: true,
    style: 'width: 20%',
  },
  {
    name: 'type',
    label: 'Type',
    align: 'left',
    field: (row) => row.type,
    sortable: true,
    style: 'width: 20%',
  },
  {
    name: 'created_at',
    label: 'Created At',
    align: 'left',
    field: (row) => useDateFormat(row.createdAt),
    sortable: true,
    style: 'width: 20%',
  },
  {
    name: 'updated_at',
    label: 'Updated At',
    align: 'left',
    field: (row) => useDateFormat(row.updatedAt),
    sortable: true,
    style: 'width: 20%',
  },
  {
    name: 'actions',
    label: 'Actions',
    align: 'center',
    field: 'id',
    style: 'width: 20%',
  },
]);

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
