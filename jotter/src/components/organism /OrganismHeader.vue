<template>
  <q-layout view="lhh LpR lFf" style="min-height: 100%">
    <q-header
      data-testid="main-header"
      :model-value="headerValue"
      @update:model-value="updateHeader"
      reveal
      elevated
      class="bg-white p-4 text-black"
    >
      <Drawer />

      <!-- <div class="grid grid-rows-1 gap-4" :class="props.userFullname ? 'grid-cols-3' : 'grid-cols-2'">
      <section>
        <Icon data-testid="toggle-icon" @click="emit('toggleDrawer')" />
      </section>
      <nav
        v-if="props.userFullname"
        align="left"
        :class="$q.screen.width < mobileWidth ? 'hidden' : 'row'"
        data-testid="header-nav"
      >
        <PopoverItem :item="file" :title="'File'" />
        <PopoverItem :item="document" :title="'Document'" />
        <PopoverItem :item="profile" :title="'Profile'" />
      </nav>
      <div
        align="right"
        data-testid="header-buttons"
        v-if="!props.userFullname"
        :class="$q.screen.width < mobileWidth ? 'hidden' : ''"
      >
        <Button
          class="rounded-full q-mr-sm"
          color="black"
          no-caps
          label="Register"
          icon-right="mdi-arrow-right"
          @emitClick="$router.push('/register')"
        />
        <Button
          class="rounded-full"
          color="black"
          no-caps
          label="Log in"
          icon-right="mdi-login"
          @emitClick="$router.push('/login')"
        />
      </div>
    </div> -->
    </q-header>
  </q-layout>
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
