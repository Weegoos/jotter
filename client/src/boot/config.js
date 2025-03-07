// src/boot/config.js
export default ({ app }) => {
  // Объявляем глобальные переменные
  const serverURL = "http://localhost:3000/";
  const clientURL = "http://localhost:9000/#/";

  app.config.globalProperties.$serverURL = serverURL;
  app.config.globalProperties.$clientURL = clientURL;
};
