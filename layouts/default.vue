<template>
  <div>
    <nav class="navbar is-dark">
      <div class="navbar-end">
        <div
          v-for="(pageLinks, index) in pageLinksList"
          :key="index"
          class="navbar-item has-dropdown is-hoverable"
        >
          <a class="navbar-link">ページリンク{{ index + 1 }}</a>
          <div class="navbar-dropdown">
            <nuxt-link to="/" class="navbar-item">トップ</nuxt-link>
            <hr class="navbar-divider">
            <nuxt-link v-for="page in pageLinks" :key="page.path" :to="`/finish/${page.path}`" class="navbar-item">{{ page.path }}</nuxt-link>
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
      pageLinksList: [
        [
          {path: 'vue-i18n'},
          {path: 'omikuji'},
          {path: 'form-filter'},
          {path: 'item-filter'},
          {path: 'diagnosis'},
          {path: 'more-load'},
          {path: 'shopping-cart'},
          {path: 'lightbox'},
          {path: 'accordion'},
          {path: 'form-validation'},
        ],
        [
          {path: 'incremental-search'},
          {path: 'carousel'},
        ],
      ]
    }
  }
}
</script>
