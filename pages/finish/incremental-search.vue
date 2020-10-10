<template>
  <div class="content">
    <h1>インクリメンタルサーチ</h1>
    <div>
      <!-- 都道府県 -->
      <div class="field">
        <label class="label">都道府県</label>
        <div class="control">
          <div class="select">
            <select v-model="pref" v-if="prefectures">
              <option value="">選択してください</option>
              <option
                v-for="prefecture in prefectures"
                :key="prefecture.id"
                :value="prefecture.id"
              >{{ prefecture.name }}</option>
            </select>
          </div>
        </div>
      </div>
      <!-- 市区町村 -->
      <div class="field">
        <label class="label">市区町村</label>
        <div class="control">
          <input class="input" type="text" v-model="city" @keyup="isSelect=false">
          <a
            href="#"
            v-for="(city, index) in suggestList"
            :key="index"
            @click.stop.prevent="citySelect(city.citycode)"
          >
            {{ city.city }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prefectures: [],
      pref: undefined,
      city: undefined,
      isSelect: false,
    }
  },
  async asyncData({ $axios }) {
    const res = await $axios.get('/data/prefectures2.json');
    return {
      prefectures: res.data,
    }
  },
  methods: {
    citySelect(code) {
      let selectCity = this.suggestList.filter(pref => {
        return pref.citycode === code;
      });
      this.city = selectCity.shift().city;
      this.isSelect = true;
    }
  },
  computed: {
    suggestList() {
      let retList = [];
      if (!this.isSelect && this.city) {
        this.prefectures.forEach(p => {
          if (!this.pref || p.id === this.pref) {
            p.city.forEach(c => {
              if (c.city.indexOf(this.city) > -1) {
                retList.push(c);
              }
            });
          }
        });
      }
      return retList;
    }
  }
}
</script>

<style lang="scss">
</style>
