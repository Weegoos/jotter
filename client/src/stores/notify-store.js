import { defineStore } from "pinia";
import { useQuasar } from "quasar";
export const useNotifyStore = defineStore("notify", {
  actions: {
    loading($q, spinner) {
      $q.loading.show({
        spinner: spinner,
        message: "Loading...",
        messageColor: "white",
        backgroundColor: "black",
      });
    },
    success($q, msg) {
      $q.notify({
        message: msg,
        color: "green-4",
        position: "bottom",
        icon: "cloud_done",
      });
    },
    error($q, msg) {
      $q.notify({
        color: "red-5",
        textColor: "white",
        icon: "error",
        position: "bottom",
        message: msg,
      });
    },
  },
});
