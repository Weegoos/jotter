<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card>
      <q-card-section>
        <div v-if="isDecrypted === false">
          <Input
            v-model="password"
            outlined
            label="Введите пароль"
            dense
            type="password"
          />

          <Button
            v-if="detailedInfo.type === privateNote"
            color="primary"
            label="Проверить пароль"
            @emitClick="checkPassword"
          />
        </div>

        <div v-show="isDecrypted === true">
          <p class="text-2xl q-mb-md font-bold text-center break-words">
            {{ detailedInfo.title }}
          </p>

          <p v-html="detailedInfo.content" class="break-words"></p>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <Button
          label="Закрыть"
          color="red-4"
          flat
          @click="emit('closeDetailedInformationSection')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, getCurrentInstance } from "vue";
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/api-method/get";
import { Button, Input } from "../atoms";
import { useWebSocket } from "src/composables/javascript-function/weboscket";

// global variables
const props = defineProps({
  isOpenDetailedInformation: Boolean,
  detailedInformation: Object,
});

const emit = defineEmits([
  "closeDetailedInformationSection",
  "openDecryptedNote",
]);

const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const privateNote = proxy.$privateNote;
const $q = useQuasar();
const webSocketURL = proxy.$webSocketURL;
const socket = new WebSocket(webSocketURL);
useWebSocket(webSocketURL);

socket.onmessage = async (event) => {
  const data = JSON.parse(event.data);
  if (["create_note", "notes_list"].includes(data.event)) {
    const id = detailedInfo.value.id;

    try {
      const response = await getMethod(
        serverURL,
        `notes/note/${id}`,
        $q,
        "Обновлено по WebSocket"
      );

      detailedInfo.value = response;
      if (response.type !== privateNote) {
        isDecrypted.value = true;
      }

      emit("openDecryptedNote", detailedInfo.value);
    } catch (error) {
      console.error("Ошибка при обновлении по WebSocket:", error);
    }
  }
};

const isOpen = ref(props.isOpenDetailedInformation);
const password = ref("");
const isDecrypted = ref(false);
const detailedInfo = ref({ ...props.detailedInformation });

watch(
  () => props.isOpenDetailedInformation,
  (val) => (isOpen.value = val),
  { immediate: true }
);

watch(
  () => props.detailedInformation,
  (newVal) => {
    detailedInfo.value = { ...newVal };

    if (newVal.type === privateNote) {
      isDecrypted.value = false;
    } else {
      isDecrypted.value = true;
    }
    password.value = "";
  },
  { immediate: true }
);

const checkPassword = async () => {
  try {
    const id = detailedInfo.value.id;
    const response = await getMethod(
      serverURL,
      `notes/note/${id}?password=${password.value}`,
      $q,
      "Успешный пароль"
    );

    isDecrypted.value = true;
    detailedInfo.value = response;
    console.log(isDecrypted.value, detailedInfo.value);

    emit("openDecryptedNote", detailedInfo.value);
  } catch (error) {
    console.error(error);
  }
};
</script>
