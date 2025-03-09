<template>
  <div
    class="fixed-center"
    style="display: flex; height: 100vh; width: 100vw"
    @keydown="handleKey"
  >
    <!-- Левая половина с видео -->
    <div style="flex: 1; position: relative; overflow: hidden">
      <video
        src="../assets/video/background.mp4"
        autoplay
        muted
        loop
        playsinline
        style="width: 100%; height: 100%; object-fit: cover"
      ></video>
      <!-- Надпись -->
      <div class="carouselClass">
        <q-carousel
          v-model="slide"
          transition-prev="scale"
          transition-next="scale"
          swipeable
          animated
          control-color="white"
          navigation
          padding
          arrows
          height="300px"
          class="transparent-carousel text-white shadow-1 rounded-borders"
        >
          <q-carousel-slide name="style" class="column no-wrap flex-center">
            <p class="text-h5 text-bold">Пароль</p>
            <div class="q-mt-md text-center">
              Пароль должен состоять из 6 символов с специальными символами
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="tv" class="column no-wrap flex-center">
            <p class="text-h5 text-bold">Почта</p>
            <div class="q-mt-md text-center">
              В почте обязательно должен присутствовать специальный символ "@".
              Убедитесь, что вы ввели правильный и рабочий адрес электронной
              почты
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>

    <!-- Правая половина с текстом -->
    <div class="content">
      <q-card class="my-card" style="width: 90%">
        <q-card-section align="center">
          <p class="text-h5">Регистрация</p>
        </q-card-section>
        <q-card-section>
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input
                v-model="fullname"
                type="text"
                label="Введите ФИО"
                hint="Например: Айсултан Хаббасов Нурланович"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input
                v-model="email"
                type="email"
                label="Введите почту"
                hint="Например: example@gmail.com"
              />
            </div>
            <div class="col">
              <q-input
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                hint="Не менее 6 символов"
                label="Введите пароль"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
        <q-card-actions vertical>
          <q-btn
            color="positive"
            no-caps
            label="Зарегистрироваться"
            @click="createUser"
          />
          <q-btn
            color="primary"
            no-caps
            flat
            label="Есть аккаунт? Войти"
            @click="pushToAuthorization"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { postMethod } from "src/composables/api/postApi";
import { getCurrentInstance, onBeforeMount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const router = useRouter();

const slide = ref("style");
const slides = ["style", "tv"];
let slideIndex = 0;
let interval = null;

const fullname = ref("");
const email = ref("");
const password = ref("");
const isPwd = ref(true);

const createUser = async () => {
  const userData = {
    fullname: fullname?.value?.trim() || "",
    email: email?.value?.trim() || "",
    password: password?.value || "",
  };
  await postMethod(serverURL, "user/register", userData, $q);
};

const pushToAuthorization = () => {
  router.push("/login");
};

onMounted(() => {
  interval = setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    slide.value = slides[slideIndex];
  }, 5500);
});

onBeforeMount(() => {
  clearInterval(interval);
});
</script>

<style scoped>
.carouselClass {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  justify-content: center;
  align-items: center;
}

.transparent-carousel {
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: none;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
