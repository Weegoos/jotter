<template>
  <div>
    <DocumentTable
      :notes="Object(pinnedNote)"
      :title="String('Закрепленные заметки')"
      :columns="columns"
      @delete="deleteNote"
      @pin="pinNote"
      @update="updateNote"
      @row-click="viewDetailedInfoAboutNote"
    />

    <DocumentTable
      :notes="Object(rows)"
      :title="String('Заметки')"
      :columns="columns"
      @delete="deleteNote"
      @pin="pinNote"
      @update="updateNote"
      @row-click="viewDetailedInfoAboutNote"
    />

    <DetailedInformationAboutNoteVue
      :isOpenDetailedInformation="isOpenDetailedInformation"
      @closeDetailedInformationSection="closeDetailedInformationSection"
      :detailedInformation="detailedInformation"
    />
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/api-method/get";
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import DetailedInformationAboutNoteVue from "../../components/organisims/DetailedInformationAboutNote.vue";
import { useDateFormat } from "src/composables/javascript-function/formatDate";
import { deleteMethod } from "src/composables/api-method/delete";
import { putMethod } from "src/composables/api-method/put";
import DocumentTable from "src/components/molecules/DocumentTable.vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const webSocketURL = proxy.$webSocketURL;
const socket = new WebSocket(webSocketURL);
const router = useRouter();

socket.onopen = () => {
  console.log("✅ WebSocket подключен");
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.event === "create_note") {
    getNotesById();
  }
  if (data.event === "notes_list") {
    getNotesById();
  }
  if (data.event === "delete_note") {
    getNotesById();
  }
};

const route = useRoute();
const id = route.params.id;

const columns = computed(() => [
  {
    name: "title",
    label: "Name",
    align: "left",
    field: (row) => row.title,
    sortable: true,
  },
  {
    name: "type",
    label: "Type",
    align: "left",
    field: (row) => row.type,
    sortable: true,
  },
  {
    name: "created_at",
    label: "Created At",
    align: "left",
    field: (row) => useDateFormat(row.createdAt),
    sortable: true,
  },
  {
    name: "updated_at",
    label: "Updated At",
    align: "left",
    field: (row) => useDateFormat(row.updatedAt),
    sortable: true,
  },
  {
    name: "actions",
    label: "Actions",
    align: "center",
    field: "id",
  },
]);

const rows = ref([]);

const pinnedNote = ref([]);
const getNotesByPinned = async (id, pinnedValue) => {
  try {
    const response = await getMethod(
      serverURL,
      `notes/${id}/${pinnedValue}`,
      $q,
      "Заметки получены!"
    );
    return response;
  } catch (error) {
    console.error("Ошибка при получении заметок:", error);
    return [];
  }
};

const getNotesById = async () => {
  try {
    rows.value = await getNotesByPinned(id, false);
    pinnedNote.value = await getNotesByPinned(id, true);
  } catch (error) {
    console.error(error);
  }
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

const deleteNote = async (row) => {
  try {
    await deleteMethod(serverURL, "notes", row.id);
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
