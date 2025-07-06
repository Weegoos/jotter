<template>
  <div>
    <q-header v-model="header" reveal elevated class="bg-white p-4 text-black">
      <div class="grid grid-rows-1 gap-4" :class="userFullname ? 'grid-cols-3' : 'grid-cols-2'">
        <section>
          <Icon @click="toggleDrawer" />
        </section>
        <nav
          v-if="userFullname"
          align="left"
          :class="$q.screen.width < mobileWidth ? 'hidden' : 'row'"
        >
          <PopoverItem :item="file" :title="'File'" />
          <PopoverItem :item="document" :title="'Document'" />
          <PopoverItem :item="profile" :title="'Profile'" />
        </nav>
        <div
          align="right"
          v-if="!userFullname"
          :class="$q.screen.width < mobileWidth ? 'hidden' : ''"
        >
          <Button
            class="rounded-full q-mr-sm"
            color="black"
            no-caps
            label="Register"
            icon-right="mdi-arrow-right"
            @emitClick="$router.push('/register')"
          />
          <Button
            class="rounded-full"
            color="black"
            no-caps
            label="Log in"
            icon-right="mdi-login"
            @emitClick="$router.push('/login')"
          />
        </div>
      </div>
    </q-header>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue';
import { useApiStore } from 'src/stores/api-store';
import { useQuasar } from 'quasar';
import { Button, Icon, PopoverItem } from 'src/components/atoms';
// global variables
const { proxy } = getCurrentInstance();
const mobileWidth = proxy.$mobileWidth;
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
