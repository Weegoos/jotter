<template>
  <Header
    v-if="userFullname != null"
    :header="header"
    :userFullname="userFullname"
    @toggleDrawer="toggleDrawer"
  />
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue';
import { useApiStore } from 'src/stores/api-store';
import { useQuasar } from 'quasar';
import { Button, Icon, PopoverItem } from 'src/components/atoms';
import { Header } from 'src/components/organism ';
import { useRouter } from 'vue-router';
// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const apiStore = useApiStore();
const $q = useQuasar();
const router = useRouter();

const header = ref(true);
const drawer = ref(false);

const emits = defineEmits(['toggleDrawer']);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
  emits('toggleDrawer', drawer.value);
};

const userFullname = ref('');
const getUserInfo = async () => {
  try {
    await apiStore.getUserInfo(serverURL, $q);
    userFullname.value = apiStore.userData.fullname;
  } catch (error) {
    console.error('Error fetching user info:', error);
    router.push('/register');
  }
};

onMounted(() => {
  getUserInfo();
});
</script>

<style></style>
