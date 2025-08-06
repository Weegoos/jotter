<template>
  <q-list bordered v-for="(note, index) in props.document" :key="index">
    <q-item
      clickable
      v-ripple
      @click="emit('showNoteContent', note)"
      :class="note.id == props.noteId ? 'bg-grey-4' : ''"
    >
      <q-item-section>
        <section class="grid grid-cols-2">
          <div>
            <p class="text-h6">{{ note.title }}</p>
          </div>
          <div align="right">
            <q-btn
              flat
              icon="mdi-dots-horizontal"
              @click="
                (e) => {
                  e.stopPropagation();
                }
              "
            >
              <q-menu anchor="bottom right" self="top right">
                <q-item clickable @click="emit('pin', note)">
                  <q-item-section avatar>
                    <q-icon color="orange" name="mdi-pin" />
                  </q-item-section>
                  <q-item-section>{{ props.pinButtonText }}</q-item-section>
                </q-item>
                <q-item clickable @click="emit('edit', note)">
                  <q-item-section avatar>
                    <q-icon color="amber-5" name="mdi-pencil" />
                  </q-item-section>
                  <q-item-section>Edit</q-item-section>
                </q-item>
                <q-item clickable @click="emit('delete', note)">
                  <q-item-section avatar>
                    <q-icon color="red" name="mdi-delete" />
                  </q-item-section>
                  <q-item-section>Move to the trash</q-item-section>
                </q-item>
              </q-menu>
            </q-btn>
          </div>
        </section>
        <div class="py-[10px] q-gutter-sm">
          <q-btn color="primary" class="rounded-full" no-caps :label="note.type" />

          <q-btn
            v-for="(hashtag, index) in note.hashtags"
            :key="index"
            color="secondary"
            class="rounded-full"
            no-caps
            :label="hashtag"
          />
        </div>
      </q-item-section>
    </q-item>
    <q-separator dark />
  </q-list>
</template>

<script setup>
const props = defineProps({
  document: {
    type: [Object, Array],
  },
  noteId: {
    type: [Number],
  },
  pinButtonText: {
    type: String,
  },
});

const emit = defineEmits(['showNoteContent', 'pin', 'delete', 'edit']);
</script>

<style></style>
