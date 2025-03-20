<template>
  <div class="">
    <q-scroll-area style="height: 70px">
      <section class="row q-gutter-sm q-pa-md no-wrap" v-if="isTyping">
        <q-select
          v-model="fileName"
          use-input
          input-debounce="0"
          label="File Name"
          :options="fileList"
          @filter="filterFn"
          behavior="menu"
          dense
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          dense
          v-model="type"
          :options="correctTypeList"
          label="Types"
          style="width: 100px"
        />
        <div class="col" align="right">
          <q-btn flat icon="send" @click="createNote">
            <q-tooltip> Send note </q-tooltip>
          </q-btn>
          <q-btn-dropdown icon="settings" flat>
            <CreateNotesSettings
              @fullWidth="handleFullWidth"
              @smallText="handleSmallText"
            />
          </q-btn-dropdown>
        </div>
      </section>
    </q-scroll-area>
    <section class="row">
      <q-card class="my-card col" align="center">
        <q-card-section
          class="q-mx-xl q-mt-xl"
          :class="toggleFullWidth ? 'fullWidth' : 'mediumWidth'"
        >
          <q-input
            v-model="title"
            autogrow
            type="text"
            placeholder="New Note"
            class="q-mb-md"
            :class="toggleSmallText ? 'titleSmallText' : 'titleNormalText'"
            @update:modelValue="handleTyping"
            borderless
          />
          <q-input
            v-model="content"
            autogrow
            type="text"
            placeholder="Write something..."
            :class="toggleSmallText ? 'contentSmallText' : 'contentNormalText'"
            @update:modelValue="handleTyping"
            borderless
          />
          <q-input
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
          </q-input>
        </q-card-section>
      </q-card>
    </section>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/api/getApi";
import { postMethod } from "src/composables/api/postApi";
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import CreateNotesSettings from "../components/Notes/CreateNotesSettings.vue";
import { meta } from "src/composables/javascript-function/meta";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);

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
const password = ref("");
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

const toggleFullWidth = ref("");
const handleFullWidth = (value) => {
  toggleFullWidth.value = value;
};

const toggleSmallText = ref("");
const handleSmallText = (value) => {
  console.log("Получено от дочернего компонента:", value);
  toggleSmallText.value = value;
};

const isTyping = ref(true);
let typingTimeout = null;

const handleTyping = (e) => {
  isTyping.value = false;
  // meta("Batyr")
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    isTyping.value = true;
  }, 1000);
};

const isProtectedType = ref(false);
watch(
  () => type.value,
  (newVal) => {
    if (newVal == "protected") {
      isProtectedType.value = true;
    } else {
      isProtectedType.value = false;
    }
  }
);

let ws = null;
onMounted(() => {
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

<style scoped></style>
