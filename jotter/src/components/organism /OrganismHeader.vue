<template>
  <!-- <q-layout view="lhh LpR lFf" container style="height: 100vh"> -->
  <q-header
    data-testid="main-header"
    :model-value="headerValue"
    @update:model-value="updateHeader"
    class="bg-white p-4 text-black"
  >
    <Drawer :fullname="props.userFullname" />
  </q-header>
  <!-- </q-layout> -->
</template>

<script setup>
import { getCurrentInstance, ref, watch } from 'vue';
import { Button, Icon, PopoverItem } from 'src/components/atoms';
import { Drawer } from '../molecules';
const props = defineProps({
  header: Boolean,
  userFullname: String,
  isMobile: Boolean,
  toggleDrawer: Function,
  file: Object,
  document: Object,
  profile: Object,
  drawer: Boolean,
});

const emit = defineEmits(['update:header', 'toggleDrawer']);

const headerValue = ref(props.header);

watch(
  () => props.header,
  (val) => {
    headerValue.value = val;
  }
);

function updateHeader(val) {
  emit('update:header', val);
}

const { proxy } = getCurrentInstance();
const mobileWidth = proxy.$mobileWidth;
</script>
