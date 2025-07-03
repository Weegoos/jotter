<template>
  <div>
    <section class="grid grid-cols-2 gap-4 m-[24px]">
      <q-select
        v-model="type"
        :options="typeOptions"
        label="Note's type"
        filled
      />
      <q-input v-model="title" type="text" label="Title" filled autogrow />
    </section>
    <section class="m-[8px]">
      <BaseQEditor @sendWork="sendWork" :modelValue="contents" />
    </section>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import BaseQEditor from "../../components/atoms/BaseQEditor.vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { useApiStore } from "src/stores/api-store";
import { getMethod } from "src/composables/api-method/get";
import { putMethod } from "src/composables/api-method/put";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const apiStore = useApiStore();
const route = useRoute();
const id = route.params.id;

const type = ref("");
const typeOptions = ref([]);
const title = ref("");
const contents = ref("");

const getCurrentInformation = async () => {
  const note = await getMethod(
    serverURL,
    `notes/note/${id}`,
    $q,
    "The information about note has been successfully received"
  );
  console.log(note);
  type.value = note.type;
  title.value = note.title;
  contents.value = note.content;
};

const getList = async () => {
  try {
    await apiStore.getFileName(serverURL, $q);

    await apiStore.getNoteTypes(serverURL, $q);
    typeOptions.value = apiStore.noteTypes.map((type) => type.name);
  } catch (error) {
    console.error(error);
  }
};

const sendWork = async (data) => {
  console.log(data);

  try {
    const payload = ref({
      type: type.value,
      title: title.value,
      content: data,
    });
    console.log("payload", payload);

    await putMethod(serverURL, `notes/update/${id}`, payload.value, $q, {});
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  getCurrentInformation();
  getList();
});
</script>

<style></style>
