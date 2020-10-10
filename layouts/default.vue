<template>
  <div>
    <nav class="navbar is-dark">
      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">ページリスト</a>
          <div class="navbar-dropdown">
            <nuxt-link to="/" class="navbar-item">トップ</nuxt-link>
            <hr class="navbar-divider">
            <nuxt-link v-for="page in pageList" :key="page.path" :to="`/finish/${page.path}`" class="navbar-item">{{ page.path }}</nuxt-link>
          </div>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="section">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageList: [
        {path: 'vue-i18n'},
        {path: 'omikuji'},
        {path: 'form-filter'},
        {path: 'item-filter'},
        {path: 'diagnosis'},
        {path: 'more-load'},
        {path: 'shopping-cart'},
        {path: 'lightbox'},
        {path: 'accordion'},
      ]
    }
  }
}
</script>
