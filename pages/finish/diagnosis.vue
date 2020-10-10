<template>
  <div class="content">
    <h1>ストレス診断</h1>
    <div>
      <transition name="diagnosis-fade">
        <div v-show="status === 0">
          <p>あなたのストレス度をチェックします</p>
          <button class="button" @click="start">スタート</button>
        </div>
      </transition>
      <transition name="diagnosis-fade" v-for="q in questions" :key="q.num">
        <div v-show="q.num === status">
          <p><b>質問{{ q.num }}</b></p>
          <p>{{ q.sentence }}</p>
          <div class="buttons">
            <button class="button" @click="answer('yes')">はい</button>
            <button class="button" @click="answer('num')">いいえ</button>
          </div>
        </div>
      </transition>
      <transition name="diagnosis-fade">
        <div v-show="isFinish">
          <p><b>診断結果</b></p>
          <p>{{ result.sentence }}</p>
          <button class="button" @click="reset">最初からやり直す</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        {num: 1, point: 1, sentence: '非常にたくさんの仕事をしなければならない'},
        {num: 2, point: 2, sentence: '時間内に仕事が処理しきれない'},
        {num: 3, point: 2, sentence: '高度の知識や技術が必要な仕事だ'},
        {num: 4, point: 2, sentence: '自分のペースで仕事ができない'},
        {num: 5, point: 3, sentence: '職場の雰囲気が悪い'},
      ],
      results: [
        {min: 0, max: 4, sentence: 'あなたはそれほどストレスを感じていません。'},
        {min: 5, max: 7, sentence: '少しストレスを感じているようです。意識的にストレス対処に努めてください。'},
        {min: 8, max: 10, sentence: '非常に多くのストレスを感じているようです。医者の診断を受けてください。'},
      ],
      status: 0,
      sum: 0,
    }
  },
  methods: {
    start() {
      this.status = 1;
    },
    reset() {
      this.status = 0;
      this.sum = 0;
    },
    answer(type) {
      let question = this.questions.filter(q => {
        return q.num === this.status;
      }).shift();

      if (type === 'yes') {
        this.sum += question.point;
      }

      this.status++;
    }
  },
  computed: {
    question() {
      // return this.questions.filter(q => q.num === this.status).shift();
      return this.questions.find(q => q.num === this.status);
    },
    result() {
      // return this.results.filter(a => this.sum >= a.min && this.sum <= a.max).shift();
      return this.results.find(a => this.sum >= a.min && this.sum <= a.max);
    },
    isFinish() {
      return this.status > this.questions.length;
    }
  }
}
</script>

<style lang="scss">
.diagnosis-fade-enter-active {
  width: 100%;
  transition: all .8s ease;
}
.diagnosis-fade-leave-active {
  position: absolute;
  width: 100%;
  transition: all .8s ease;
  opacity: 0;
}
.diagnosis-fade-enter {
  transform: translateX(-100%);
}
.diagnosis-fade-leave-to {
  transform: translateX(100%);
}
</style>
