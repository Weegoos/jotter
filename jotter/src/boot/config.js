// src/boot/config.js
export default ({ app }) => {
  // Объявляем глобальные переменные
  const mobileWidth = 1050;
  const serverURL = "http://localhost:3000/";
  const clientURL = "http://localhost:9000/#/";

  app.config.globalProperties.$mobileWidth = mobileWidth;
  app.config.globalProperties.$serverURL = serverURL;
  app.config.globalProperties.$clientURL = clientURL;
};
