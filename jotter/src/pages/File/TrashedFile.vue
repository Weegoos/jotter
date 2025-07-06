<template>
  <div v-if="rows?.length">
    <q-table
      class="m-[8px]"
      bordered
      title="Files"
      :rows="rows"
      :columns="columns"
      row-key="name"
      hide-bottom
      v-if="rows?.length"
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
      <template v-slot:body-cell-restore="props">
        <q-td align="center">
          <q-btn
            class="bg-green-500 hover:bg-green-600 text-white"
            icon="mdi-refresh"
            size="sm"
            @click="restoreFile(props.row)"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-delete="props">
        <q-td align="center">
          <q-btn
            class="bg-rose-500 hover:bg-rose-600 text-white"
            icon="mdi-delete"
            size="sm"
            @click="deleteFile(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <BasePagination
      :variableName="Object(filesByStatus)"
      @pagination="pagination"
    />
  </div>
  <div v-else>
    <p class="text-center text-h6">Корзина пуста...</p>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { deleteMethod } from "src/composables/api-method/delete";
import { getMethod } from "src/composables/api-method/get";
import { putMethod } from "src/composables/api-method/put";
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import BasePagination from "src/components/molecules/MoleculePagination.vue";
// global variables
const { proxy } = getCurrentInstance();
const $q = useQuasar();
const serverURL = proxy.$serverURL;
const contentForTrashedComponent = proxy.$contentForTrashedComponent;
const maxNumberOfRequestPerPage = proxy.$maxNumberOfRequestPerPage;
const contentForView = proxy.$contentForView;
const webSocketURL = proxy.$webSocketURL;

const socket = new WebSocket(webSocketURL);

socket.onopen = () => {
  console.log("✅ WebSocket подключен");
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.event === "change_status") {
    getTrashedFiles(1);
  }
  if (data.event === "deleteFileByID") {
    getTrashedFiles(1);
  }
};

socket.onclose = () => {
  console.log("❌ WebSocket отключен");
};

socket.onerror = (error) => {
  console.error("🔥 WebSocket ошибка:", error);
};

const rows = ref([]);
const columns = computed(() => [
  {
    name: "name",
    label: "Name",
    align: "left",
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: "description",
    label: "Description",
    align: "left",
    field: (row) => row.description,
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
  {
    name: "restore",
    label: "Restore",
    align: "center",
    field: "id",
  },
  {
    name: "delete",
    label: "Delete from Trash",
    align: "center",
    field: "id",
  },
]);

const current = ref(1);
const pagination = (page) => {
  current.value = page;
  getTrashedFiles(current.value);
};

const filesByStatus = ref([]);
const getTrashedFiles = async (page) => {
  try {
    const response = await getMethod(
      serverURL,
      `file/trashedFiles?&page=${page}&limit=${maxNumberOfRequestPerPage}`,
      $q,
      "Files fetched successfully"
    );
    rows.value = response.files;
    filesByStatus.value = response;

    console.log("rows:", filesByStatus.value);
  } catch (error) {
    console.error("Error fetching files:", error);
  }
};

const restoreFile = async (info) => {
  try {
    await putMethod(
      serverURL,
      `file/editStatus?fileId=${info.id}&status=${contentForView}`,
      undefined,
      $q,
      {}
    );
  } catch (error) {
    console.error("Error fetching files:", error);
  }
};

const deleteFile = async (info) => {
  "";
  try {
    await deleteMethod(serverURL, "file/deleteFile", `${info.id}`);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getTrashedFiles();
});
</script>

<style></style>
