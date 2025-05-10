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
        @keypress="
          (e) => {
            if (e.key === 'Enter') {
              login();
            }
          }
        "
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
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              /> </template
          ></q-input>
        </q-card-section>
        <q-card-actions>
          <q-btn
            class="bg-violet-700 text-white w-[100%]"
            no-caps
            label="Sign in"
            @click="login"
          />
          <q-btn
            icon="mdi-google"
            no-caps
            label="Sign up with Google Account"
            @click="authGoogle"
            class="q-mt-sm w-[100%]"
          />
        </q-card-actions>
      </q-card>
    </section>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";
import BaseIcon from "../components/atoms/BaseIcon.vue";
import { Cookies, useQuasar } from "quasar";
import { successMessage } from "src/composables/notify/successMessage";
import axios from "axios";

// global variables
const { proxy } = getCurrentInstance();
const mobileWidth = proxy.$mobileWidth;
const $q = useQuasar();
const serverURL = proxy.$serverURL;

const password = ref("");
const email = ref("");
const isPwd = ref(true);
const login = async () => {
  try {
    const response = await axios.post(`${serverURL}user/login`, {
      email: email.value,
      password: password.value,
    });
    successMessage($q, `Добро пожаловать, ${response.data.user.fullname}`);
    Cookies.set("access_token", response.data.token);
  } catch (error) {
    console.error(error);
  }
};

const authGoogle = () => {
  window.location.href = "http://localhost:3000/auth/google";
};
</script>

<style></style>
