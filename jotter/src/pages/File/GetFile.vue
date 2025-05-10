<template>
  <div>
    <q-table
      class="m-[8px]"
      bordered
      title="Files"
      :rows="rows"
      :columns="columns"
      row-key="name"
      hide-bottom
    >
     <template v-slot:body-cell-description="props">
  <q-td :props="props">
    <div
      v-html="props.row.description"
      style="white-space: normal; word-wrap: break-word; max-width: 150px;"
    ></div>
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
]);

const getFiles = async () => {
  try {
    const response = await getMethod(
      serverURL,
      "file/allFiles",
      $q,
      "Files fetched successfully"
    );
    console.log(response);
    rows.value = response;
  } catch (error) {
    console.error("Error fetching files:", error);
  }
};

onMounted(() => {
  getFiles();
});
</script>

<style></style>
