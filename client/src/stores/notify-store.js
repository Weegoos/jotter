import { defineStore } from "pinia";
export const useNotifyStore = defineStore('notify', {
  actions: {
    loading ($q, spinner) {
      $q.loading.show({
        spinner: spinner,
        message: 'Loading...',
        messageColor: "white",
        backgroundColor: "black",
      });
    },
    success(msg, $q) {
      $q.notify({
        message: msg,
        color: 'green-4',
        position: 'bottom',
        icon: 'cloud_done',
      })
    },
    error(msg, $q) {
      $q.notify({
        color: "red-5",
        textColor: "white",
        icon: "error",
        message: msg,
      });
    },
  }
})
