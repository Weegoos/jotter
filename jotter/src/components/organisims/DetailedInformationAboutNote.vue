<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card>
      <q-card-section>
        <div v-if="isDecrypted === false">
          <q-input
            v-model="password"
            label="Введите пароль"
            type="password"
            outlined
            dense
          />
          <q-btn
            v-if="detailedInfo.type === privateNote"
            color="primary"
            no-caps
            label="Проверить пароль"
            @click="checkPassword"
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
        <BaseCloseButtonVue
          @click="emit('closeDetailedInformationSection')"
          label="Закрыть"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, getCurrentInstance } from "vue";
import { is, useQuasar } from "quasar";
import { getMethod } from "src/composables/api-method/get";
import BaseCloseButtonVue from "../atoms/BaseCloseButton.vue";

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

    // Если приватная — не трогаем isDecrypted, его меняет checkPassword
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
