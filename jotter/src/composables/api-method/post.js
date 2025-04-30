import axios from "axios";
import { Cookies, QSpinnerGears } from "quasar";
import { loadingMessage } from "../notify/loadingMessage";
import { successMessage } from "../notify/successMessage";
import { errorMessage } from "../notify/errorMessage";

export async function postMethod(serverURL, url, variableRef, $q, successMsg) {
  try {
    const response = await axios.post(`${serverURL}${url}`, variableRef, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    });
    successMessage($q, successMsg);
    return response.data;
  } catch (error) {
    console.error("Ошибка:", error.response?.data);
    errorMessage($q, `Ошибка: ${error}`);
  } finally {
    $q.loading.hide();
  }
}
