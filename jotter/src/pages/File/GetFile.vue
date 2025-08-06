<template>
  <section>
    <Form @submit="searchFiles" class="q-pa-sm">
      <Input v-model="search" placeholder="File Search" />
    </Form>
    <p class="logo-font text-h4 text-bold p-[10px] text-black">
      <q-icon name="mdi-pin" /> Pinned Files
    </p>
    <div class="grid lg:grid-cols-4 gap-4 flex-wrap p-[10px]">
      <q-card
        v-for="(pinnedFile, index) in pinnedFiles"
        :key="index"
        @click="pushToTheFile(pinnedFile)"
      >
        <q-card-section>
          <div class="flex">
            <div class="flex-1">
              <h6>{{ useDateFormat(pinnedFile.updatedAt) }}</h6>
            </div>
            <div class="flex-2">
              <q-btn
                flat
                icon="mdi-dots-horizontal"
                @click="
                  (e) => {
                    e.stopPropagation();
                    viewMenu();
                  }
                "
              >
                <q-menu anchor="bottom right" self="top right">
                  <q-item clickable @click="pinFile(pinnedFile)">
                    <q-item-section avatar>
                      <q-icon color="orange" name="mdi-pin" />
                    </q-item-section>
                    <q-item-section>Unpin</q-item-section>
                  </q-item>
                  <q-item clickable @click="changeFileStatus(pinnedFile)">
                    <q-item-section avatar>
                      <q-icon color="red" name="mdi-delete" />
                    </q-item-section>
                    <q-item-section>Move to the trash</q-item-section>
                  </q-item>
                </q-menu>
              </q-btn>
            </div>
          </div>
          <div class="text-h6">{{ pinnedFile.name }}</div>
          <p>{{ pinnedFile.description || 'Description' }}</p>
        </q-card-section>
      </q-card>
    </div>

    <p class="logo-font text-h4 text-bold p-[10px] text-black"><q-icon name="mdi-file" /> Files</p>
    <div class="grid lg:grid-cols-4 gap-4 flex-wrap p-[10px]">
      <q-card v-for="(file, index) in rows" :key="index" @click="pushToTheFile(file)">
        <q-card-section>
          <div class="flex">
            <div class="flex-1">
              <h6>{{ useDateFormat(file.updatedAt) }}</h6>
            </div>
            <div class="flex-2">
              <q-btn
                flat
                icon="mdi-dots-horizontal"
                @click="
                  (e) => {
                    e.stopPropagation();
                    viewMenu();
                  }
                "
              >
                <q-menu anchor="bottom right" self="top right">
                  <q-item clickable @click="pinFile(file)">
                    <q-item-section avatar>
                      <q-icon color="orange" name="mdi-pin" />
                    </q-item-section>
                    <q-item-section>Pin</q-item-section>
                  </q-item>
                  <q-item clickable @click="changeFileStatus(file)">
                    <q-item-section avatar>
                      <q-icon color="red" name="mdi-delete" />
                    </q-item-section>
                    <q-item-section>Move to the trash</q-item-section>
                  </q-item>
                </q-menu>
              </q-btn>
            </div>
          </div>
          <div class="text-h6">{{ file.name }}</div>
          <p>{{ file.description || 'Description' }}</p>
        </q-card-section>
      </q-card>
    </div>
    <div class="p-[10px]">
      <Button
        label="Add new file"
        icon="mdi-plus"
        text-color="black"
        class="border-dotted border-2 p-[15px] w-[200px]"
        @click="$router.push('/create-file')"
      ></Button>
    </div>
  </section>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { Button, Input } from 'src/components/atoms';
import { Form, Table } from 'src/components/molecules';
import BasePagination from 'src/components/molecules/MoleculePagination.vue';
import { getMethod } from 'src/composables/api-method/get';
import { putMethod } from 'src/composables/api-method/put';
import { useDateFormat } from 'src/composables/javascript-function/formatDate';
import { getCurrentInstance, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

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
  console.log('✅ WebSocket подключен');
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.event === 'create_file') {
    getFiles(1);
  }
  if (data.event === 'change_status') {
    getFiles(1);
  }
};

socket.onclose = () => {
  console.log('❌ WebSocket отключен');
};

socket.onerror = (error) => {
  console.error('🔥 WebSocket ошибка:', error);
};

const rows = ref([]);
const pinnedFiles = ref([]);

const filesByStatus = ref([]);

const getFilesByPinned = async (page, pinnedValue) => {
  try {
    const response = await getMethod(
      serverURL,
      `file/filesStatus?status=${contentForView}&pinned=${pinnedValue}&page=${page}&limit=${maxNumberOfRequestPerPage}`,
      $q,
      'Files fetched successfully'
    );
    return response.files;
  } catch (error) {
    console.error('Ошибка при получении заметок:', error);
    return [];
  }
};

const getFiles = async (page) => {
  try {
    rows.value = await getFilesByPinned(page, false);
    pinnedFiles.value = await getFilesByPinned(page, true);
  } catch (error) {
    console.error('Error fetching files:', error);
  }
};

const search = ref('');
const searchFiles = () => {
  try {
    const searchQuery = search.value.trim();

    if (!searchQuery) {
      getFiles(1);
      return;
    }

    getMethod(serverURL, `file/search?search=${searchQuery}`, $q, 'Файлы найдены')
      .then((response) => {
        const files = response.output;

        pinnedFiles.value = files.filter((file) => file.pinned === true);
        rows.value = files.filter((file) => !file.pinned);
      })
      .catch((error) => {
        console.error('Ошибка при поиске файлов:', error);
      });
  } catch (error) {
    console.error('Ошибка в searchFiles:', error);
  }
};
function viewMenu() {
  // логика открытия меню
}
const current = ref(1);
const pagination = (page) => {
  current.value = page;
  getFiles(current.value);
};

const pushToTheFile = (row) => {
  router.push(`/view-notes/${row.id}`);
  console.log(row.id);
};

const changeFileStatus = async (info) => {
  try {
    await putMethod(
      serverURL,
      `file/editStatus?fileId=${info.id}&status=${contentForTrashedComponent}`,
      undefined,
      $q,
      {}
    );
  } catch (error) {
    console.error(error);
  }
};

const editFile = async () => {
  console.log(777);
};

const pinFile = async (row) => {
  try {
    const payload = {
      value: (row.pinned = !row.pinned),
    };

    await putMethod(serverURL, `file/${row.id}/pin`, payload, $q, {});
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getFiles(1);
});
</script>
