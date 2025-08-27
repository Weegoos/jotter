<template>
  <section>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      <Input class="rounded-lg" placeholder="Search"></Input>
      <div class="flex justify-end">
        <!-- <q-icon name="mdi-dots-vertical" size="24px"/> -->
        <Button class="text-black" flat icon="mdi-dots-vertical">
          <q-menu transition-show="scale" transition-hide="scale">
            <q-list style="min-width: 100px">
              <q-item clickable @click="isManageCategoryOpen = true">
                <q-item-section>Manage Category</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Crazy for transitions</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Mind blown</q-item-section>
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
  </section>
</template>

<script setup>
import { Button, Input } from 'src/components/atoms';
import ManageCategory from './ManageCategory.vue';
import { ref } from 'vue';
import TransactionPage from './TransactionPage.vue';

const isManageCategoryOpen = ref(false);
</script>

<style></style>
