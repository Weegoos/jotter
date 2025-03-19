<template>
  <div>
    <q-dialog v-model="isOpenEditPageDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm"
            >You are currently not connected to any network.</span
          >
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Edit" @click="editNote" />
          <q-btn flat label="Close" color="red-4" @click="closeEditPage" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isOpenEditPage: {
    type: Boolean,
    required: true,
  },
});

const isOpenEditPageDialog = ref(props.isOpenEditPage);

watch(
  () => props.isOpenEditPage,
  (newVal) => {
    isOpenEditPageDialog.value = newVal;
  }
);

const emit = defineEmits(['closeEditPage'])
const closeEditPage = () => {
  emit('closeEditPage')
};

const editNote = async () => {
  watch(
    () => allNotesByFileId.value,
    (newVal) => {
      console.log(newVal);
    }
  );
};
</script>

<style></style>
