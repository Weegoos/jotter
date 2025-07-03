import { getCurrentInstance } from "vue";

const proxy = getCurrentInstance();
const webSocketURL = proxy.$webSocketURL;
const socket = new WebSocket(webSocketURL);

socket.onopen = () => {
  console.log("✅ WebSocket подключен");
};

socket.onclose = () => {
  console.log("❌ WebSocket отключен");
};

socket.onerror = (error) => {
  console.error("🔥 WebSocket ошибка:", error);
};
