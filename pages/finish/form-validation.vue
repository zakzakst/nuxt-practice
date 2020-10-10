<template>
  <div class="content">
    <h1>フォームバリデーション</h1>
    <div>
      <!-- お名前 -->
      <div class="field">
        <label class="label">お名前 <span class="tag is-danger is-light">必須</span></label>
        <div class="control">
          <input class="input" type="text" placeholder="山田太郎" v-model="name">
        </div>
        <validation-messages :errors="errors.name" />
      </div>
      <!-- 郵便番号 -->
      <div class="field">
        <label class="label">郵便番号 <span class="tag is-danger is-light">必須</span></label>
      </div>
      <div class="field has-addons">
        <div class="control">
          <input class="input" type="text" placeholder="000-0000" v-model="zip">
        </div>
        <div class="control">
          <button class="button" @click="zipToAddress">住所を入力</button>
        </div>
      </div>
      <div class="field">
        <validation-messages :errors="errors.zip" />
      </div>
      <!-- 都道府県 -->
      <div class="field">
        <label class="label">都道府県 <span class="tag is-danger is-light">必須</span></label>
        <div class="control">
          <div class="select">
            <select v-model="prefecture" v-if="prefectures">
              <option value="">選択してください</option>
              <option
                v-for="prefecture in prefectures"
                :key="prefecture"
                :value="prefecture"
              >{{ prefecture }}</option>
            </select>
          </div>
        </div>
        <validation-messages :errors="errors.prefecture" />
      </div>
      <!-- 市区町村・番地 -->
      <div class="field">
        <label class="label">市区町村・番地 <span class="tag is-danger is-light">必須</span></label>
        <div class="control">
          <input class="input" type="text" placeholder="○○町 0-00-00" v-model="address">
        </div>
        <validation-messages :errors="errors.address" />
      </div>
      <!-- ビル名等 -->
      <div class="field">
        <label class="label">ビル名等</label>
        <div class="control">
          <input class="input" type="text" placeholder="○○ビル 7F" v-model="building">
        </div>
      </div>
      <!-- 興味のある分野 -->
      <div class="field">
        <label class="label">興味のある分野（最大{{ interestsMaxCount }}つまで） <span class="tag is-danger is-light">必須</span></label>
      </div>
      <div v-for="(interest, index) in interests" :key="index" class="field is-grouped">
        <div class="control is-expanded">
          <input class="input" type="text" v-model="interests[index]">
        </div>
        <div class="control" v-if="canRemoveInterests">
          <button class="button" @click="removeInterests(index)">削除</button>
        </div>
      </div>
      <button class="button" v-if="canAddInterests" @click="addInterests">追加</button>
      <div class="field">
        <validation-messages :errors="errors.interests" />
      </div>

      <div class="field">
        <div class="control">
          <button class="button is-link" @click.prevent="validate">送信する</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ValidationMessages from '~/components/presentational/ValidationMessages';

export default {
  data() {
    return {
      name: '',
      zip: '',
      prefecture: '',
      address: '',
      building: '',
      interests: [''],
      interestsMaxCount: 3,
      errors: {
        name: [],
        zip: [],
        prefecture: [],
        address: [],
        interests: [],
      },
    }
  },
  async asyncData({ $axios }) {
    const res = await $axios.get('/data/prefectures.json');
    return { prefectures: res.data };
  },
  components: {
    ValidationMessages,
  },
  methods: {
    zipToAddress() {
      const self = this;
      new YubinBango.Core(this.zip, res => {
        if (res.k) {
          self.prefecture = res.region;
          self.address = res.l + res.m;
          self.errors.zip = [];
        } else {
          self.errors.zip.push('該当する住所がありません');
        }
      });
    },
    addInterests() {
      this.interests.push('');
    },
    removeInterests(index) {
      this.interests.splice(index, 1);
    },
    validate() {
      const errors = {
        name: [],
        zip: [],
        prefecture: [],
        address: [],
        interests: [],
      };

      // お名前
      if (!this.name) {
        errors.name.push('必須項目が入力されていません');
      } else if (this.name.length > 20) {
        errors.name.push('20文字以内で入力してください');
      }
      // 郵便番号
      if (!this.zip) {
        errors.zip.push('必須項目が入力されていません');
      } else {
        if (!this.zip.match(/\d{3}-?\d{4}/)) {
          errors.zip.push('書式が正しくありません');
        }
      }
      // 都道府県
      if (!this.prefecture) {
        errors.prefecture.push('必須項目が入力されていません');
      }
      // 市区町村・番地
      if (!this.address) {
        errors.address.push('必須項目が入力されていません');
      } else if (this.address.length > 40) {
        errors.address.push('40文字以内で入力してください');
      }
      // 興味のある分野
      if (!this.interests.length <= 1 && !this.interests[0]) {
        errors.interests.push('必須項目が入力されていません');
      }

      this.errors = errors;
    }
  },
  computed: {
    canAddInterests() {
      return this.interests.length < this.interestsMaxCount;
    },
    canRemoveInterests() {
      return this.interests.length > 1;
    }
  }
}
</script>

<style lang="scss">
</style>
