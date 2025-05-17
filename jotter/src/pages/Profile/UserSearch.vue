<template>
  <div class="q-ma-md">
    <section>
      <q-input
        v-model="fullname"
        label="Search..."
        @keypress="onEnterPress"
        outlined
        rounded
      >
        <template v-slot:append>
          <q-btn flat round dense icon="mdi-magnify" @click="searchUser" />
        </template>
      </q-input>
    </section>
    <q-table
      class="q-mt-md cursor-pointer"
      bordered
      title="Files"
      :rows="rows"
      :columns="columns"
      row-key="name"
      hide-bottom
    >
      <template v-slot:body-cell-invite="props" >
        <q-td align="center">
          <q-btn
            class="bg-blue-500 hover:bg-blue-600 text-white"
            icon="mdi-account-plus"
            size="sm"
            @click="invite(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/api-method/get";
import { postMethod } from "src/composables/api-method/post";
import { computed, getCurrentInstance, onMounted, ref, watch } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

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
    name: "email",
    label: "Email",
    align: "left",
    field: (row) => row.email,
    sortable: true,
  },
  {
    name: "invite",
    label: "Invite",
    align: "center",
    field: "id",
  },
]);

const getAllUsers = ref([]);
const getUsers = async () => {
  try {
    const response = await getMethod(
      serverURL,
      "user/allUsers",
      $q,
      "Все юзеры получены"
    );
    getAllUsers.value = response;
  } catch (error) {
    console.error(error);
  }
};

const fullname = ref("");
const getAllUsersByInput = ref([])
const getUsersByInput = async () => {
  try {
    const response = await getMethod(
      serverURL,
      `user/allUsersByInput?fullname=${fullname.value}`,
      $q,
      "Получили пользователя"
    );
    console.log(response);
    getAllUsersByInput.value = response
  } catch (error) {
    console.log(error);
  }
};

watch(
  [getAllUsers, getAllUsersByInput],
  ([allUsers, usersByInput]) => {
    rows.value = (usersByInput && usersByInput.length > 0) ? usersByInput : allUsers;
  }
);


const onEnterPress = (e) => {
  if (e.key === "Enter") {
    getUsersByInput();
  }
};

const searchUser = () => {
  getUsersByInput();
};

const invite = async (info) => {
  try {
    console.log(info);
    await postMethod(serverURL, `friend/add?fullname=${info.fullname}`, undefined, $q, 'Запрос отправлен')
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  getUsers();
});
</script>

<style></style>
