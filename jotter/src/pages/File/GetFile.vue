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
      <template v-slot:body-cell-accept="props">
              <q-td align="center">
                <q-btn
                  class="bg-blue-500 hover:bg-blue-600 text-white
"
                  icon="mdi-pencil"
                  size="sm"
                  @click="editFile(props.row)"
                />
              </q-td>
            </template>
            <template v-slot:body-cell-reject="props">
              <q-td align="center">
                <q-btn
                  class="bg-rose-500 hover:bg-rose-600 text-white
"
                  icon="mdi-delete"
                  size="sm"
                  @click="changeFileStatus(props.row)"
                />
              </q-td>
            </template>
    </q-table>
    <DetailedInformationAboutFile :informationAboutFile="Object(informationAboutFile)"/>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import DetailedInformationAboutFile from "src/components/organisims/DetailedInformationAboutFile.vue";
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
  {
    name: "accept",
    label: 'Edit',
    align: "center",
    field: "id",
  },
  {
    name: "reject",
    label: "Move to Trash",
    align: "center",
    field: "id",
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


const informationAboutFile = ref([])
const viewDetailedInformation = (info, row) => {
  informationAboutFile.value = row
};

onMounted(() => {
  getFiles();
});
</script>
