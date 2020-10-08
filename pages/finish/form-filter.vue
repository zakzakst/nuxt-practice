<template>
  <div class="content">
    <h1>お問い合わせ</h1>
    <div>
      <div class="field">
        <label class="label">お名前 <span class="tag is-light">10文字</span></label>
        <div class="control">
          <input
            v-model="name"
            class="input"
            type="text"
            placeholder="山田太郎"
          >
        </div>
        <p class="help is-danger">{{ name | maxLengthValidator(10) }}</p>
      </div>
      <div class="field">
        <label class="label">件名 <span class="tag is-light">20文字</span></label>
        <div class="control">
          <input
            v-model="subject"
            class="input"
            type="text"
            placeholder="商品についての質問"
          >
        </div>
        <p class="help is-danger">{{ subject | maxLengthValidator(20) }}</p>
      </div>
      <div class="field">
        <label class="label">内容 <span class="tag is-light">30文字</span></label>
        <div class="control">
          <textarea
            v-model="contents"
            class="textarea"
            placeholder="2週間前に購入した商品が届かないのですが、ご確認いただけますでしょうか。"></textarea>
        </div>
        <p class="help is-danger">{{ contents | maxLengthValidator(30) }}</p>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-link">送信する</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      subject: '',
      contents: '',
    }
  },
  filters: {
    maxLengthValidator(val, max) {
      if (val && val.length > max) {
        return `${max}文字以内で入力してください。`;
      }
    }
  }
}
</script>
