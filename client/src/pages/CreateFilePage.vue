<template>
  <div class="q-pa-md">
    <q-input v-model="fileName" autogrow type="text" label="Создай папку..." />
    <q-btn color="green-4" label="Create" @click="sendNote" />
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { postMethod } from "src/composables/api/postApi";
import { checkAccessToken } from "src/composables/javascript-function/checkAccessToken";
import { getCurrentInstance, onMounted, ref } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
console.log(serverURL);
const $q = useQuasar();

const fileName = ref("");

const sendNote = async () => {
  await postMethod(serverURL, "file/create", { name: fileName.value }, $q);
};

onMounted(() => {
  checkAccessToken();
});
</script>

<style></style>
