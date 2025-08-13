<template>
  <div>
    <q-dialog v-model="isCreatePage" persistent>
      <q-card>
        <q-card-section>
          <Input v-model="title" autogrow placeholder="Task's title" class="q-mb-sm" />
          <Input v-model="description" autogrow placeholder="Task's description" class="q-mb-sm" />
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
          <q-input
            dense
            outlined
            placeholder="Choose Date"
            v-model="chosenDate"
            mask="####-##-##"
            :rules="[
              (val) => /^\d{4}-\d{2}-\d{2}$/.test(val) || 'Введите дату в формате YYYY-MM-DD',
            ]"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="chosenDate" mask="YYYY-MM-DD" v-close-popup>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <!-- <Input v-if="timePeriod === 'recurring'" :model-value="formattedDateFrom" placeholder="Select date range" readonly>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="dateFrom" range mask="YYYY-MM-DD">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>

              <q-icon name="mdi-magnify" class="cursor-pointer" @click="searchTasksSummary" />
            </template>
          </Input> -->
        </q-card-section>
        <q-card-actions align="right">
          <Button label="Create" color="positive" @emitClick="createTask" />
          <Button label="Cancel" color="black" @emitClick="closeCreatePage" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { Button, Input, Select } from 'src/components/atoms';
import { postMethod } from 'src/composables/api-method/post';
import { computed, getCurrentInstance, ref, watch } from 'vue';

// global variables
const props = defineProps({
  isOpenCreatePage: Boolean,
});
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

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
const periodOptions = ['daily', 'recurring', 'weekly', 'monthly', 'yearly'];
const description = ref('');
const title = ref('');
const chosenDate = ref('');
const dateFrom = ref(null);

const timePeriod = ref("Task's time period");
const priority = ref("Task's priority");

const formattedDateFrom = computed(() => {
  if (!dateFrom.value) return '';
  const { from, to } = dateFrom.value;
  if (from && to) return `${from} — ${to}`;
  return from || to || '';
});

const createTask = async () => {
  try {
    const data = {
      title: title.value,
      description: description.value,
      status: 'pending',
      priority: priority.value,
      target_date: chosenDate.value,
      time_period: timePeriod.value,
    };
    await postMethod(serverURL, 'tasks', data, $q, 'The task was created successfully');
  } catch (error) {
    console.error(error);
  }
};
</script>

<style></style>
