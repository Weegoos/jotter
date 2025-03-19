<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-select
              v-model="fileName"
              use-input
              input-debounce="0"
              label="File Name"
              :options="fileList"
              @filter="filterFn"
              behavior="menu"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col">
            <q-select v-model="type" :options="correctTypeList" label="Types" />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="title" autogrow type="text" label="Title" />
        <q-input v-model="content" autogrow type="text" label="Content" />
        <!-- <q-input
          v-show="isProtectedType"
          v-model="password"
          label="Password for protected note"
          :type="isPwd ? 'password' : 'text'"
          hint="Password with toggle"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input> -->
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          color="green-4"
          no-caps
          label="Create note"
          @click="createNote"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/api/getApi";
import { postMethod } from "src/composables/api/postApi";
import { getCurrentInstance, onMounted, ref, watch } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const fileName = ref(null);
const stringOptions = ref([]);
const fileList = ref(stringOptions.value);
const isPwd = ref(true);

const type = ref("");
const typeList = ref([]);
const correctTypeList = ref([]);

const title = ref("");
const content = ref("");
const getList = async () => {
  try {
    await getMethod(serverURL, "file/filesName", stringOptions, null);
    fileList.value = [...stringOptions.value]; // Обновляем fileList после загрузки

    await getMethod(serverURL, "types", typeList, null);
    correctTypeList.value = typeList.value.map((type) => type.name);
    console.log(correctTypeList.value);
  } catch (error) {
    console.error("Ошибка при загрузке файлов:", error);
  }
};

const isProtectedType = ref(false);
watch(
  () => type.value,
  (newVal) => {
    if (newVal == "protected") {
      isProtectedType.value = true;
    }
  }
);

let ws = null;
onMounted(() => {
  // getAllNotesByFileId(); // Загружаем заметки при загрузке страницы

  // 🔌 Подключаем WebSocket
  ws = new WebSocket("ws://localhost:3000"); // ⚠ Укажи свой WebSocket URL

  ws.onopen = () => {
    console.log("🔌 WebSocket подключен");
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log("📩 Получено сообщение от WebSocket:", message); // 🔍 Логируем ВСЁ сообщение

    if (message.event === "create_note") {
      console.log("📜 Новая заметка от WebSocket:", message.note);
    }
  };

  ws.onclose = () => {
    console.log("❌ WebSocket отключен");
  };
});

const createNote = async () => {
  const payload = {
    content: content.value,
    fileName: fileName.value,
    title: title.value,
    type: type.value,
  };
  await postMethod(serverURL, "notes/create", payload, $q);
};

function filterFn(val, update) {
  update(() => {
    if (val === "") {
      fileList.value = [...stringOptions.value]; // Возвращаем полный список
    } else {
      const needle = val.toLowerCase();
      fileList.value = stringOptions.value.filter((v) =>
        v.toLowerCase().includes(needle)
      );
    }
  });
}

onMounted(() => {
  getList();
});
</script>

<style></style>
