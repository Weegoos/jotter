import axios from "axios";
import { QSpinnerGears, useQuasar } from "quasar";
import { useNotifyStore } from "src/stores/notify-store";

export async function getMethod(serverURL, apiURL, variable, msg) {
  const notifyStore = useNotifyStore();
  const $q = useQuasar();
  notifyStore.loading($q, QSpinnerGears);
  try {
    const response = await axios.get(`${serverURL}${apiURL}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    variable.value = response.data;
    notifyStore.success($q, msg);
  } catch (error) {
    console.error(error);
    notifyStore.error( $q, error);
  } finally {
    $q.loading.hide();
  }
}
