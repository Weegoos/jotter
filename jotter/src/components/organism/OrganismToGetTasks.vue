<template>
  <div>
    <div>
      <q-card>
        <div class="column">
          <q-list bordered separator class="q-pa-md">
            <slot></slot>
            <p align="right" class="text-h6">
              {{ props.dailyPercent }}{{ props.weeklyPercent }}{{ props.monthlyPercent
              }}{{ annualPercentage }}%
            </p>
            <q-item clickable v-ripple v-for="(task, index) in props.tasks" :key="index">
              <q-item-section>
                <q-item-label :class="task.status === 'done' ? 'text-green' : 'text-orange'">{{
                  task.status
                }}</q-item-label>
                <q-item-label>{{ task.title }}</q-item-label>
                <q-item-label caption lines="2">{{ task.description }}</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-btn
                  flat
                  icon="mdi-dots-horizontal"
                  @click="
                    (e) => {
                      e.stopPropagation();
                    }
                  "
                >
                  <q-menu anchor="bottom right" self="top right">
                    <q-item clickable @click="emit('changeTaskStatus', task)">
                      <q-item-section avatar>
                        <q-icon color="orange" name="mdi-pin" />
                      </q-item-section>
                      <q-item-section>Change the status</q-item-section>
                    </q-item>
                    <q-item clickable @click="emit('edit', task)">
                      <q-item-section avatar>
                        <q-icon color="amber-5" name="mdi-pencil" />
                      </q-item-section>
                      <q-item-section>Edit</q-item-section>
                    </q-item>
                    <q-item clickable @click="emit('deleteTask', task.id)">
                      <q-item-section avatar>
                        <q-icon color="red" name="mdi-delete" />
                      </q-item-section>
                      <q-item-section>Delete</q-item-section>
                    </q-item>
                  </q-menu>
                </q-btn>
                <q-item-label caption>{{ task.priority }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { Button, Input } from '../atoms';

const props = defineProps({
  tasks: {
    type: [Object, Array],
  },
  isInput: Boolean,
  chosenDate: [String, Boolean],
  modelValue: [String, Number],
  dailyPercent: [Number, String],
  weeklyPercent: [Number, String],
  monthlyPercent: [Number, String],
  annualPercentage: [Number, String],
});

const emit = defineEmits([
  'changeTaskStatus',
  'edit',
  'deleteTask',
  'update:modelValue',
  'searchTasks',
  'openCreateWindow',
]);
</script>

<style></style>
