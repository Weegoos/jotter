<template>
  <section>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      <Input class="rounded-lg" placeholder="Search"></Input>
      <div class="flex justify-end">
        <!-- <q-icon name="mdi-dots-vertical" size="24px"/> -->
        <Button class="text-black" flat icon="mdi-dots-vertical">
          <q-menu anchor="bottom left" class="w-40" transition-show="scale" transition-hide="scale">
            <q-list style="min-width: 100px">
              <q-item clickable @click="isManageCategoryOpen = true">
                <q-item-section avatar>
                  <q-icon color="black" name="mdi-credit-card-outline" />
                </q-item-section>
                <q-item-section>Category</q-item-section>
              </q-item>
              <q-item clickable @click="isManageGoalOpen = true">
                <q-item-section avatar>
                  <q-icon color="black" name="mdi-trending-up" />
                </q-item-section>
                <q-item-section>Goals</q-item-section>
              </q-item>
              <q-item clickable @click="isOpenBudgetDialog = true">
                <q-item-section avatar>
                  <q-icon color="black" name="mdi-cash-multiple" />
                </q-item-section>
                <q-item-section>Budget</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </Button>
      </div>
    </div>
    <ManageCategory
      :isManageCategoryOpen="isManageCategoryOpen"
      @closeManageCategory="isManageCategoryOpen = false"
    />
    <TransactionPage class="q-ma-md" />
    <ManageGoal :isManageGoalOpen="isManageGoalOpen" @closeDialog="isManageGoalOpen = false" />
    <ManageBudget
      :isOpenBudgetDialog="isOpenBudgetDialog"
      @closeBudgetDialog="isOpenBudgetDialog = false"
    />
  </section>
</template>

<script setup>
import { Button, Input } from 'src/components/atoms';
import ManageCategory from './TransactionComponent/ManageCategory.vue';
import { ref } from 'vue';
import TransactionPage from './TransactionPage.vue';
import ManageGoal from './TransactionComponent/ManageGoal.vue';
import ManageBudget from './TransactionComponent/ManageBudget.vue';

const isManageCategoryOpen = ref(false);
const isManageGoalOpen = ref(false);
const isOpenBudgetDialog = ref(false);
</script>

<style></style>
