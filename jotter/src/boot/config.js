// src/boot/config.js
export default ({ app }) => {
  // Объявляем глобальные переменные
  const mobileWidth = 1050;
  const serverURL = "https://jotter-kmzb.onrender.com";
  const clientURL = "https://jotter-demo-note.netlify.app/";
  const maxNumberOfRequestPerPage = 10;
  const contentForView = "active";
  const contentForTrashedComponent = "trashed";
  const webSocketURL = "wss://jotter-kmzb.onrender.com";

  const pending = "pending";
  const accepted = "accepted";
  const rejected = "rejected";
  const privateNote = "private";

  app.config.globalProperties.$mobileWidth = mobileWidth;
  app.config.globalProperties.$serverURL = serverURL;
  app.config.globalProperties.$clientURL = clientURL;
  app.config.globalProperties.$maxNumberOfRequestPerPage =
    maxNumberOfRequestPerPage;
  app.config.globalProperties.$contentForView = contentForView;
  app.config.globalProperties.$webSocketURL = webSocketURL;
  app.config.globalProperties.$contentForTrashedComponent =
    contentForTrashedComponent;
  app.config.globalProperties.$pending = pending;
  app.config.globalProperties.$accepted = accepted;
  app.config.globalProperties.$rejected = rejected;
  app.config.globalProperties.$privateNote = privateNote;
};
