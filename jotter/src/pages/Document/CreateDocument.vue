<template>
  <div>
    <section class="grid grid-cols-3 gap-4 m-[24px]">
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
      <q-select
        v-model="hashtags"
        :options="hashtagOptions"
        label="Hashtags"
        filled
        multiple
      />
    </section>
    <section
      class="m-[24px]"
      :class="type == privateNote ? 'grid grid-cols-2 grid-rows-1 gap-4' : ''"
    >
      <q-input v-model="title" type="text" label="Title" filled autogrow />
      <q-input
        v-model="password"
        type="password"
        label="Password"
        filled
        v-if="type === privateNote"
      />
    </section>
    <section class="m-[8px]">
      <BaseQEditor
        @saveWork="saveWork"
        @sendWork="sendWork"
        placeholder="Write something here..."
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
const privateNote = proxy.$privateNote;

const fileName = ref("");
const fileNameOptions = ref([]);
const type = ref("");
const typeOptions = ref([]);
const title = ref("");
const password = ref("");
const hashtagOptions = ref([]);
const hashtags = ref(null);

const getList = async () => {
  try {
    await apiStore.getFileName(serverURL, $q);
    fileNameOptions.value = apiStore.fileNames;

    await apiStore.getNoteTypes(serverURL, $q);
    typeOptions.value = apiStore.noteTypes.map((type) => type.name);

    await apiStore.getHashtags(serverURL, $q);
    console.log(apiStore.hashtags.hastags);

    hashtagOptions.value = apiStore.hashtags.hastags.map((hash) => hash.name);
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  getList();
});

const saveWork = async (data) => {
  try {
    const payload = {
      content: data,
      fileName: fileName.value,
      title: title.value,
      type: "saved",
    };

    await postMethod(
      serverURL,
      "notes/create",
      payload,
      $q,
      "Заметка сохранена!"
    );
  } catch (error) {
    console.error(error);
  }
};
const sendWork = async (data) => {
  try {
    const payload = {
      content: data,
      fileName: fileName.value,
      title: title.value,
      type: type.value,
      password: password.value,
      hashtags: hashtags.value,
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
