<template>
  <section>
    <q-form
      @submit.prevent="emit('submit')"
      @reset="emit('reset')"
      class="q-gutter-m"
    >
      <slot />

      <q-btn
        class="bg-violet-700 text-white w-[100%]"
        no-caps
        label="Sign in"
        @click="login"
      />
      <q-btn
        class="text-black w-[100%] q-mt-sm"
        no-caps
        label="Don't have an account? Create here"
        @click="$router.push('/register')"
      />
      <q-btn
        icon="mdi-google"
        no-caps
        label="Sign up with Google Account"
        @click="authGoogle"
        class="q-mt-sm w-[100%]"
      />
    </q-form>
  </section>
</template>

<script setup>
const emit = defineEmits(["submit", "reset"]);
</script>

<style></style>
