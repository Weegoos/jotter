<template>
  <div style="width: 800px">
    <q-dialog v-model="isOpen" persistent style="width: 800px">
      <q-card style="width: 800px">
        <q-card-section>
          <p class="flex text-2xl q-mb-md justify-center items-center font-bold">{{ detailedInformation.title }}</p>
        <p v-html="detailedInformation.content"></p>
        </q-card-section>
        <q-card-actions align="right">
          <BaseCloseButtonVue  @click="closeDetailedInformationSection"/>
         <BaseUpdateButtonVue @click="updateNote(detailedInformation.id)"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import BaseCloseButtonVue from "../atoms/BaseCloseButton.vue";
import BaseUpdateButtonVue from "../atoms/BaseUpdateButton.vue";
import { useRouter } from "vue-router";

// global variables
const props = defineProps({
  isOpenDetailedInformation: {
    type: Boolean,
    required: true,
  },
  detailedInformation: {
    type: Object,
    required: true
  }
});
const router = useRouter()

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

const updateNote  = (id) => {
  router.push(`/update-note/${id}`)
}
</script>

<style></style>
