<template>
  <section>
    <q-form
      @submit.prevent="emit('submit')"
      @reset="emit('reset')"
      class="q-gutter-m"
    >
      <slot />

      <div style="display: none">
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </section>
</template>

<script setup>
const emit = defineEmits(["submit", "reset"]);
</script>

<style></style>
