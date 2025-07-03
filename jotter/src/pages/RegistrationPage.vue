<template>
  <div class="container">
    <section class="wrapper fixed-center">
      <div class="p-[16px]">
        <Icon align="center" />
        <p
          class="flex justify-center text-bold font-medium p-[16px]"
          :class="$q.screen.width < mobileWidth ? 'text-xl' : 'text-2xl'"
        >
          Create your account
        </p>
      </div>
      <q-card
        class="p-[24px]"
        :class="$q.screen.width < mobileWidth ? 'w-[300px]' : 'w-[400px]'"
        bordered
      >
        <q-card-section>
          <Form
            @submit="register"
            @mainButton="register"
            @moveButton="router.push('/login')"
            @additionalButtonClick="authGoogle"
            mainButtonLabel="Create account"
            moveButtonLabel="Do you have an account? Log in"
            additionalButtonLabel="Create with Google Account"
            mainButtonClass="bg-violet-700 text-white q-mt-sm w-[100%]"
            moveButtonClass="text-black w-[100%] q-mt-sm"
            additionalButtonClass="q-mt-sm w-[100%] text-black"
          >
            <Input
              placeholder="Full Name"
              dense
              outlined
              v-model="fullname"
              class="q-mt-sm"
              type="text"
            />
            <Input
              placeholder="Email address"
              dense
              outlined
              v-model="email"
              class="q-mt-sm"
              type="text"
            />
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
import { useQuasar } from "quasar";
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

const fullname = ref("");
const password = ref("");
const email = ref("");
const isPwd = ref(true);

const register = async () => {
  try {
    const response = await axios.post(`${serverURL}user/register`, {
      fullname: fullname.value,
      email: email.value,
      password: password.value,
    });
    successMessage($q, `${response.data.user.fullname} добро пожаловать`);
    router.push("/login");
  } catch (error) {
    console.error(error);
  }
};

const authGoogle = () => {
  window.location.href = `${serverURL}auth/google`;
};
</script>
