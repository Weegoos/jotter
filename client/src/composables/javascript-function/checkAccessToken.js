import { Cookies } from "quasar";
import { getCurrentInstance } from "vue";

export function checkAccessToken() {
  const { proxy } = getCurrentInstance();
  const clientURL = proxy?.$clientURL;
  if (Cookies.get("accessToken")) {
    window.location.href = `${clientURL}`;
    return true;
  } else {
    window.location.href = `${clientURL}login`;
    return false;
  }
}
