<template>
  <section>
    <div class="text-font p-[10px]">
      <p class="text-h4">Tasks</p>
      <Button icon="mdi-plus" color="white" class="text-black" @click="openCreateWindow" />
    </div>
    <div>
      <q-scroll-area style="width: 100%; height: 85vh">
        <q-tabs v-model="tab" inline-label class="text-green-8 text-font">
          <q-tab
            name="dailyTasks"
            icon="mdi-calendar-check"
            label="Tasks of the day"
            no-caps
            class="w-[450px]"
          />
          <q-tab
            name="periodTasks"
            icon="mdi-clock-time-three-outline"
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
            <div class="text-h4 q-mb-md">Tasks</div>
            <div class="grid grid-cols-2 gap-4">
              <OrganismToGetTasks
                :tasks="tasks"
                @changeTaskStatus="changeTaskStatus"
                @deleteTask="deleteTask"
                :isInput="true"
                v-model="chosenDate"
                @searchTasks="searchTasks"
                @openCreateWindow="openCreateWindow"
                @edit="editTask"
                :dailyPercent="dailyPercent"
              >
                <Input
                  placeholder="Choose date..."
                  v-model="chosenDate"
                  mask="####-##-##"
                  @keypress.enter="searchTasks"
                  :rules="[
                    (val) => /^\d{4}-\d{2}-\d{2}$/.test(val) || 'Введите дату в формате YYYY-MM-DD',
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="chosenDate" mask="YYYY-MM-DD">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>

                    <q-icon name="mdi-magnify" class="cursor-pointer" @click="searchTasks" />
                  </template>
                </Input>
              </OrganismToGetTasks>

              <div class="flex-2">
                <q-card class="my-card">
                  <q-card-section>
                    <q-tabs v-model="dailyTab" inline-label class="text-green-8 text-font">
                      <q-tab
                        name="weekPlans"
                        icon="mdi-calendar-weekend"
                        label="Plans for the week"
                        no-caps
                        class="w-[450px]"
                      />
                      <q-tab
                        name="monthPlans"
                        icon="mdi-calendar-month"
                        label="Plans for the month"
                        no-caps
                        class="w-[450px]"
                      />
                      <q-tab
                        name="annualPlan"
                        icon="mdi-calendar-month-outline"
                        label="Plans for the year"
                        no-caps
                        class="w-[450px]"
                      />
                    </q-tabs>
                    <q-tab-panels
                      v-model="dailyTab"
                      class="text-font"
                      animated
                      swipeable
                      transition-prev="jump-up"
                      transition-next="jump-up"
                    >
                      <q-tab-panel name="weekPlans">
                        <OrganismToGetTasks
                          :isInput="true"
                          :tasks="weeklyTasks"
                          @changeTaskStatus="changeTaskStatus"
                          @deleteTask="deleteTask"
                          :weeklyPercent="weeklyPercent"
                          @edit="editTask"
                          @openCreateWindow="openCreateWindow"
                          v-model="weeklyChosenDate"
                          @searchTasks="searchTasks"
                        >
                          <Input
                            @keypress.enter="searchWeeklyRange"
                            :model-value="formatWeeklyRange"
                            placeholder="Select date range"
                            readonly
                          >
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy
                                  cover
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <q-date v-model="weeklyRange" range mask="YYYY-MM-DD">
                                    <div class="row items-center justify-end">
                                      <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                  </q-date>
                                </q-popup-proxy>
                              </q-icon>

                              <q-icon
                                name="mdi-magnify"
                                class="cursor-pointer"
                                @click="searchWeeklyRange"
                              />
                            </template>
                          </Input>
                        </OrganismToGetTasks>
                      </q-tab-panel>

                      <q-tab-panel name="monthPlans">
                        <div class="text-h4 q-mb-md">Month Tasks</div>
                        <OrganismToGetTasks
                          :tasks="monthTasks"
                          @changeTaskStatus="changeTaskStatus"
                          @deleteTask="deleteTask"
                          :monthlyPercent="monthlyPercent"
                          @edit="editTask"
                        >
                          <div>
                            <Form
                              class="grid grid-cols-2 gap-4"
                              @keypress.enter="searchMonthlyTask"
                            >
                              <Input
                                v-model="chosenMonth"
                                mask="##"
                                max="12"
                                min="1"
                                placeholder="Select a month"
                              ></Input>
                              <Input
                                v-model="chosenYear"
                                min="2000"
                                mask="####"
                                placeholder="Select a year"
                              ></Input>
                            </Form>
                          </div>
                        </OrganismToGetTasks>
                      </q-tab-panel>
                      <q-tab-panel name="annualPlan">
                        <div class="text-h4 q-mb-md">Plans for the year</div>
                        <OrganismToGetTasks
                          :tasks="annualTasks"
                          @changeTaskStatus="changeTaskStatus"
                          @deleteTask="deleteTask"
                          :annualPercentage="annualPercentage"
                          @edit="editTask"
                        >
                          <Form @keypress.enter="searchChosenAnnualTasks">
                            <Input
                              v-model="chosenYearForAnnualTasks"
                              mask="####"
                              min="2000"
                            ></Input>
                          </Form>
                        </OrganismToGetTasks>
                      </q-tab-panel>
                    </q-tab-panels>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="periodTasks">
            <div class="text-h4 q-mb-md">Period Tasks</div>
            <div class="">
              <q-input
                @keypress.enter="searchTasksSummary"
                :model-value="formattedDateFrom"
                placeholder="Select date range"
                readonly
              >
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
              </q-input>
            </div>
            <div class="demo-app">
              <div class="demo-app-main">
                <FullCalendar
                  class="demo-app-calendar"
                  :options="calendarOptions"
                  ref="fullCalendarRef"
                >
                  <template v-slot:eventContent="arg">
                    <div class="whitespace-normal break-words max-w-full">
                      <b class="block text-sm font-semibold">{{ arg.timeText }}</b>
                      <i class="block text-xs text-gray-700">{{ arg.event.title }}</i>
                    </div>
                  </template>
                </FullCalendar>
              </div>

              <q-dialog v-model="detailedInformation" persistent>
                <q-card>
                  <q-card-section class="row items-center">
                    <span class="q-ml-sm text-bold text-h6">Подробная информация о задачи</span>
                  </q-card-section>
                  <q-card-section class="q-ml-sm">
                    <span>Название задачи</span>
                    <p class="detailedInfo">
                      {{ detailedInformationTitle }}
                    </p>
                    <span>Статус</span>
                    <p class="detailedInfo">
                      {{ detailedInformationStatus }}
                    </p>
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn
                      color="red"
                      flat
                      no-caps
                      label="Удалить"
                      @click="deleteTask(currentClickInfo.event._def.publicId)"
                    />
                    <q-btn flat no-caps label="Закрыть" color="primary" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-scroll-area>
    </div>
    <CreateTasksPage :isOpenCreatePage="isOpenCreatePage" @closeCreatePage="closeCreatePage" />
    <EditTasksPage
      :taskInformation="taskInformation"
      :isOpenEditTaskPage="isOpenEditTaskPage"
      @closeEditPage="closeEditPage"
    />
  </section>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { Button, Input, Tabs } from 'src/components/atoms';
import { getMethod } from 'src/composables/api-method/get';
import { useWebSocket } from 'src/composables/javascript-function/websocket';
import { computed, getCurrentInstance, onMounted, reactive, ref, watch } from 'vue';
import CreateTasksPage from './CreateTasksPage.vue';
import { patchMethod } from 'src/composables/api-method/patch';
import { deleteMethod } from 'src/composables/api-method/delete';
import OrganismToGetTasks from 'src/components/organism /OrganismToGetTasks.vue';
import EditTasksPage from './EditTasksPage.vue';

import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ruLocale from '@fullcalendar/core/locales/ru';
import { useDateFormat } from 'src/composables/javascript-function/formatDate';
// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const date = new Date();
const webSocketURL = proxy.$webSocketURL;
const socket = new WebSocket(webSocketURL);

const tab = ref('dailyTasks');
const dailyTab = ref('weekPlans');
const chosenDate = ref('');
useWebSocket(webSocketURL);

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const updateEvents = ['createTask', 'updateTaskStatus', 'deleteTask', 'completelyUpdateTheTask'];

  if (updateEvents.includes(data.event)) {
    getTasksCalendarView();
    getWeekRange();
    getMonthlyTasks();
    getAnnualTasks();
    if (dateFrom.value) {
      searchTasksSummary();
    }
  }
};

const dateFrom = ref(null);
const selectedDate = ref({});

const INITIAL_EVENTS = ref([]);

const searchTasksSummary = async () => {
  const response = await getMethod(
    serverURL,
    `tasks/summary?from_date=${dateFrom.value.from}&to_date=${dateFrom.value.to}`,
    $q,
    'Задачи успешно получены'
  );
  INITIAL_EVENTS.value = response.tasks.map((task) => ({
    id: task.id,
    title: task.title,
    start: task.target_date.split('T')[0], // "2025-08-12"
    description: task.description,
    status: task.status,
    priority: task.priority,
  }));
};

const currentEvents = ref([]);
const fullCalendarRef = ref(null);
const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  initialView: 'dayGridMonth',
  events: INITIAL_EVENTS,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  locale: ruLocale,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventsSet: handleEvents,
});

watch(INITIAL_EVENTS, (newEvents) => {
  if (fullCalendarRef.value) {
    const calendarApi = fullCalendarRef.value.getApi();
    calendarApi.removeAllEvents(); // удалить старые
    calendarApi.addEventSource(newEvents); // добавить новые
  }
});

async function handleDateSelect(selectInfo) {
  selectedDate.value = {
    start: selectInfo.startStr,
    end: selectInfo.endStr,
    allDay: selectInfo.allDay,
  };
}

const detailedInformation = ref(false);
const detailedInformationTitle = ref('');
const detailedInformationStatus = ref('');
const currentClickInfo = ref(null);

function handleEventClick(clickInfo) {
  console.log(clickInfo);

  detailedInformation.value = true;
  detailedInformationTitle.value = clickInfo.event.title;
  detailedInformationStatus.value = clickInfo.event.extendedProps.status;
  currentClickInfo.value = clickInfo;
  console.log(currentClickInfo.value.event._def.publicId);
}

function handleEvents(events) {
  currentEvents.value = events;
}

const formattedDateFrom = computed(() => {
  if (!dateFrom.value) return '';
  const { from, to } = dateFrom.value;
  if (from && to) return `${from} — ${to}`;
  return from || to || '';
});

const weeklyRange = ref('');
const formatWeeklyRange = computed(() => {
  if (!weeklyRange.value) return '';
  const { from, to } = weeklyRange.value;
  if (from && to) return `${from} — ${to}`;
  return from || to || '';
});

const tasks = ref([]);
const currentMonth = ref(date.getMonth() + 1);
const currentDay = ref(date.getDate());
console.log(currentDay.value);

const currentDate = computed(() => {
  const year = date.getFullYear();
  const monthStr = String(currentMonth.value).padStart(2, '0');
  const dayStr = String(currentDay.value).padStart(2, '0');
  return `${year}-${monthStr}-${dayStr}`;
});

const monthTasks = ref([]);
const weeklyTasks = ref([]);
const dailyPercent = ref('');
const weeklyChosenDate = ref('');
const getTasksCalendarView = async () => {
  try {
    const response = await getMethod(
      serverURL,
      `tasks/calendar-view?target_date=${chosenDate.value || currentDate.value}`,
      $q,
      'Задачи успешно получены'
    );
    tasks.value = response.tasks.filter(
      (task) => task.time_period === 'daily' || task.time_period === 'recurring'
    );
    dailyPercent.value =
      Math.round(
        (tasks.value.filter((task) => task.status === 'done').length / tasks.value.length) * 100
      ) || 0;
  } catch (error) {
    console.error(error);
  }
};

const weeklyPercent = ref('');
const getWeekRange = async (date = new Date()) => {
  const current = new Date(date);

  // Находим понедельник (0 — воскресенье, 1 — понедельник)
  const dayOfWeek = current.getDay();
  const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;

  const monday = new Date(current);
  monday.setDate(current.getDate() + diffToMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const format = (d) => d.toISOString().slice(0, 10);

  const week_start = format(monday);
  const week_end = format(sunday);
  console.log(week_start, week_end);

  const response = await getMethod(
    serverURL,
    `tasks/calendar-view?week_start=${weeklyRange.value.from || week_start}&week_end=${
      weeklyRange.value.to || week_end
    }`,
    $q,
    'Задачи успешно получены'
  );
  weeklyTasks.value = response.tasks.filter((task) => task.time_period === 'weekly');
  weeklyPercent.value =
    Math.round(
      (weeklyTasks.value.filter((task) => task.status === 'done').length /
        weeklyTasks.value.length) *
        100
    ) || 0;
};

const searchWeeklyRange = () => {
  getWeekRange();
};

const monthlyPercent = ref('');
const chosenMonth = ref('');
const chosenYear = ref('');
const getMonthlyTasks = async (date = new Date()) => {
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  const response = await getMethod(
    serverURL,
    `tasks/calendar-view?year=${chosenYear.value || currentYear}&month=${
      chosenMonth.value || currentMonth
    }`,
    $q,
    'Задачи успешно получены'
  );

  monthTasks.value = response.tasks.filter((task) => task.time_period === 'monthly');
  monthlyPercent.value =
    Math.round(
      (monthTasks.value.filter((task) => task.status === 'done').length / monthTasks.value.length) *
        100
    ) || 0;
};

const searchMonthlyTask = () => {
  getMonthlyTasks();
};

const annualTasks = ref([]);
const annualPercentage = ref('');
const chosenYearForAnnualTasks = ref(2025);
const getAnnualTasks = async (date = new Date()) => {
  const currentYear = date.getFullYear();

  try {
    const response = await getMethod(
      serverURL,
      `tasks/calendar-view?year=${chosenYearForAnnualTasks.value || currentYear}`,
      $q,
      'Задачи успешно получены'
    );

    if (!response || !response.tasks) {
      console.error('Неверный ответ от сервера:', response);
      annualTasks.value = [];
      annualPercentage.value = 0;
      return;
    } else {
      annualTasks.value = response.tasks.filter((task) => task.time_period === 'yearly');

      annualPercentage.value =
        Math.round(
          (annualTasks.value.filter((task) => task.status === 'done').length /
            annualTasks.value.length) *
            100
        ) || 0;
    }
  } catch (err) {
    // console.error("Ошибка при получении annualTasks:", err);
    annualTasks.value = [];
    annualPercentage.value = 0;
  }
};

const searchChosenAnnualTasks = () => {
  if (chosenYearForAnnualTasks.value && chosenYearForAnnualTasks.value.toString().length === 4) {
    getAnnualTasks();
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

const changeTaskStatus = async (taskInfo) => {
  try {
    let status;
    if (taskInfo.status == 'done') {
      status = 'pending';
    } else {
      status = 'done';
    }

    const statusData = {
      status: status,
    };
    console.log(status);

    await patchMethod(serverURL, `tasks/${taskInfo.id}/status`, statusData, $q, {});
  } catch (error) {
    console.error(error);
  }
};

const deleteTask = async (taskInfoId) => {
  try {
    await deleteMethod(serverURL, `tasks`, taskInfoId);
  } catch (error) {
    console.error(error);
  }
};

const taskInformation = ref([]);
const isOpenEditTaskPage = ref(false);

const editTask = async (taskInfo) => {
  taskInformation.value = taskInfo;
  isOpenEditTaskPage.value = true;
};

const closeEditPage = () => {
  isOpenEditTaskPage.value = false;
};

const calendarInitialValue = async () => {
  const initialValue = await getMethod(
    serverURL,
    `tasks/summary?from_date=1800-01-01&to_date=3000-01-01`,
    $q,
    'Задачи успешно получены'
  );

  INITIAL_EVENTS.value = initialValue.tasks.map((task) => ({
    id: task.id,
    title: task.title,
    start: task.target_date.split('T')[0], // "2025-08-12"
    description: task.description,
    status: task.status,
    priority: task.priority,
  }));
};

onMounted(() => {
  getTasksCalendarView();
  getWeekRange();
  getMonthlyTasks();
  getAnnualTasks();
  if (dateFrom.value === null) {
    calendarInitialValue();
  }
});
</script>

<style scoped>
.demo-app {
  display: flex;
  min-height: 100%;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc {
  max-width: 1100px;
  margin: 0 auto;
}

.detailedInfo {
  background-color: #f5f5f5;
  padding: 5px;
  border-radius: 5px;
}
</style>
