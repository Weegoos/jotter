<template>
  <div class="q-pa-md">
    <q-input v-model="content" autogrow type="text" label="Напиши заметку..." />
    <q-btn color="green-4" label="Send" @click="sendNote" />
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

const content = ref("");

const sendNote = async () => {
  await postMethod(serverURL, "notes/create", { content: content.value }, $q);
};

onMounted(() => {
  checkAccessToken();
});
</script>

<style></style>
