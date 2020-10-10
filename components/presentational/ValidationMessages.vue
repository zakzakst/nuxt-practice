<template>
  <div v-if="errors">
    <p class="help is-danger" v-for="(error, index) in errors" :key="index">{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: ['errors']
}
</script>

<style lang="scss">
</style>
