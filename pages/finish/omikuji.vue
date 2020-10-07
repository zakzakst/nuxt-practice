<template>
  <div class="content">
    <h1>おみくじ</h1>
    <p v-if="result">結果は…「{{ result }}」です！</p>
    <button class="button" @click="draw">{{ button }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: null,
      button: 'おみくじを引く',
      omikuji: [
        '大吉',
        '中吉',
        '小吉',
        '凶',
      ],
    }
  },
  methods: {
    draw() {
      const index = Math.floor(Math.random() * this.omikuji.length);
      this.result = this.omikuji[index];
      this.button = 'おみくじをもう一度引く';
    }
  }
}
</script>
