<template>
  <div>
    <q-dialog v-model="isCreatePage" persistent>
      <q-card>
        <q-card-section>
          <Input v-model="title" placeholder="Task's title" class="q-mb-sm" />
          <Input v-model="description" placeholder="Task's description" class="q-mb-sm" />
          <Select
            v-model="priority"
            placeholder="Task's priority"
            :options="priorityOptions"
            class="q-mb-sm"
          />
          <Select
            v-model="timePeriod"
            placeholder="Task's time period"
            :options="periodOptions"
            class="q-mb-sm"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="closeCreatePage" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { Input, Select } from 'src/components/atoms';
import { ref, watch } from 'vue';
Select;

const props = defineProps({
  isOpenCreatePage: Boolean,
});
const isCreatePage = ref(props.isOpenCreatePage);
watch(
  () => props.isOpenCreatePage,
  (newVal) => {
    isCreatePage.value = newVal;
  }
);

const emit = defineEmits(['closeCreatePage']);
const closeCreatePage = () => {
  emit('closeCreatePage');
};

const priorityOptions = ['high', 'medium', 'low'];
const periodOptions = ['daily', 'weekly', 'monthly', 'yearly'];

const timePeriod = ref("Task's time period");
const priority = ref("Task's priority");
</script>

<style></style>
