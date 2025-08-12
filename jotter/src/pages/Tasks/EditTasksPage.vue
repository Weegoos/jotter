<template>
  <q-dialog v-model="isEditPage" persistent>
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
          :rules="[(val) => /^\d{4}-\d{2}-\d{2}$/.test(val) || 'Введите дату в формате YYYY-MM-DD']"
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
      </q-card-section>
      <q-card-actions align="right">
        <Button label="Update" color="positive" @emitClick="updateTask" />
        <Button label="Cancel" color="black" @emitClick="closeEditPage" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { Button, Input, Select } from 'src/components/atoms';
import { putMethod } from 'src/composables/api-method/put';
import { getCurrentInstance, ref, watch } from 'vue';

// global variables
const props = defineProps({
  taskInformation: Object,
  isOpenEditTaskPage: Boolean,
});
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const isEditPage = ref(props.isOpenEditTaskPage);

watch(
  () => props.isOpenEditTaskPage,
  (newVal) => {
    isEditPage.value = newVal;
  }
);

const emit = defineEmits(['closeEditPage']);
const closeEditPage = () => {
  emit('closeEditPage');
};

const priorityOptions = ['high', 'medium', 'low'];
const periodOptions = ['daily', 'weekly', 'monthly', 'yearly'];
const description = ref(props.taskInformation.description);
const title = ref(props.taskInformation.title);
const chosenDate = ref(props.taskInformation.target_date);

const timePeriod = ref(props.taskInformation.time_period);
const priority = ref(props.taskInformation.priority);

watch(
  () => props.taskInformation,
  (newVal) => {
    timePeriod.value = newVal.time_period;
    priority.value = newVal.priority;
    description.value = newVal.description;
    title.value = newVal.title;
    chosenDate.value = newVal.target_date;
  }
);

const updateTask = async () => {
  try {
    console.log(props.taskInformation.id);
    const payload = {
      title: title.value,
      description: description.value,
      status: props.taskInformation.status,
      priority: priority.value,
      target_date: chosenDate.value,
      time_period: timePeriod.value,
    };

    await putMethod(serverURL, `tasks/${props.taskInformation.id}`, payload, $q, {});
  } catch (error) {
    console.error(error);
  }
};
</script>

<style></style>
