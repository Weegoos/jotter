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
      @row-click="pushToTheFile"
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
      <template v-slot:body-cell-actions="props">
        <q-td align="center">
          <q-btn-dropdown @click.stop icon="mdi-vuejs" color="primary">
            <q-list style="min-width: 100px">
              <q-item clickable>
                <q-item-section>
                  <q-btn
                    class="bg-blue-500 hover:bg-blue-600 text-white"
                    icon="mdi-pencil"
                    size="sm"
                    @click="editFile(props.row)"
                  />
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-btn
                    class="bg-rose-500 hover:bg-rose-600 text-white"
                    icon="mdi-delete"
                    size="sm"
                    @click="changeFileStatus(props.row, $event)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-td>
      </template>
    </q-table>
    <BasePagination
      :variableName="Object(filesByStatus)"
      @pagination="pagination"
    />
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import BasePagination from "src/components/atoms/BasePagination.vue";
import { getMethod } from "src/composables/api-method/get";
import { putMethod } from "src/composables/api-method/put";
import { useDateFormat } from "src/composables/javascript-function/formatDate";
import { computed, getCurrentInstance, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const maxNumberOfRequestPerPage = proxy.$maxNumberOfRequestPerPage;
const contentForView = proxy.$contentForView;
const webSocketURL = proxy.$webSocketURL;
const contentForTrashedComponent = proxy.$contentForTrashedComponent;
const socket = new WebSocket(webSocketURL);
const router = useRouter();

socket.onopen = () => {
  console.log("✅ WebSocket подключен");
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.event === "create_file") {
    getFiles(1);
  }
  if (data.event === "change_status") {
    getFiles(1);
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

const filesByStatus = ref([]);
const getFiles = async (page) => {
  try {
    const response = await getMethod(
      serverURL,
      `file/filesStatus?status=${contentForView}&page=${page}&limit=${maxNumberOfRequestPerPage}`,
      $q,
      "Files fetched successfully"
    );
    rows.value = response.files;
    filesByStatus.value = response;
  } catch (error) {
    console.error("Error fetching files:", error);
  }
};

const current = ref(1);
const pagination = (page) => {
  current.value = page;
  getFiles(current.value);
};

const pushToTheFile = (info, row) => {
  router.push(`/view-notes/${row.id}`);
  console.log(row.id);
};

const changeFileStatus = async (info, event) => {
  try {
    event.stopPropagation();
    await putMethod(
      serverURL,
      `file/editStatus?fileId=${info.id}&status=${contentForTrashedComponent}`,
      undefined,
      $q,
      "The status of file has been successfully changed",
      "Error: ",
      {}
    );
  } catch (error) {
    console.error(error);
  }
};

const editFile = async () => {
  console.log(777);
};

onMounted(() => {
  getFiles(1);
});
</script>
