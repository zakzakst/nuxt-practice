import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default ({ app }) => {
  const locale = app.$cookies.get('locale') || 'ja';
  app.i18n = new VueI18n({
    locale,
    fallbackLocale: 'ja',
    messages: {
      en: require('~/locales/en.json'),
      ja: require('~/locales/ja.json'),
    }
  });
};
