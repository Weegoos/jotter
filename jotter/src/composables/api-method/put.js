import { Cookies } from "quasar";
import axios from "axios";
import { successMessage } from "../notify/successMessage";
import { errorMessage } from "../notify/errorMessage";
import { loadingMessage } from "../notify/loadingMessage";

export async function putMethod(
  serverURL,
  url,
  variableRef,
  $q,
  successMsg,
  errorMsg,
  params = {}
) {
  try {
    const data = variableRef?.value ?? null;
    const response = await axios.put(`${serverURL}${url}`, variableRef, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
      params,
      withCredentials: true,
    });

    console.log("Ответ сервера:", response.data);
    successMessage($q, successMsg);
    // window.location.reload();
  } catch (error) {
    console.error("Ошибка при обновлении события:", error);
    console.error("Детали ошибки:", error.response?.data);
  } finally {
    $q.loading.hide();
  }
}
