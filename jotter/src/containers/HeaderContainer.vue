<template>
  <Header
    :header="header"
    :userFullname="userFullname"
    :file="file"
    :document="document"
    :profile="profile"
    @toggleDrawer="toggleDrawer"
  />
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue';
import { useApiStore } from 'src/stores/api-store';
import { useQuasar } from 'quasar';
import { Button, Icon, PopoverItem } from 'src/components/atoms';
import { Header } from 'src/components/organism ';
// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const apiStore = useApiStore();
const $q = useQuasar();

const header = ref(true);
const drawer = ref(false);

const emits = defineEmits(['toggleDrawer']);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
  emits('toggleDrawer', drawer.value);
};

const file = [
  {
    name: 'Create file',
    description: 'Create a new file in the system',
    href: '/create-file',
    icon: 'mdi-file-plus',
  },
  {
    name: 'View file',
    description: 'View an existing file in the system',
    href: '/get-file',
    icon: 'mdi-file-eye',
  },
  {
    name: 'Trash',
    description: 'View deleted files in the system',
    href: '/trash',
    icon: 'mdi-delete-empty',
  },
];

const document = [
  {
    name: 'Create document',
    description: 'Create a new document in the system',
    href: '/create-document',
    icon: 'mdi-file-document-plus',
  },
];

const profile = [
  {
    name: 'Personal data',
    description: 'View your personal information',
    href: '/personal-data',
    icon: 'mdi-account-edit',
  },
  {
    name: 'My publications',
    description: 'Create and manage your documents',
    href: '/publications',
    icon: 'mdi-file-document',
  },
  {
    name: 'User Search',
    description: 'Find and manage user profiles',
    href: '/user-search',
    icon: 'mdi-account-search',
  },
];

const userFullname = ref('');
const getUserInfo = async () => {
  try {
    await apiStore.getUserInfo(serverURL, $q);
    userFullname.value = apiStore.userData.fullname;
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
};

onMounted(() => {
  getUserInfo();
});
</script>

<style></style>
