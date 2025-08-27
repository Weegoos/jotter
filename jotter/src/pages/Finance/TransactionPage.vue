<template>
  <div>
    <q-card class="my-card">
      <q-card-section class="grid grid-cols-2">
        <section>
          <div class="text-h6">Total balance</div>
          <div class="text-subtitle2">
            {{
              rows.reduce((total, row) => {
                const amount = Number(row.amount) || 0;
                return row.type === 'income' ? total + amount : total - amount;
              }, 0)
            }}
            tg
          </div>
        </section>
        <div class="flex justify-end items-center">
          <Button
            @click="openCreateTransactionDialog = true"
            class="text-white button rounded-full p-[10px] w-[150px]"
            icon="mdi-plus"
            >Add payment</Button
          >
        </div>
      </q-card-section>
    </q-card>
    <!-- <q-card class="q-mt-md"> -->
    <q-scroll-area style="height: 75vh" class="q-mt-md">
      <q-table
        title="Transaction Overview"
        :rows="rows"
        :columns="columns"
        row-key="name"
        virtual-scroll
        :virtual-scroll-item-size="20"
        :virtual-scroll-sticky-size-start="20"
        :rows-per-page-options="[0]"
        @virtual-scroll="onScroll"
        :loading="loading"
      >
        <template v-slot:body-cell-delete="props">
          <q-td align="center">
            <q-btn
              color="red"
              flat
              dense
              icon="mdi-delete"
              @click="console.log(deleteMethod(serverURL, 'transactions', props.row.id))"
            />
          </q-td>
        </template>
      </q-table>
    </q-scroll-area>
    <!-- </q-card> -->
    <AddTransactionComponent
      :openCreateTransactionDialog="openCreateTransactionDialog"
      @closeCreateTransactionDialog="openCreateTransactionDialog = false"
    />
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { Button } from 'src/components/atoms';
import { getMethod } from 'src/composables/api-method/get';
import { useDateFormat } from 'src/composables/javascript-function/formatDate';
import { useWebSocket } from 'src/composables/javascript-function/websocket';
import { getCurrentInstance, onMounted, ref } from 'vue';
import AddTransactionComponent from './TransactionComponent/AddTransactionComponent.vue';
import { deleteMethod } from 'src/composables/api-method/delete';
// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const webSocketURL = proxy.$webSocketURL;
const socket = new WebSocket(webSocketURL);

useWebSocket(webSocketURL);

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const updateEvents = ['new_transaction', 'deletedTransaction'];

  if (updateEvents.includes(data.event)) {
    getTransactions();
  }
};

const pageSize = 20;
const openCreateTransactionDialog = ref(false);

const columns = [
  {
    name: 'amount',
    required: true,
    label: 'Amount',
    align: 'left',
    field: 'amount',
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: 'type', align: 'center', label: 'Type', field: 'type', sortable: true },
  { name: 'source', label: 'Source', field: 'source', sortable: true, align: 'center' },
  {
    name: 'category',
    label: 'Category',
    field: (row) => (row.Category ? row.Category.name : 'Uncategorized'),
    sortable: true,
    align: 'center',
  },
  {
    name: 'created',
    label: 'Created',
    field: (row) => (row.createdAt ? useDateFormat(row.createdAt, 'YYYY-MM-DD HH:mm:ss') : ''),
    align: 'center',
  },
  {
    name: 'updated',
    label: 'Updated',
    field: (row) => (row.createdAt ? useDateFormat(row.updatedAt, 'YYYY-MM-DD HH:mm:ss') : ''),
    align: 'center',
  },
  {
    label: 'Delete',
    name: 'delete',
    field: 'delete',
    align: 'center',
  },
];

const rows = ref([]);
const lastPage = Math.ceil(rows.value.length / pageSize);
const nextPage = ref(2);
const loading = ref(false);
const getTransactions = async () => {
  try {
    const response = await getMethod(serverURL, 'transactions', $q);
    console.log(response.transactions);
    rows.value = response.transactions;
  } catch (error) {
    console.error(error);
  }
};

const onScroll = ({ to, ref }) => {
  const lastIndex = rows.value.length - 1;

  if (!loading.value && nextPage.value < lastPage.value && to === lastIndex) {
    loading.value = true;

    setTimeout(() => {
      nextPage.value++;
      nextTick(() => {
        ref.refresh();
        loading.value = false;
      });
    }, 500);
  }
};
onMounted(() => {
  getTransactions();
});
</script>

<style lang="sass" scoped>
$button-color: #5049f5

.button
  background-color: $button-color
  &:hover
    background-color: darken($button-color, 10%)
</style>
