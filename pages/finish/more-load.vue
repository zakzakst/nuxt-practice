<template>
  <div class="content">
    <h1>もっと見る</h1>
    <div class="columns is-multiline">
      <div v-for="(article, index) in articles" class="column is-one-third" :key="index">
        <img :src="article.thumbnail" alt="">
      </div>
    </div>
    <button v-if="hasNext" class="button" @click="load">もっと見る</button>
  </div>
</template>

<script>
const loadNum = 3;

export default {
  data() {
    return {
      thumbnailList: {
        count: 10,
        articles: [
          {thumbnail: 'https://picsum.photos/id/237/300/300'},
          {thumbnail: 'https://picsum.photos/id/238/300/300'},
          {thumbnail: 'https://picsum.photos/id/239/300/300'},
          {thumbnail: 'https://picsum.photos/id/240/300/300'},
          {thumbnail: 'https://picsum.photos/id/241/300/300'},
          {thumbnail: 'https://picsum.photos/id/242/300/300'},
          {thumbnail: 'https://picsum.photos/id/243/300/300'},
          {thumbnail: 'https://picsum.photos/id/244/300/300'},
          {thumbnail: 'https://picsum.photos/id/247/300/300'},
          {thumbnail: 'https://picsum.photos/id/248/300/300'},
        ]
      },
      // loadNum: 3,
      articles: [],
      hasNext: true,
    }
  },
  methods: {
    load() {
      const currntNum = this.articles.length;
      const nextNum = currntNum + loadNum;
      const nextArticles = this.thumbnailList.articles.slice(currntNum, nextNum);
      this.articles = this.articles.concat(nextArticles);
      if (nextNum >= this.thumbnailList.count) {
        this.hasNext = false;
      }
    }
  },
  mounted() {
    this.load();
  },
  computed: {
  }
}
</script>

<style lang="scss">
</style>
