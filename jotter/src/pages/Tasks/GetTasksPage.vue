<template>
  <section>
    <div class="text-font p-[10px]">
      <p class="text-h4">Tasks</p>
      <p>Short description will be placed here</p>
    </div>
    <div>
      <q-tabs v-model="tab" inline-label class="text-green-8 text-font" align="left">
        <q-tab name="dailyTasks" icon="mail" label="Tasks of the day" no-caps class="w-[450px]" />
        <q-tab
          name="periodTasks"
          icon="alarm"
          label="Tasks for the period"
          no-caps
          class="w-[450px]"
        />
      </q-tabs>

      <q-tab-panels
        v-model="tab"
        class="text-font"
        animated
        swipeable
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <q-tab-panel name="dailyTasks">
          <div class="text-h4 q-mb-md">Daily Tasks</div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex-1">
              <q-card class="my-card">
                <q-list bordered separator class="q-pa-md">
                  <q-chip dense size="18px" icon="mdi-circle"> To Do </q-chip>
                  <div class="flex gap-2">
                    <q-input
                      dense
                      filled
                      class="flex-1"
                      placeholder="Choose date..."
                      v-model="chosenDate"
                      mask="####-##-##"
                      :rules="[
                        (val) =>
                          /^\d{4}-\d{2}-\d{2}$/.test(val) || 'Введите дату в формате YYYY-MM-DD',
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
                        <q-icon name="mdi-magnify" class="cursor-pointer" @click="searchTasks" />
                      </template>
                    </q-input>
                    <div class="flex-2">
                      <Button
                        icon="mdi-plus"
                        color="white"
                        class="text-black"
                        @emitClick="openCreateWindow"
                      />
                    </div>
                  </div>
                  <q-item clickable v-ripple v-for="(task, index) in tasks" :key="index">
                    <q-item-section>
                      <q-item-label
                        :class="task.status === 'done' ? 'text-green' : 'text-orange'"
                        >{{ task.status }}</q-item-label
                      >
                      <q-item-label>{{ task.title }}</q-item-label>
                      <q-item-label caption lines="2">{{ task.description }}</q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      <q-item-label caption>{{ task.priority }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
            <!-- <div class="flex-2">
              <q-card class="my-card">
                <q-card-section>
                  <div class="text-h6">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </q-card-section>
              </q-card>
            </div> -->
          </div>
        </q-tab-panel>

        <q-tab-panel name="periodTasks">
          <div class="text-h4 q-mb-md">Period Tasks</div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <CreateTasksPage :isOpenCreatePage="isOpenCreatePage" @closeCreatePage="closeCreatePage" />
  </section>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { Button } from 'src/components/atoms';
import { getMethod } from 'src/composables/api-method/get';
import { useWebSocket } from 'src/composables/javascript-function/websocket';
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue';
import CreateTasksPage from './CreateTasksPage.vue';
// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const date = new Date();
const webSocketURL = proxy.$webSocketURL;
const socket = new WebSocket(webSocketURL);

const tab = ref('dailyTasks');
const chosenDate = ref('');
useWebSocket(webSocketURL);

const tasks = ref([]);
const currentMonth = ref(date.getMonth() + 1);
const currentDay = ref(date.getDate());
console.log(currentDay.value);

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.event === 'getCalendarView' || data.event === 'createTask') {
    getTasksCalendarView();
  }
};
const currentDate = computed(() => {
  const year = date.getFullYear();
  const monthStr = String(currentMonth.value).padStart(2, '0');
  const dayStr = String(currentDay.value).padStart(2, '0');
  return `${year}-${monthStr}-${dayStr}`;
});

console.log(currentDate.value);
const getTasksCalendarView = async () => {
  try {
    const response = await getMethod(
      serverURL,
      `tasks/calendar-view?target_date=${chosenDate.value || currentDate.value}`,
      $q,
      'Задачи успешно получены'
    );
    tasks.value = response.tasks.filter((task) => task.time_period === 'daily');
  } catch (error) {
    console.error(error);
  }
};

const isOpenCreatePage = ref(false);
const openCreateWindow = () => {
  isOpenCreatePage.value = true;
};

const closeCreatePage = () => {
  isOpenCreatePage.value = false;
};

const searchTasks = () => {
  getTasksCalendarView();
};

onMounted(() => {
  getTasksCalendarView();
});
</script>

<style></style>
