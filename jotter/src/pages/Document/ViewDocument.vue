<template>
  <div>
    <DocumentTable
      :notes="Object(pinnedNote)"
      :title="String('Закрепленные заметки')"
      @deleteNote="deleteNote"
      @pinNote="pinNote"
      @updateNote="updateNote"
      @viewDetailedInfoAboutNote="viewDetailedInfoAboutNote"
       @row-click="viewDetailedInfoAboutNote"
    />

    <DocumentTable
      :notes="Object(rows)"
      :title="String('Заметки')"
      @deleteNote="deleteNote"
      @pinNote="pinNote"
      @updateNote="updateNote"
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

const rows = ref([]);

const pinnedNote = ref([]);
const getNotesById = async () => {
  try {
    const response = await getMethod(
      serverURL,
      `notes/${id}/false`,
      $q,
      "Заметки получены!"
    );
    rows.value = response;

    const pinned = await getMethod(
      serverURL,
      `notes/${id}/true`,
      $q,
      "Заметки получены!"
    );
    pinnedNote.value = pinned;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getNotesById();
});

console.log(typeof pinnedNote.value);

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
