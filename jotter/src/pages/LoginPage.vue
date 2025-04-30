<template>
  <div class="container">
    <section class="wrapper fixed-center">
      <div class="p-[16px]">
        <BaseIcon align="center" />
        <p
          class="flex justify-center text-bold font-medium p-[16px]"
          :class="$q.screen.width < mobileWidth ? 'text-xl' : 'text-2xl'"
        >
          Sign in to your account
        </p>
      </div>
      <q-card
        class="p-[24px]"
        :class="$q.screen.width < mobileWidth ? 'w-[300px]' : 'w-[400px]'"
        bordered
      >
        <q-card-section>
          <p class="text-1md">Email address</p>
          <q-input class="q-mt-sm" dense outlined v-model="email" type="text" />
          <p class="text-1md q-mt-lg">Password</p>
          <q-input
            class="q-mt-sm"
            dense
            outlined
            v-model="password"
            type="password"
          />
        </q-card-section>
        <q-card-actions>
          <q-btn
            class="bg-violet-700 text-white w-[100%]"
            no-caps
            label="Sign in"
            @click="login"
          />
        </q-card-actions>
      </q-card>
    </section>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";
import BaseIcon from "../components/atoms/BaseIcon.vue";
import { useQuasar } from "quasar";
import { successMessage } from "src/composables/notify/successMessage";

// global variables
const { proxy } = getCurrentInstance();
const mobileWidth = proxy.$mobileWidth;
const $q = useQuasar();

const password = ref("");
const email = ref("");
const login = () => {
  try {
  } catch (error) {
    console.error(error);
  }
};
</script>

<style></style>
