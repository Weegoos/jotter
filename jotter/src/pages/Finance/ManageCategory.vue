<template>
  <section>
    <q-dialog v-model="isOpen" persistent>
      <q-card>
        <q-card-section @keypress.enter="createCategory">
          <Form class="flex flex-row gap-4">
            <Input v-model="name" placeholder="Name"></Input>
            <Select
              v-model="type"
              :placeholder="String('Type')"
              :options="['income', 'expense']"
            ></Select>
            <Button class="text-black" flat icon="mdi-plus" @click="createCategory" />
          </Form>
        </q-card-section>
        <q-card-actions align="right">
          <Button flat label="Close" color="primary" @click="emit('closeManageCategory')" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </section>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { Button, Input, Select } from 'src/components/atoms';
import { Form } from 'src/components/molecules';
import { postMethod } from 'src/composables/api-method/post';
import { getCurrentInstance, ref, watch } from 'vue';

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const props = defineProps({
  isManageCategoryOpen: {
    type: Boolean,
    required: true,
  },
});

const isOpen = ref(props.isManageCategoryOpen);
watch(
  () => props.isManageCategoryOpen,
  (newVal) => {
    isOpen.value = newVal;
  }
);

const emit = defineEmits(['closeManageCategory']);
const type = ref(null);
const name = ref('');
let icon;
const createCategory = async () => {
  try {
    if (type.value === 'income') {
      icon = 'mdi-trending-up';
    } else if (type.value === 'expense') {
      icon = 'mdi-trending-down';
    }
    await postMethod(
      serverURL,
      'categories',
      { name: name.value, type: type.value, icon: icon },
      $q,
      'The category was successfully created'
    );
    name.value = '';
    type.value = null;
  } catch (error) {
    console.error('Error creating category:', error);
  }
};
</script>

<style></style>
