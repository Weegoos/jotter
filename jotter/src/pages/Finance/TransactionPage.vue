<template>
  <div>
    <q-card class="my-card">
      <q-card-section class="grid grid-cols-2">
        <section>
          <div class="text-h6">Total balance</div>
          <div class="text-subtitle2">$320.000</div>
        </section>
        <div class="flex justify-end items-center">
          <Button class="text-white button rounded-full p-[10px] w-[150px]" icon="mdi-plus">Add payment</Button>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="q-mt-md">
      <q-table
      title="Transaction Overview"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
    </q-card>
  </div>
</template>

<script setup>
import { Button } from 'src/components/atoms';
import { ref } from 'vue';

const columns = [
  {
    name: 'amount',
    required: true,
    label: 'Amount',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'type', align: 'center', label: 'Type', field: 'calories', sortable: true },
  { name: 'source', label: 'Source', field: 'fat', sortable: true },
  { name: 'category', label: 'Category', field: 'carbs' },
  { name: 'date', label: 'Date', field: 'protein' },
  { name: 'updated', label: 'Updated', field: 'sodium' },
]

const rows = ref([])


</script>

<style lang="sass" scoped>
$button-color: #5049f5

.button
  background-color: $button-color
  &:hover
    background-color: darken($button-color, 10%)
</style>
