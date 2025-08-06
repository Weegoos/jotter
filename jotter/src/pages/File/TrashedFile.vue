<template>
  <div v-if="rows?.length">
    <Table
      :notes="Object(rows)"
      :title="'Файлы'"
      :columns="columns"
      @deleteFile="deleteFile"
      @restoreFile="restoreFile"
    />
    <BasePagination :variableName="Object(filesByStatus)" @pagination="pagination" />
  </div>
  <div v-else>
    <p class="text-center text-h6">Корзина пуста...</p>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { deleteMethod } from 'src/composables/api-method/delete';
import { getMethod } from 'src/composables/api-method/get';
import { putMethod } from 'src/composables/api-method/put';
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import BasePagination from 'src/components/molecules/MoleculePagination.vue';
import { Table } from 'src/components/molecules';
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
  console.log('✅ WebSocket подключен');
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.event === 'change_status') {
    getTrashedFiles(1);
  }
  if (data.event === 'deleteFileByID') {
    getTrashedFiles(1);
  }
};

socket.onclose = () => {
  console.log('❌ WebSocket отключен');
};

socket.onerror = (error) => {
  console.error('🔥 WebSocket ошибка:', error);
};

const rows = ref([]);
const columns = computed(() => [
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: 'description',
    label: 'Description',
    align: 'left',
    field: (row) => row.description,
    sortable: true,
  },
  {
    name: 'created_at',
    label: 'Created At',
    align: 'left',
    field: (row) => row.createdAt,
    sortable: true,
  },
  {
    name: 'updated_at',
    label: 'Updated At',
    align: 'left',
    field: (row) => row.updatedAt,
    sortable: true,
  },
  {
    name: 'restore',
    label: 'Restore',
    align: 'center',
    field: 'id',
  },
  {
    name: 'delete',
    label: 'Delete from Trash',
    align: 'center',
    field: 'id',
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
      'Files fetched successfully'
    );
    rows.value = response.files;
    filesByStatus.value = response;

    console.log('rows:', filesByStatus.value);
  } catch (error) {
    console.error('Error fetching files:', error);
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
    console.error('Error fetching files:', error);
  }
};

const deleteFile = async (info) => {
  '';
  try {
    await deleteMethod(serverURL, 'file/deleteFile', `${info.id}`);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getTrashedFiles();
});
</script>

<style></style>
