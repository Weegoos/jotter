<template>
  <div>
    <q-input class="m-[16px]" v-model="fileName" type="text" placeholder="Write file name" autogrow/>
    <BaseQEditor @saveWork="saveWork" @sendWork="sendWork" placeholder="Write description for file"/>
  </div>
</template>

<script setup>
import { successMessage } from "src/composables/notify/successMessage";
import BaseQEditor from "../../components/atoms/BaseQEditor.vue";
import { useQuasar } from "quasar";
import { getCurrentInstance, ref } from "vue";
import { postMethod } from "src/composables/api-method/post";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const saveWork = (data) => {
  successMessage($q, "File saved successfully");
  console.log(data);
};

const fileName = ref('')
const sendWork = (data) => {
  console.log(data);
  try {
    const payload = {
      name: fileName.value,
      description: data
    };

    postMethod(
      serverURL,
      "file/create",
      payload,
      $q,
      "File created successfully",
    );
  } catch (error) {
    console.error(error);
  }
};
</script>

<style></style>
