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
            <Button class="text-black" icon="mdi-plus" @click="createCategory" />
          </Form>
        </q-card-section>
        <q-card-section>
          <q-list bordered class="mb-[3px]" v-for="(category, index) in categories" :key="index">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="primary" :name="category.icon" />
              </q-item-section>
              <q-item-section>{{ category.name }}</q-item-section>
              <q-item-section avatar class="flex justify-end">
                <Button class="text-black" dense flat icon="mdi-dots-vertical">
                  <q-menu>
                    <q-list style="min-width: 100px">
                      <!-- <q-item clickable v-close-popup>
                        <q-item-section avatar>
                          <q-icon color="orange" name="mdi-pencil" />
                        </q-item-section>
                        <q-item-section>Edit</q-item-section>
                      </q-item> -->
                      <q-separator />
                      <q-item clickable @click="deleteCategory(category.id)">
                        <q-item-section avatar>
                          <q-icon color="red" name="mdi-delete" />
                        </q-item-section>
                        <q-item-section>Delete</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </Button>
              </q-item-section>
            </q-item>
          </q-list>
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
import { deleteMethod } from 'src/composables/api-method/delete';
import { getMethod } from 'src/composables/api-method/get';
import { postMethod } from 'src/composables/api-method/post';
import { useWebSocket } from 'src/composables/javascript-function/websocket';
import { getCurrentInstance, onMounted, ref, watch } from 'vue';

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
const webSocketURL = proxy.$webSocketURL;
const socket = new WebSocket(webSocketURL);

useWebSocket(webSocketURL);

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const updateEvents = ['categoryCreated', 'deletedCategory'];

  if (updateEvents.includes(data.event)) {
    getCategories();
  }
};

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

const categories = ref([]);
const getCategories = async () => {
  try {
    const response = await getMethod(serverURL, 'categories', $q);
    categories.value = response.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

onMounted(() => {
  getCategories();
});

const deleteCategory = async (id) => {
  try {
    await deleteMethod(serverURL, `categories`, id);
  } catch (error) {
    console.error('Error deleting category:', error);
  }
};
</script>

<style></style>
