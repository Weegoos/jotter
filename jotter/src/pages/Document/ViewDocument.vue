<template>
  <div>
    <q-table
      class="m-[8px]"
      bordered
      title="Files"
      :rows="rows"
      @row-click="viewDetailedInfoAboutNote"
      :columns="columns"
      row-key="name"
      hide-bottom
    >
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <div
            v-html="props.row.name"
            class="max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis"
          ></div>
        </q-td>
      </template>
      <template v-slot:body-cell-description="props">
        <q-td :props="props">
          <div
            v-html="props.row.description"
            class="max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis"
          ></div>
        </q-td>
      </template>
    </q-table>
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
import { useRoute } from "vue-router";
import DetailedInformationAboutNoteVue from "../../components/organisims/DetailedInformationAboutNote.vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const webSocketURL = proxy.$webSocketURL;
const socket = new WebSocket(webSocketURL);

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

const maxSize = 10;
const heavyList = ["Label"];

for (let i = 0; i < maxSize; i++) {
  heavyList.push({
    label: "Option " + (i + 1),
  });
}

const rows = ref([]);
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
    field: (row) => row.createdAt,
    sortable: true,
  },
  {
    name: "updated_at",
    label: "Updated At",
    align: "left",
    field: (row) => row.updatedAt,
    sortable: true,
  },
]);

const getNotesById = async () => {
  try {
    const response = await getMethod(
      serverURL,
      `notes/${id}`,
      $q,
      "Заметки получены!"
    );
    rows.value = response;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getNotesById();
});

const isOpenDetailedInformation = ref(false);
const detailedInformation = ref([]);
const viewDetailedInfoAboutNote = (info, row) => {
  detailedInformation.value = row;
  isOpenDetailedInformation.value = true;
};

const closeDetailedInformationSection = () => {
  isOpenDetailedInformation.value = false;
};
</script>
