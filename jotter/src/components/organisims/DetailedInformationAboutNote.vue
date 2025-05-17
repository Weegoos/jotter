<template>
  <div style="width: 800px">
    <q-dialog v-model="isOpen" persistent style="width: 800px">
      <q-card style="width: 800px">
        <q-card-section>
          <p
            class="flex text-2xl q-mb-md justify-center items-center font-bold"
          >
            {{ detailedInformation.title }}
          </p>
          <p v-html="detailedInformation.content"></p>
        </q-card-section>
        <q-card-actions align="right">
          <BaseUpdateButtonVue @click="updateNote(detailedInformation.id)" />
          <BaseCloseButtonVue
            @click="deleteNote(detailedInformation.id)"
            label="Delete"
          />
          <BaseCloseButtonVue
            @click="closeDetailedInformationSection"
            label="Close"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, watch } from "vue";
import BaseCloseButtonVue from "../atoms/BaseCloseButton.vue";
import BaseUpdateButtonVue from "../atoms/BaseUpdateButton.vue";
import { useRouter } from "vue-router";
import { deleteMethod } from "src/composables/api-method/delete";

// global variables
const props = defineProps({
  isOpenDetailedInformation: {
    type: Boolean,
    required: true,
  },
  detailedInformation: {
    type: Object,
    required: true,
  },
});
const router = useRouter();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;

const isOpen = ref(props.isOpenDetailedInformation);

watch(
  () => props.isOpenDetailedInformation,
  (newVal) => {
    isOpen.value = newVal;
  }
);

const emit = defineEmits(["closeDetailedInformationSection"]);
const closeDetailedInformationSection = () => {
  emit("closeDetailedInformationSection");
};

const updateNote = (id) => {
  router.push(`/update-note/${id}`);
};

const deleteNote = async (id) => {
  try {
    await deleteMethod(serverURL, "notes", id);
    emit("closeDetailedInformationSection");
  } catch (error) {
    console.error(error);
  }
};
</script>

<style></style>
