<template>
  <div class="container">
    <p>{{ $t('title') }}</p>
    <button class="button" @click="toggleLocale">切り替え</button>
  </div>
</template>

<script>
export default {
   asyncData({ app }) {
    const locale = app.$cookies.get('locale') || 'ja';
    return {
      isJa: locale === 'ja'
    }
  },
  methods: {
    toggleLocale() {
      this.isJa = !this.isJa;
      const locale = this.isJa ? 'ja' : 'en';
      // localeをCookieに保存
      this.$cookies.set('locale', locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365
      });
      // 言語を切り替え
      this.$i18n.locale = locale;
    }
  }
}
</script>
