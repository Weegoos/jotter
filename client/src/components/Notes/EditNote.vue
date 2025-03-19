<template>
  <div>
    <q-dialog v-model="isOpenEditPageDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input v-model="content" type="text" label="Content" />
            </div>
            <div class="col">
              <q-input v-model="title" type="text" label="Title" />
            </div>
            <div class="col">
              <q-input v-model="type" type="text" label="Type" />
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Edit" @click="editNote" />
          <q-btn flat label="Close" color="red-4" @click="closeEditPage" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { putMethod } from "src/composables/api/putApi";
import { getCurrentInstance, onMounted, onUnmounted, ref, watch } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const props = defineProps({
  isOpenEditPage: {
    type: Boolean,
    required: true,
  },
  noteIdentification: {
    type: Number,
    required: true,
  },
});

const isOpenEditPageDialog = ref(props.isOpenEditPage);

watch(
  () => props.isOpenEditPage,
  (newVal) => {
    isOpenEditPageDialog.value = newVal;
  }
);

const emit = defineEmits(["closeEditPage"]);
const closeEditPage = () => {
  emit("closeEditPage");
};

const content = ref("");
const title = ref("");
const type = ref("");
let ws = null;

onMounted(() => {
  ws = new WebSocket("ws://localhost:3000"); // ⚠ Укажи свой WebSocket URL

  ws.onopen = () => {
    console.log("🔌 WebSocket подключен");
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (
      message.event === "note_updated" &&
      message.note.id === props.noteIdentification
    ) {
      console.log("🔄 Обновление заметки через WebSocket:", message.note);

      // 🔥 Обновляем реактивные переменные напрямую
      content.value = message.note.content;
      title.value = message.note.title;
      type.value = message.note.type;
    }
  };

  ws.onclose = () => {
    console.log("❌ WebSocket отключен");
  };
});

// 📌 Закрываем WebSocket при выходе из компонента
onUnmounted(() => {
  if (ws) {
    ws.close();
  }
});

const editNote = async () => {
  const payload = {
    content: content.value,
    title: title.value,
    type: type.value,
  };

  console.log("✏ Обновление заметки ID:", props.noteIdentification);

  await putMethod(
    serverURL,
    "notes/update",
    props.noteIdentification,
    payload,
    $q,
    "Заметка успешно обновлена!",
    "Ошибка при обновлении заметки",
    null,
    () => {
      console.log("📡 Отправка обновления в WebSocket...");
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            event: "update_note",
            noteId: props.noteIdentification,
          })
        );
      }
    }
  );
};
</script>

<style></style>
