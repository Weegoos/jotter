<template>
  <div>
    <q-table
      class="m-[8px]"
      bordered
      title="Files"
      :rows="rows"
      @row-click="viewDetailedInformation"
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
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/api-method/get";
import { computed, getCurrentInstance, onMounted, ref } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const maxNumberOfRequestPerPage = proxy.$maxNumberOfRequestPerPage;

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

const filesByStatus = ref([]);
const getTrashedFiles = async (page) => {
  try {
    const response = await getMethod(
      serverURL,
      `file/filesStatus?status=trashed&page=${page}&limit=${maxNumberOfRequestPerPage}`,
      $q,
      "Files fetched successfully"
    );
    rows.value = response.files;
    filesByStatus.value = response;
  } catch (error) {
    console.error("Error fetching files:", error);
  }
};

onMounted(() => {
  getTrashedFiles();
});
</script>

<style></style>
