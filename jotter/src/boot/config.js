// src/boot/config.js
export default ({ app }) => {
  // Объявляем глобальные переменные
  const mobileWidth = 1050;
  const serverURL = "http://localhost:3000/";
  const clientURL = "http://localhost:9000/#/";
  const maxNumberOfRequestPerPage = 10;
  const contentForView = "active";
  const contentForTrashedComponent = "trashed";
  const webSocketURL = "ws://localhost:3000";

  app.config.globalProperties.$mobileWidth = mobileWidth;
  app.config.globalProperties.$serverURL = serverURL;
  app.config.globalProperties.$clientURL = clientURL;
  app.config.globalProperties.$maxNumberOfRequestPerPage =
    maxNumberOfRequestPerPage;
  app.config.globalProperties.$contentForView = contentForView;
  app.config.globalProperties.$webSocketURL = webSocketURL;
  app.config.globalProperties.$contentForTrashedComponent =
    contentForTrashedComponent;
};
