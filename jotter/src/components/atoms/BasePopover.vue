<template>
  <Popover v-slot="{ open }" class="relative cursor-pointer">
    <PopoverButton
      :class="open ? 'text-black' : 'text-black/90'"
      class="group inline-flex items-center rounded-md px-3 py-2 text-base font-medium focus:outline-none focus-visible:ring-2 hover:bg-gray-100 transition-all duration-300 ease-in-out"
    >
      <span>{{ props.title }}</span>
      <ChevronDownIcon
        :class="open ? 'text-black' : 'text-black'"
        class="ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-orange-300/80"
        aria-hidden="true"
      />
    </PopoverButton>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel
        class="absolute left-1/3 z-10 mt-3 w-[350px] max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl"
      >
        <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
          <div class="relative grid gap-8 bg-white p-7 lg:grid-cols-1">
            <a
              v-for="item in props.item"
              :key="item.name"
              @click="$router.push(item.href)"
              class="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
            >
              <div class="flex h-10 w-10 shrink-0 items-center justify-centersm:h-12 sm:w-12">
                <q-icon :name="item.icon" size="30px" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-900">
                  {{ item.name }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ item.description }}
                </p>
              </div>
            </a>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  title: String,
});
</script>

<style></style>
