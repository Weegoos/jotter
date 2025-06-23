<template>
  <q-table
    class="m-[8px]"
    bordered
    :title="props.title"
    :rows="props.notes"
    :columns="props.columns"
    row-key="name"
    v-if="props.notes?.length"
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
                  @click="emit('pin', props.row)"
                />
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-btn
                  class="bg-blue-500 hover:bg-blue-600 text-white"
                  icon="mdi-pencil"
                  size="sm"
                  @click="emit('update', props.row)"
                />
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-btn
                  class="bg-rose-500 hover:bg-rose-600 text-white"
                  icon="mdi-delete"
                  size="sm"
                  @click="emit('delete', props.row)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
// global variables
const props = defineProps({
  notes: {
    type: Object,
    required: true,
  },
  columns: {
    type: Object,
  },
  title: String,
});

const emit = defineEmits(["pin", "update", "delete"]);
</script>
