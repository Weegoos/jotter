<template>
  <div>
    <q-dialog v-model="isBudgetDialog" persistent>
      <q-card>
        <q-card-section class="grid grid-cols-4 gap-4">
          <Input v-model="limit_amount" type="number" placeholder="Limit Amount"></Input>
          <Select :options="months.map((m) => m.name)" v-model="month"></Select>
          <Input v-model="year" mask="####" type="number"></Input>
          <Select :options="categoryOptions" v-model="category"></Select>
        </q-card-section>
        <q-card-actions align="right">
          <Button flat label="Cancel" color="primary" @click="emit('closeBudgetDialog')" />
          <Button color="green" label="Create" @click="createBudget" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { Button, Input, Select } from 'src/components/atoms';
import { getMethod } from 'src/composables/api-method/get';
import { postMethod } from 'src/composables/api-method/post';
import { getCurrentInstance, onMounted, ref, watch } from 'vue';

// global variables
const props = defineProps({
  isOpenBudgetDialog: {
    type: Boolean,
    required: true,
  },
});
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const isBudgetDialog = ref(props.isOpenBudgetDialog);
watch(
  () => props.isOpenBudgetDialog,
  (newVal) => {
    isBudgetDialog.value = newVal;
  }
);

const emit = defineEmits(['closeBudgetDialog']);

const month = ref(null);
const limit_amount = ref(null);
const year = ref(new Date().getFullYear());
const months = [
  {
    name: 'January',
    value: 1,
  },
  {
    name: 'February',
    value: 2,
  },
  {
    name: 'March',
    value: 3,
  },
  {
    name: 'April',
    value: 4,
  },
  {
    name: 'May',
    value: 5,
  },
  {
    name: 'June',
    value: 6,
  },
  {
    name: 'July',
    value: 7,
  },
  {
    name: 'August',
    value: 8,
  },
  {
    name: 'September',
    value: 9,
  },
  {
    name: 'October',
    value: 10,
  },
  {
    name: 'November',
    value: 11,
  },
  {
    name: 'December',
    value: 12,
  },
];

const categoryOptions = ref([]);
const category = ref('Category');
const getCategory = async () => {
  try {
    const response = await getMethod(serverURL, 'categories', $q);
    categoryOptions.value = response.categories.map((category) => ({
      label: category.name,
      id: category.id,
      type: category.type,
    }));

    console.log(categoryOptions.value);
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

const createBudget = async () => {
  try {
    await postMethod(
      serverURL,
      'budget',
      {
        limit_amount: limit_amount.value,
        month: month.value ? months.find((m) => m.name === month.value).value : null,
        year: year.value,
        category_id: category.value.id,
      },
      $q,
      'The budget was successfully created'
    );
  } catch (error) {
    console.error('Error creating budget:', error);
  }
};

onMounted(() => {
  getCategory();
});
</script>

<style></style>
