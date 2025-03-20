<template>
  <div class="q-pa-md">
    <div class="q-pa-md" data-testid="rowsID" v-if="rows && rows.length">
      <q-table
        data-testid="userTable"
        flat
        bordered
        :rows="rows"
        :columns="columns"
        row-key="id"
        @row-click="viewAllNotes"
        hide-bottom
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              size="sm"
              color="primary"
              icon="edit"
              @click.stop="editRow(props.row)"
            >
              <q-tooltip>Редактировать</q-tooltip>
            </q-btn>

            <q-btn
              size="sm"
              color="negative"
              icon="delete"
              class="q-ml-sm"
              @click.stop="deleteRow(props.row.id)"
            >
              <q-tooltip>Удалить</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <div v-else data-testid="noData">
      <p>No data</p>
    </div>
  </div>
</template>

<script setup>
import { deleteMethod } from "src/composables/api/delete";
import { getMethod } from "src/composables/api/getApi";
import { getCurrentInstance, onMounted, ref } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const clientURL = proxy.$clientURL;

const columns = [
  { name: "id", label: "ID", align: "left", field: "id", sortable: true },
  { name: "name", label: "Name", align: "left", field: "name", sortable: true },
  { name: "createdAt", label: "Created At", align: "left", field: "createdAt", sortable: true },
  { name: "updatedAt", label: "Updated At", align: "left", field: "updatedAt", sortable: true },
  { name: "actions", label: "Действия", align: "center", field: "actions" } // ✅ Добавил колонку
];

const rows = ref([]);

const allFilesRelatedToThisUser = async () => {
  await getMethod(serverURL, "file/allFiles", rows, null);
};

onMounted(() => {
  allFilesRelatedToThisUser();
});

const viewAllNotes = (evt, row, index) => {
  window.location.href = `${clientURL}viewNotes/${row.id}`;
};

const deleteRow = async (id) => {
  await deleteMethod(serverURL, 'file/deleteFile', id)
};
</script>

<style></style>
