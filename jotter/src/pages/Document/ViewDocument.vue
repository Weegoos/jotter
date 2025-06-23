<template>
  <div>
        <q-table
      class="m-[8px]"
      bordered
      title="Закрепленные заметки"
      :rows="pinnedNote"
      @row-click="viewDetailedInfoAboutNote"
      :columns="columns"
      row-key="name"
      hide-bottom
      v-if="pinnedNote?.length"
    >
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <div
            v-html="props.row.name"
            class="max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis"
          ></div>
        </q-td>
      </template>
      <template v-slot:body-cell-description="props">
        <q-td :props="props">
          <div
            v-html="props.row.description"
            class="max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis"
          ></div>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td align="center">
          <q-btn-dropdown @click.stop color="primary">
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-btn
                    class="bg-amber-500 hover:bg-amber-600 text-white"
                    icon="mdi-pin"
                    size="sm"
                    @click="pinNote(props.row)"
                  />
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>
                  <q-btn
                    class="bg-blue-500 hover:bg-blue-600 text-white"
                    icon="mdi-pencil"
                    size="sm"
                    @click="updateNote(props.row)"
                  />
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-btn
                    class="bg-rose-500 hover:bg-rose-600 text-white"
                    icon="mdi-delete"
                    size="sm"
                    @click="deleteNote(props.row)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-td>
      </template>
    </q-table>
    <q-table
      class="m-[8px]"
      bordered
      title="Заметка(-и)"
      :rows="rows"
      @row-click="viewDetailedInfoAboutNote"
      :columns="columns"
      row-key="name"
      hide-bottom
    >
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <div
            v-html="props.row.name"
            class="max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis"
          ></div>
        </q-td>
      </template>
      <template v-slot:body-cell-description="props">
        <q-td :props="props">
          <div
            v-html="props.row.description"
            class="max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis"
          ></div>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td align="center">
          <q-btn-dropdown @click.stop color="primary">
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-btn
                    class="bg-amber-500 hover:bg-amber-600 text-white"
                    icon="mdi-pin"
                    size="sm"
                    @click="pinNote(props.row)"
                  />
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>
                  <q-btn
                    class="bg-blue-500 hover:bg-blue-600 text-white"
                    icon="mdi-pencil"
                    size="sm"
                    @click="updateNote(props.row)"
                  />
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-btn
                    class="bg-rose-500 hover:bg-rose-600 text-white"
                    icon="mdi-delete"
                    size="sm"
                    @click="deleteNote(props.row)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-td>
      </template>
    </q-table>
    <DetailedInformationAboutNoteVue
      :isOpenDetailedInformation="isOpenDetailedInformation"
      @closeDetailedInformationSection="closeDetailedInformationSection"
      :detailedInformation="detailedInformation"
    />
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/api-method/get";
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import DetailedInformationAboutNoteVue from "../../components/organisims/DetailedInformationAboutNote.vue";
import { useDateFormat } from "src/composables/javascript-function/formatDate";
import { deleteMethod } from "src/composables/api-method/delete";
import { putMethod } from "src/composables/api-method/put";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const webSocketURL = proxy.$webSocketURL;
const socket = new WebSocket(webSocketURL);
const router = useRouter();

socket.onopen = () => {
  console.log("✅ WebSocket подключен");
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.event === "create_note") {
    getNotesById();
  }
  if (data.event === "notes_list") {
    getNotesById();
  }
  if (data.event === "delete_note") {
    getNotesById();
  }
};

const route = useRoute();
const id = route.params.id;

const rows = ref([]);
const columns = computed(() => [
  {
    name: "title",
    label: "Name",
    align: "left",
    field: (row) => row.title,
    sortable: true,
  },
  {
    name: "type",
    label: "Type",
    align: "left",
    field: (row) => row.type,
    sortable: true,
  },
  {
    name: "created_at",
    label: "Created At",
    align: "left",
    field: (row) => useDateFormat(row.createdAt),
    sortable: true,
  },
  {
    name: "updated_at",
    label: "Updated At",
    align: "left",
    field: (row) => useDateFormat(row.updatedAt),
    sortable: true,
  },
  {
    name: "actions",
    label: "Actions",
    align: "center",
    field: "id",
  },
]);

const pinnedNote = ref([])
const getNotesById = async () => {
  try {
    const response = await getMethod(
      serverURL,
      `notes/${id}/false`,
      $q,
      "Заметки получены!"
    );
    rows.value = response;

    const pinned = await getMethod(
      serverURL,
      `notes/${id}/true`,
      $q,
      "Заметки получены!"
    );
    pinnedNote.value = pinned
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getNotesById();
});

const isOpenDetailedInformation = ref(false);
const detailedInformation = ref([]);
const viewDetailedInfoAboutNote = (info, row) => {
  detailedInformation.value = row;
  isOpenDetailedInformation.value = true;
};

const closeDetailedInformationSection = () => {
  isOpenDetailedInformation.value = false;
};

const updateNote = (row) => {
  router.push(`/update-note/${row.id}`);
};

const deleteNote = async (row) => {
  try {
    await deleteMethod(serverURL, "notes", row.id);
  } catch (error) {
    console.error(error);
  }
};

const pinNote = async (row) => {
  try {
    const payload = {
      value: (row.pinned = !row.pinned),
    };

    await putMethod(serverURL, `notes/${row.id}/pin`, payload, $q, {});
  } catch (error) {
    console.error(error);
  }
};
</script>
