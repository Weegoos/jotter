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
import { getCurrentInstance, ref, watch, defineEmits } from "vue";
const props = defineProps({
  variableName: {
    type: Array,
    required: true,
  },
});
const { proxy } = getCurrentInstance();
const maxNumberOfRequestPerPage = proxy.$maxNumberOfRequestPerPage;

const current = ref(1);
const maxPage = ref('');

watch(
  () => props.variableName,
  (newVal) => {
    if (newVal && newVal.totalCount) {
      maxPage.value = Math.ceil(newVal.totalCount / maxNumberOfRequestPerPage);
    } else {
      maxPage.value = 1;
    }
  }
);

const emit = defineEmits(["pagination"]);
watch(current, (newPage) => {
  emit("pagination", newPage);
});
</script>

<style></style>
