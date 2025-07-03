<template>
  <div class="container">
    <section class="wrapper fixed-center">
      <div class="p-[16px]">
        <Icon align="center" />
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
          <Form
            @submit="login"
            @mainButton="login"
            @moveButton="router.push('/register')"
            @additionalButtonClick="authGoogle"
            mainButtonLabel="Sing in"
            moveButtonLabel="Don't have an account? Create here"
            additionalButtonLabel="Sign up with Google Account"
          >
            <Input placeholder="Email address" v-model="email" type="text" />
            <Input
              class="q-mt-sm"
              dense
              outlined
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              placeholder="Password"
            >
              <template #append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </Input>
          </Form>
        </q-card-section>
      </q-card>
    </section>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";
import { Cookies, useQuasar } from "quasar";
import { successMessage } from "src/composables/notify/successMessage";
import axios from "axios";
import { useRouter } from "vue-router";
import { Icon, Input } from "src/components/atoms";
import { Form } from "src/components/molecules";

// global variables
const { proxy } = getCurrentInstance();
const mobileWidth = proxy.$mobileWidth;
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const router = useRouter();

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
    router.push("/");
  } catch (error) {
    console.error(error);
  }
};

const authGoogle = () => {
  window.location.href = "http://localhost:3000/auth/google";
};
</script>
