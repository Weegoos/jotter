<template>
  <div>
    <q-dialog v-model="isGoalDialogPage" persistent>
      <q-card>
        <q-card-section>
          <div class="grid grid-cols-3 gap-4">
            <Input v-model="name" type="text" placeholder="Name"></Input>
            <Input v-model="target_amount" placeholder="Target Amount"></Input>
            <Input v-model="deadline" label="Deadline">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-date v-model="date" mask="YYYY-MM-DD" @update:model-value="onDateSelect" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </Input>
          </div>
          <q-list bordered v-for="(goal, index) in goalsArray" :key="index" class="q-mt-sm">
            <q-item clickable v-ripple>
              <q-item-section>
                <p class="text-body1">Name: {{ goal.name }}</p>
                <p
                  class="text-caption text-capitalize"
                  :class="goal.status === 'in_progress' ? 'text-orange-600' : 'text-green-700'"
                >
                  {{ goal.status === 'in_progress' ? 'In progress' : goal.status }}
                </p>
              </q-item-section>
              <q-item-section avatar>
                <Button class="text-black" flat icon="mdi-dots-vertical">
                  <q-menu transition-show="scale" transition-hide="scale">
                    <q-list>
                      <q-item clickable @click="deleteMethod(serverURL, 'goals', goal.id)">
                        <q-item-section avatar>
                          <q-icon color="red" name="mdi-delete" />
                        </q-item-section>
                        <q-item-section>Delete</q-item-section>
                      </q-item>
                      <q-item clickable @click="changeTheStatus(goal.id, goal.status)">
                        <q-item-section avatar>
                          <q-icon color="orange" name="mdi-pencil" />
                        </q-item-section>
                        <q-item-section>Change the status</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </Button>
              </q-item-section>
            </q-item>
          </q-list>
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
import { deleteMethod } from 'src/composables/api-method/delete';
import { getMethod } from 'src/composables/api-method/get';
import { patchMethod } from 'src/composables/api-method/patch';
import { postMethod } from 'src/composables/api-method/post';
import { useWebSocket } from 'src/composables/javascript-function/websocket';
import { getCurrentInstance, onMounted, ref, watch } from 'vue';

// global variables
const props = defineProps({
  isManageGoalOpen: {
    type: Boolean,
  },
});
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const webSocketURL = proxy.$webSocketURL;
const socket = new WebSocket(webSocketURL);

useWebSocket(webSocketURL);

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const updateEvents = ['newGoal', 'deletedGoal', 'updatedGoal'];

  if (updateEvents.includes(data.event)) {
    getGoals();
  }
};

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

const goalsArray = ref([]);
const getGoals = async () => {
  try {
    const response = await getMethod(serverURL, 'goals', $q);
    goalsArray.value = response.goals;
  } catch (error) {
    console.error(error);
  }
};

const changeTheStatus = async (id, currentStatus) => {
  try {
    let newStatus;
    if (currentStatus === 'in_progress') {
      newStatus = 'completed';
    } else if (currentStatus === 'completed') {
      newStatus = 'in_progress';
    } else {
      $q.notify({
        type: 'negative',
        message: 'Status change not allowed for this goal',
      });
      return;
    }

    const payload = { status: newStatus };
    await patchMethod(serverURL, `goals/${id}`, payload, $q, {});
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getGoals();
});
</script>

<style></style>
