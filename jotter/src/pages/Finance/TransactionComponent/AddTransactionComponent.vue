<template>
  <div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="grid grid-cols-4 gap-4">
          <Input v-model="amount" placeholder="Amount"></Input>
          <Select v-model="category" :options="categoryOptions" placeholder="Category"></Select>
          <Input v-model="description" placeholder="Description"></Input>
          <Input v-model="source" placeholder="Source"></Input>
        </q-card-section>
        <q-card-actions align="right">
          <Button label="Cancel" color="red" @click="emit('closeCreateTransactionDialog')" />
          <Button color="primary" label="Create" @click="createTransaction"></Button>
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
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const props = defineProps({
  openCreateTransactionDialog: {
    type: Boolean,
    required: true,
  },
});

watch(
  () => props.openCreateTransactionDialog,
  (newVal) => {
    confirm.value = newVal;
  }
);

const confirm = ref(props.openCreateTransactionDialog);
const emit = defineEmits(['closeCreateTransactionDialog']);
const category = ref('Category');
const categoryOptions = ref([]);
const amount = ref('');
const description = ref('');
const source = ref('');

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

const createTransaction = async () => {
  try {
    await postMethod(
      serverURL,
      'transactions',
      {
        amount: amount.value,
        type: category.value.type,
        description: description.value,
        source: source.value,
        category_id: category.value.id,
        date: new Date().toISOString(),
      },
      $q,
      'The transaction was successfully created'
    );
  } catch (error) {
    console.error('Error creating transaction:', error);
  }
};

onMounted(() => {
  getCategory();
});
</script>

<style></style>
