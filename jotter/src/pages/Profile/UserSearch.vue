<template>
  <div class="q-ma-md">
      <section >
        <q-input  v-model="text" type="text" label="Label" />
      </section>
    <q-table
      class="q-mt-md"
      bordered
      title="Files"
      :rows="rows"
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
      <template v-slot:body-cell-accept="props">
        <q-td align="center">
          <q-btn
            class="bg-blue-500 hover:bg-blue-600 text-white"
            icon="mdi-pencil"
            size="sm"
            @click="editFile(props.row)"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-trash="props">
        <q-td align="center">
          <q-btn
            class="bg-rose-500 hover:bg-rose-600 text-white"
            icon="mdi-delete"
            size="sm"
            @click="changeFileStatus(props.row, $event)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

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
    name: "push",
    label: "Push",
    align: "center",
    field: "id",
  },
  {
    name: "accept",
    label: "Edit",
    align: "center",
    field: "id",
  },
  {
    name: "trash",
    label: "Move to Trash",
    align: "center",
    field: "id",
  },
]);
</script>

<style></style>
