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
  </section>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { getMethod } from 'src/composables/api-method/get';
import { getCurrentInstance, onMounted, ref } from 'vue';

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const tab = ref('dailyTasks');

const tasks = ref([]);
const getTasksCalendarView = async () => {
  try {
    const response = await getMethod(
      serverURL,
      `tasks/calendar-view?target_date=2025-08-31`,
      $q,
      'Задачи успешно получены'
    );
    tasks.value = response.tasks;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getTasksCalendarView();
});
</script>

<style></style>
