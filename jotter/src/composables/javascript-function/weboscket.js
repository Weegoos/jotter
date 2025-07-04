export const useWebSocket = (url) => {
  const socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("✅ WebSocket подключен");
  };

  socket.onclose = () => {
    console.log("❌ WebSocket отключен");
  };

  socket.onerror = (error) => {
    console.error("🔥 WebSocket ошибка:", error);
  };
};
