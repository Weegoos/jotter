<template>
  <div>
    <q-pagination
      class="justify-center"
      v-model="current"
      :min="1"
      :max="maxPage"
    />
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, watch, watchEffect } from "vue";
const props = defineProps({
  variableName: {
    type: Object,
    required: true,
  },
});
const { proxy } = getCurrentInstance();
const maxNumberOfRequestPerPage = proxy.$maxNumberOfRequestPerPage;

const current = ref(1);
const maxPage = ref("");

watchEffect(() => {
  if (props.variableName && props.variableName.totalCount) {
    maxPage.value = Math.ceil(
      props.variableName.totalCount / maxNumberOfRequestPerPage
    );
  } else {
    maxPage.value = 1;
  }
});

const emit = defineEmits(["pagination"]);
watch(current, (newPage) => {
  emit("pagination", newPage);
});
</script>

<style></style>
