import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import messages from 'src/i18n';

export default boot(({ app }) => {
  const savedLocale = localStorage.getItem('locale') || 'ru';

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: savedLocale,
    messages,
  });

  app.use(i18n);
});
