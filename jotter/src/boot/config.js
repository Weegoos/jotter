// src/boot/config.js
export default ({ app }) => {
  // Объявляем глобальные переменные
  const mobileWidth = 1050;
  app.config.globalProperties.$mobileWidth = mobileWidth;
};
