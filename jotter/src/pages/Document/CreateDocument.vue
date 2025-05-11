<template>
  <div>
    <section class="grid grid-cols-2 gap-4 m-[24px]">
      <q-select
        v-model="fileName"
        :options="fileNameOptions"
        label="File Name"
        filled
      />
      <q-select
        v-model="type"
        :options="typeOptions"
        label="Note's type"
        filled
      />
    </section>
    <section class="m-[24px]">
      <q-input v-model="title" type="text" label="Title" filled autogrow />
    </section>
    <section class="m-[8px]">
      <BaseQEditor
        @saveWork="saveWork"
        @sendWork="sendWork"
        placeholder="Write description for file"
      />
    </section>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import BaseQEditor from "../../components/atoms/BaseQEditor.vue";
import { useQuasar } from "quasar";
import { useApiStore } from "src/stores/api-store";
import { postMethod } from "src/composables/api-method/post";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const apiStore = useApiStore();

const fileName = ref("");
const fileNameOptions = ref([]);
const type = ref("");
const typeOptions = ref([]);
const title = ref("");

const getList = async () => {
  try {
    await apiStore.getFileName(serverURL, $q);
    fileNameOptions.value = apiStore.fileNames;

    await apiStore.getNoteTypes(serverURL, $q);
    typeOptions.value = apiStore.noteTypes.map((type) => type.name);
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  getList();
});

const saveWork = async (data) => {
  console.log(data);
};
const sendWork = async (data) => {
  try {
    const payload = {
      content: data,
      fileName: fileName.value,
      title: title.value,
      type: type.value,
    };

    await postMethod(
      serverURL,
      "notes/create",
      payload,
      $q,
      "Заметка создана!"
    );
  } catch (error) {
    console.error(error);
  }
};
</script>

<style></style>
