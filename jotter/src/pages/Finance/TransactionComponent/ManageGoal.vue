<template>
  <div>
    <q-dialog v-model="isGoalDialogPage" persistent>
      <q-card>
        <q-card-section class="grid grid-cols-3 gap-4">
          <Input v-model="name" type="text" placeholder="Name"></Input>
          <Input
            v-model="target_amount"
            placeholder="Target Amount"
          ></Input>
          <Input v-model="deadline" label="Deadline">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="date" mask="YYYY-MM-DD" @update:model-value="onDateSelect" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </Input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="emit('closeDialog')" />
          <Button color="green" label="Create" @click="createGoal" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { Button, Input } from 'src/components/atoms';
import { postMethod } from 'src/composables/api-method/post';
import { getCurrentInstance, ref, watch } from 'vue';

// global variables
const props = defineProps({
  isManageGoalOpen: {
    type: Boolean,
  },
});
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const isGoalDialogPage = ref(props.isManageGoalOpen);

watch(
  () => props.isManageGoalOpen,
  (newVal) => {
    isGoalDialogPage.value = newVal;
  }
);

const deadline = ref('');
const date = ref('');
const target_amount = ref('');
const name = ref('');
const emit = defineEmits(['closeDialog']);

function onDateSelect(val) {
  // Формируем ISO строку с концом дня
  deadline.value = `${val}T23:59:59Z`;
}

const createGoal = async () => {
  try {
    const payload = {
      name: name.value,
      target_amount: target_amount.value,
      deadline: deadline.value,
      status: 'in_progress',
    };

    await postMethod(serverURL, 'goals', payload, $q, 'The goal was created successfully');
  } catch (error) {
    console.error(error);
  }
};
</script>

<style></style>
