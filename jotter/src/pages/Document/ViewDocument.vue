<template>
  <div>
    <div>
      <q-virtual-scroll
        :items="heavyList"
        virtual-scroll-horizontal
        v-slot="{ item, index }"
        class="h-[100px]"
      >
        <div :key="index" :class="item.class">
          #{{ index }} - {{ item.label }}
        </div>
      </q-virtual-scroll>
    </div>
    <section class="grid lg:grid-cols-4 gap-[16px] grid-cols-1 m-[16px]">
      <q-card
        class="my-card cursor-pointer"
        v-for="(note, index) in notes"
        :key="index"
      >
        <q-img
          @click="viewContent(note)"
          class="rounded-md"
          src="https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        >
          <q-card-section class="absolute bottom-14 left-5 bg-transparent">
            <div
              class="text-body1 bg-red-500 p-[7px] rounded-full w-24 text-center"
            >
              {{ note.type }}
            </div>
          </q-card-section>
          <q-card-section class="absolute bottom-5 left-5 h-12 bg-transparent">
            <div class="text-h6 font-extrabold text-bold bg-black p-[8px]">
              {{ note.title }}
            </div>
          </q-card-section>
        </q-img>
      </q-card>
    </section>
    <DetailedInformationAboutNoteVue
      :isOpenDetailedInformation="isOpenDetailedInformation"
    />
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/api-method/get";
import { getCurrentInstance, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import DetailedInformationAboutNoteVue from "../../components/organisims/DetailedInformationAboutNote.vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const route = useRoute();
const id = route.params.id;

const maxSize = 10
const heavyList = ['Label']

for (let i = 0; i < maxSize; i++) {
  heavyList.push({
    label: 'Option ' + (i + 1),
  })
}

const notes = ref([]);
const getNotesById = async () => {
  try {
    notes.value = await getMethod(
      serverURL,
      `notes/${id}`,
      $q,
      "Заметки получены!"
    );
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getNotesById();
});

const detailedInformationAboutNote = ref([]);
const isOpenDetailedInformation = ref(false);
const viewContent = async (note) => {
  isOpenDetailedInformation.value = true;
};
</script>

<style></style>
