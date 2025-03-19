import { Cookies, QSpinnerGears } from "quasar";
import axios from "axios";
import { useNotifyStore } from "src/stores/notify-store";

// const notifyStore = useNotifyStore();
export async function putMethod(
  serverURL,
  url,
  id,
  variableRef,
  $q,
  successMessage,
  errorMessage,
  params = {}
) {
  // notifyStore.loading($q, "Подождите, идет обновление", QSpinnerGears);
  try {
    const response = await axios.put(`${serverURL}${url}/${id}`, variableRef, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      params,
    });

    console.log("Ответ сервера:", response.data);
    // notifyStore.nofifySuccess($q, successMessage);
    // window.location.reload();
  } catch (error) {
    console.error("Ошибка при обновлении события:", error);
    console.error("Детали ошибки:", error.response?.data);
    // notifyStore.notifyError($q, errorMessage);
  } finally {
    // $q.loading.hide();
  }
}
