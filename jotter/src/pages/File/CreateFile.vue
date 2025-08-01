<template>
  <div>
    <Input class="m-[16px]" type="text" autogrow v-model="fileName" placeholder="Write file name">
    </Input>
    <BaseQEditor
      @saveWork="saveWork"
      @sendWork="sendWork"
      placeholder="Write description for file"
    />
  </div>
</template>

<script setup>
import { successMessage } from 'src/composables/notify/successMessage';
import BaseQEditor from '../../components/molecules/MoleculeQEditor.vue';
import { useQuasar } from 'quasar';
import { getCurrentInstance, onMounted, ref } from 'vue';
import { postMethod } from 'src/composables/api-method/post';
import { Input } from 'src/components/atoms';

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const webSocketURL = proxy.$webSocketURL;

let ws;
onMounted(() => {
  ws = new WebSocket(webSocketURL);

  ws.onopen = () => {
    console.log('WebSocket подключен');
  };
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.event === 'create_file') {
      successMessage($q, 'Новый файл создан и добавлен в список.');
    }
  };

  ws.onerror = (error) => {
    console.error('WebSocket ошибка: ', error);
  };

  ws.onclose = () => {
    console.log('WebSocket соединение закрыто');
  };
});

const saveWork = (data) => {
  successMessage($q, 'File saved successfully');
  console.log(data);
};

const fileName = ref('');
const sendWork = (data) => {
  console.log(data);
  try {
    const payload = {
      name: fileName.value,
      description: data,
    };

    postMethod(serverURL, 'file/create', payload, $q, 'File created successfully');
  } catch (error) {
    console.error(error);
  }
};
</script>

<style></style>
