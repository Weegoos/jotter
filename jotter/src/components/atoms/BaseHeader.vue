<template>
  <div>
    <q-header v-model="header" reveal elevated class="bg-white p-4 text-black">
      <div
        class="grid grid-rows-1 gap-4"
        :class="userFullname ? 'grid-cols-3' : 'grid-cols-2'"
      >
        <div>
          <BaseIcon @click="toggleDrawer" />
        </div>
        <div
          v-if="userFullname"
          align="left"
          :class="$q.screen.width < mobileWidth ? 'hidden' : 'row'"
        >
          <Popover v-slot="{ open }" class="relative cursor-pointer">
            <PopoverButton
              :class="open ? 'text-black' : 'text-black/90'"
              class="group inline-flex items-center rounded-md px-3 py-2 text-base font-medium focus:outline-none focus-visible:ring-2 hover:bg-gray-100 transition-all duration-300 ease-in-out"
            >
              <span>File</span>
              <ChevronDownIcon
                :class="open ? 'text-black' : 'text-black'"
                class="ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-orange-300/80"
                aria-hidden="true"
              />
            </PopoverButton>

            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="translate-y-1 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="translate-y-1 opacity-0"
            >
              <PopoverPanel
                class="absolute left-1/3 z-10 mt-3 w-[350px] max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl"
              >
                <div
                  class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5"
                >
                  <div class="relative grid gap-8 bg-white p-7 lg:grid-cols-1">
                    <a
                      v-for="item in file"
                      :key="item.name"
                      @click="$router.push(item.href)"
                      class="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                    >
                      <div
                        class="flex h-10 w-10 shrink-0 items-center justify-centersm:h-12 sm:w-12"
                      >
                        <q-icon :name="item.icon" size="30px" />
                      </div>
                      <div class="ml-4">
                        <p class="text-sm font-medium text-gray-900">
                          {{ item.name }}
                        </p>
                        <p class="text-sm text-gray-500">
                          {{ item.description }}
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
          <Popover v-slot="{ open }" class="relative cursor-pointer">
            <PopoverButton
              :class="open ? 'text-black' : 'text-black/90'"
              class="group inline-flex items-center rounded-md px-3 py-2 text-base font-medium focus:outline-none focus-visible:ring-2 hover:bg-gray-100 transition-all duration-300 ease-in-out"
            >
              <span>Document</span>
              <ChevronDownIcon
                :class="open ? 'text-black' : 'text-black'"
                class="ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-orange-300/80"
                aria-hidden="true"
              />
            </PopoverButton>

            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="translate-y-1 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="translate-y-1 opacity-0"
            >
              <PopoverPanel
                class="absolute left-1/3 z-10 mt-3 w-[350px] max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl"
              >
                <div
                  class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5"
                >
                  <div class="relative grid gap-8 bg-white p-7 lg:grid-cols-1">
                    <a
                      v-for="item in document"
                      :key="item.name"
                      @click="$router.push(item.href)"
                      class="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                    >
                      <div
                        class="flex h-10 w-10 shrink-0 items-center justify-centersm:h-12 sm:w-12"
                      >
                        <q-icon :name="item.icon" size="30px" />
                      </div>
                      <div class="ml-4">
                        <p class="text-sm font-medium text-gray-900">
                          {{ item.name }}
                        </p>
                        <p class="text-sm text-gray-500">
                          {{ item.description }}
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
          <Popover v-slot="{ open }" class="relative cursor-pointer">
            <PopoverButton
              :class="open ? 'text-black' : 'text-black/90'"
              class="group inline-flex items-center rounded-md px-3 py-2 text-base font-medium focus:outline-none focus-visible:ring-2 hover:bg-gray-100 transition-all duration-300 ease-in-out"
            >
              <span>Profile</span>
              <ChevronDownIcon
                :class="open ? 'text-black' : 'text-black'"
                class="ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-orange-300/80"
                aria-hidden="true"
              />
            </PopoverButton>

            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="translate-y-1 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="translate-y-1 opacity-0"
            >
              <PopoverPanel
                class="absolute left-1/3 z-10 mt-3 w-[350px] max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl"
              >
                <div
                  class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5"
                >
                  <div class="relative grid gap-8 bg-white p-7 lg:grid-cols-1">
                    <a
                      v-for="item in profile"
                      :key="item.name"
                      @click="$router.push(item.href)"
                      class="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                    >
                      <div
                        class="flex h-10 w-10 shrink-0 items-center justify-centersm:h-12 sm:w-12"
                      >
                        <q-icon :name="item.icon" size="30px" />
                      </div>
                      <div class="ml-4">
                        <p class="text-sm font-medium text-gray-900">
                          {{ item.name }}
                        </p>
                        <p class="text-sm text-gray-500">
                          {{ item.description }}
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
        </div>
        <div
          align="right"
          v-if="!userFullname"
          :class="$q.screen.width < mobileWidth ? 'hidden' : ''"
        >
          <q-btn
            class="rounded-full q-mr-sm"
            color="black"
            no-caps
            label="Register"
            icon-right="mdi-arrow-right"
            @click="$router.push('/register')"
          />
          <q-btn
            class="rounded-full"
            color="black"
            no-caps
            label="Log in"
            icon-right="mdi-login"
            @click="$router.push('/login')"
          />
        </div>
      </div>
    </q-header>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { useApiStore } from "src/stores/api-store";
import { useQuasar } from "quasar";
import BaseIcon from "./BaseIcon.vue";
// global variables
const { proxy } = getCurrentInstance();
const mobileWidth = proxy.$mobileWidth;
const serverURL = proxy.$serverURL;
const apiStore = useApiStore();
const $q = useQuasar();

const header = ref(true);
const drawer = ref(false);

const emits = defineEmits(["toggleDrawer"]);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
  emits("toggleDrawer", drawer.value);
};

const file = [
  {
    name: "Create file",
    description: "Create a new file in the system",
    href: "/create-file",
    icon: "mdi-file-plus",
  },
  {
    name: "View file",
    description: "View an existing file in the system",
    href: "/get-file",
    icon: "mdi-file-eye",
  },
  {
    name: "Trash",
    description: "View deleted files in the system",
    href: "/trash",
    icon: "mdi-delete-empty",
  },
];

const document = [
  {
    name: "Create document",
    description: "Create a new document in the system",
    href: "/create-document",
    icon: "mdi-file-document-plus",
  },
];

const profile = [
  {
    name: "Personal data",
    description: "View your personal information",
    href: "/personal-data",
    icon: "mdi-account-edit",
  },
  {
    name: "My publications",
    description: "Create and manage your documents",
    href: "/publications",
    icon: "mdi-file-document",
  },
  {
    name: "User Search",
    description: "Find and manage user profiles",
    href: "/user-search",
    icon: "mdi-account-search",
  },
];

const userFullname = ref("");
const getUserInfo = async () => {
  try {
    await apiStore.getUserInfo(serverURL, $q);
    userFullname.value = apiStore.userData.fullname;
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};

onMounted(() => {
  getUserInfo();
});
</script>

<style></style>
