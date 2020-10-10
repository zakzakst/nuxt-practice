<template>
  <div class="content">
    <h1>アコーディオン</h1>
    <accordion>
      <div slot="title">Chapter1-1</div>
      <div slot="detail">
        <h2>UI / UX</h2>
        <p>ページ遷移が必要ない。リアルタイムでのフィードバックが必要なサイトが増えてきた</p>
      </div>
    </accordion>
    <accordion>
      <div slot="title">Chapter1-2</div>
      <div slot="detail">
        <h2>jQueryとの違い</h2>
        <p>jQueryはDOMを外部から触るライブラリ</p>
        <p>Vue.jsはデータ（ViewModel）を管理することで仮想DOMを描画するライブラリ</p>
      </div>
    </accordion>
    <accordion>
      <div slot="title">Chapter1-3</div>
      <div slot="detail">
        <h2>React.jsとの違い</h2>
        <p>データによって仮想DOMを描画する点は一緒</p>
        <p>HTMLをそのままテンプレートとして利用できる</p>
        <p>つまりコンパイルも不要</p>
      </div>
    </accordion>
  </div>
</template>

<script>
import Accordion from '~/components/presentational/Accordion';

export default {
  components: {
    Accordion,
  },
}
</script>

<style lang="scss">
</style>
