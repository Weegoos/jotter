<template>
  <div>
    <q-table
      class="m-[8px]"
      bordered
      title="Friends"
      :rows="rows"
      :columns="columns"
      row-key="name"
      hide-bottom
    >
      <template v-slot:body-cell-delete="props">
        <q-td align="center">
          <q-btn
            class="bg-rose-500 hover:bg-rose-600 text-white"
            icon="mdi-delete"
            size="sm"
            @click="deleteFromFriends(props.row, $event)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { deleteMethod } from "src/composables/api-method/delete";
import { getMethod } from "src/composables/api-method/get";
import { computed, getCurrentInstance, onMounted, ref } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const accepted = proxy.$accepted;
const webSocketURL = proxy.$webSocketURL;
const socket = new WebSocket(webSocketURL);
const $q = useQuasar();

socket.onopen = () => {
  console.log("✅ WebSocket подключен");
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.event === "new_friend") {
    getFriends();
  }
  if (data.event === "deleteFromFriend") {
    getFriends();
  }
};

socket.onclose = () => {
  console.log("❌ WebSocket отключен");
};

socket.onerror = (error) => {
  console.error("🔥 WebSocket ошибка:", error);
};

const rows = ref([]);
const columns = computed(() => [
  {
    name: "fullname",
    label: "Full Name",
    align: "left",
    field: (row) => row.fullname,
    sortable: true,
  },
  {
    name: "delete",
    label: "Delete",
    align: "center",
    field: "id",
  },
]);

const friends = ref([]);
const getFriends = async () => {
  try {
    const response = await getMethod(
      serverURL,
      `friend/getByStatus?status=${accepted}`,
      $q,
      "Друзья получены"
    );
    console.log(response.friends);
    rows.value = response.friends;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getFriends();
});

const deleteFromFriends = async (info) => {
  console.log(info);
  try {
    await deleteMethod(
      serverURL,
      `friend`,
      `deleteById?friendId=${info.friendId}`
    );
  } catch (error) {
    console.error(error);
  }
};
</script>

<style></style>
