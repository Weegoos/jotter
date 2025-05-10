<template>
  <div>
    <BaseQEditor @saveWork="saveWork" @sendWork="sendWork" />
  </div>
</template>

<script setup>
import { successMessage } from "src/composables/notify/successMessage";
import BaseQEditor from "../../components/atoms/BaseQEditor.vue";
import { useQuasar } from "quasar";
import { getCurrentInstance } from "vue";
import { postMethod } from "src/composables/api-method/post";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const saveWork = (data) => {
  successMessage($q, "File saved successfully");
  console.log(data);
};

const sendWork = (data) => {
  console.log(data);
  try {
    const payload = {
      name: data,
    };
    postMethod(
      serverURL,
      "file/create",
      payload,
      $q,
      "File created successfully",
      "Error creating file"
    );
  } catch (error) {
    console.error(error);
  }
};
</script>

<style></style>
