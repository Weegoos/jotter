<template>
  <div>
    <q-card
      class="grid grid-cols-2"
      v-for="(friend, index) in pendingFriends"
      :key="index"
    >
      <q-card-section>
        <div class="text-body1">
          <span class="text-bold cursor-pointer">{{ friend.fullname }}</span>
          wants to add you as a friend
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          icon="mdi-thumb-up"
          color="primary"
          @click="acceptFriend(friend)"
        />
        <q-btn
          icon="mdi-thumb-down"
          color="red-4"
          @click="rejectFriend(friend)"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/api-method/get";
import { putMethod } from "src/composables/api-method/put";
import { getCurrentInstance, onMounted, ref } from "vue";
// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const pending = proxy.$pending;
const accepted = proxy.$accepted;
const rejected = proxy.$rejected;
const webSocketURL = proxy.$webSocketURL;
const socket = new WebSocket(webSocketURL);

socket.onopen = () => {
  console.log("✅ WebSocket подключен");
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.event === "new_friend") {
    getPendingFriend();
  }
  if (data.event === "changeFriendStatus") {
    getPendingFriend();
  }
};

socket.onclose = () => {
  console.log("❌ WebSocket отключен");
};

socket.onerror = (error) => {
  console.error("🔥 WebSocket ошибка:", error);
};

const $q = useQuasar();

const pendingFriends = ref([]);
const getPendingFriend = async () => {
  try {
    const response = await getMethod(
      serverURL,
      `friend/getByStatus?status=${pending}`,
      $q,
      "Запросы на друзья получены"
    );
    console.log(response.friends);
    pendingFriends.value = response.friends;
  } catch (error) {
    console.error(error);
  }
};

const acceptFriend = async (friend) => {
  try {
    console.log(friend);
    await putMethod(
      serverURL,
      `friend/changeStatus?friendId=${friend.friendId}&status=${accepted}`,
      undefined,
      $q,
      "Пользователь добавлен в друзья",
      "Error: ",
      {}
    );
  } catch (error) {
    console.error(error);
  }
};

const rejectFriend = async (friend) => {
  try {
    console.log(friend);
    await putMethod(
      serverURL,
      `friend/changeStatus?friendId=${friend.friendId}&status=${rejected}`,
      undefined,
      $q,
      "Пользователь добавлен в друзья",
      "Error: ",
      {}
    );
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getPendingFriend();
});
</script>

<style></style>
