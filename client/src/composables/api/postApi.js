import axios from "axios";
import { QSpinnerGears } from "quasar";
import { useNotifyStore } from "src/stores/notify-store";

export async function postMethod(serverURL, apiURL, data, $q) {
  const notifyStore = useNotifyStore()
  notifyStore.loading($q, QSpinnerGears)
  try {
    const response = await axios.post(`${serverURL}${apiURL}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    notifyStore.success($q, response.data.message )
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = JSON.parse(error.request.responseText)?.message || "Ошибка";
      notifyStore.error($q, errorMessage);
    } else {
      console.error("Ошибка запроса:", error.message);
      notifyStore.error($q ,`Ошибка запроса: ${error.message}`);
    }
  }finally{
    $q.loading.hide()
  }
}
