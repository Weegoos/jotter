<template>
  <div class="q-ma-md h-screen">
    <q-tabs v-model="tab" class="text-teal">
      <q-tab name="notifications" icon="mdi-bell" label="Notifications" />
      <q-tab name="friends" icon="mdi-bell" label="Friends" />
    </q-tabs>
    <q-tab-panels
      v-model="tab"
      animated
      swipeable
      vertical
      transition-prev="jump-up"
      transition-next="jump-up"
    >
      <q-tab-panel name="notifications">
        <NotificationsOrganisims />
      </q-tab-panel>
      <q-tab-panel name="friends"> <FriendsPage /> </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup>
import FriendsPage from "src/components/organisims/FriendsPage.vue";
import NotificationsOrganisims from "src/components/organisims/NotificationsOrganisims.vue";
import { ref } from "vue";

const tab = ref("notifications");
</script>

<style></style>
