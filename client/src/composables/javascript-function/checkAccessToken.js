import { Cookies } from "quasar";
import { getCurrentInstance } from "vue";

export function checkAccessToken() {
  const { proxy } = getCurrentInstance();
  const clientURL = proxy?.$clientURL;
  if (Cookies.get("accessToken")) {
    console.log("checked");
  } else {
    window.location.href = `${clientURL}login`;
    return false;
  }
}
