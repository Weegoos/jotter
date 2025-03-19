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
    />
  </div>
  <div v-else data-testid="noData">
    <p>No data</p>
  </div>
  </div>
</template>

<script setup>
import { getMethod } from 'src/composables/api/getApi';
import { getCurrentInstance, onMounted, ref } from 'vue';

// global variables
const {proxy} = getCurrentInstance()
const serverURL = proxy.$serverURL

const columns = [
  {
    name: "id",
    label: "ID",
    align: "left",
    field: `id`,
    sortable: true,
  },
  {
    name: "name",
    label: "Name",
    align: "left",
    field: `name`,
    sortable: true,
  },
  {
    name: "createdAt",
    label: "Created At",
    align: "left",
    field: `createdAt`,
    sortable: true,
  },
  {
    name: "updatedAt",
    label: "Updated At",
    align: "left",
    field: `updatedAt`,
    sortable: true,
  },
];

const rows = ref([])

const allFilesRelatedToThisUser = async () => {
  await getMethod(serverURL, 'file/allFiles', rows, null)
}

onMounted(() => {
  allFilesRelatedToThisUser()
})

const viewAllNotes = (evt, row, index) => {
  console.log(row.id);

}
</script>

<style>

</style>
