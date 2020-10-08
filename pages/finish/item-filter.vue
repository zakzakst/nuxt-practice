<template>
  <div class="content">
    <h1>商品一覧</h1>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">商品名</label>
      </div>
      <div class="field-body">
        <div class="control">
          <input class="input" type="text" v-model="filter.name">
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">価格</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox mr-2">
              <input type="checkbox" value="under" v-model="filter.price">
              200円未満
            </label>
            <label class="checkbox mr-2">
              <input type="checkbox" value="over" v-model="filter.price">
              200円以上
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">色</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox mr-2">
              <input type="checkbox" value="red" v-model="filter.color">
              赤
            </label>
            <label class="checkbox mr-2">
              <input type="checkbox" value="orange" v-model="filter.color">
              オレンジ
            </label>
            <label class="checkbox mr-2">
              <input type="checkbox" value="purple" v-model="filter.color">
              紫
            </label>
            <label class="checkbox mr-2">
              <input type="checkbox" value="yellow" v-model="filter.color">
              黄
            </label>
            <label class="checkbox mr-2">
              <input type="checkbox" value="green" v-model="filter.color">
              緑
            </label>
            <label class="checkbox mr-2">
              <input type="checkbox" value="pink" v-model="filter.color">
              ピンク
            </label>
          </div>
        </div>
      </div>
    </div>

    <table class="table mt-4">
      <thead>
        <tr>
          <th>
            <div @click="sortBy('id')" :class="sortClass('id')">No</div>
          </th>
          <th>
            <div @click="sortBy('name')" :class="sortClass('name')">商品名</div>
          </th>
          <th>
            <div @click="sortBy('price')" :class="sortClass('price')">価格</div>
          </th>
          <th>
            <div @click="sortBy('colorCode')" :class="sortClass('colorCode')">色</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sortedItems" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td :style="`color:${item.colorCode}`">{{ item.colorName }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, name: 'リンゴ', price: 100, colorName: '赤', colorCode: 'red'},
        { id: 2, name: 'ミカン', price: 150, colorName: 'オレンジ', colorCode: 'orange'},
        { id: 3, name: 'ブドウ', price: 300, colorName: '紫', colorCode: 'purple'},
        { id: 4, name: 'バナナ', price: 50, colorName: '黄', colorCode: 'yellow'},
        { id: 5, name: 'メロン', price: 550, colorName: '緑', colorCode: 'green'},
        { id: 6, name: 'スイカ', price: 400, colorName: '緑', colorCode: 'green'},
        { id: 7, name: 'トマト', price: 120, colorName: '赤', colorCode: 'red'},
        { id: 8, name: 'レモン', price: 110, colorName: '黄', colorCode: 'yellow'},
        { id: 9, name: 'イチゴ', price: 200, colorName: '赤', colorCode: 'red'},
        { id: 10, name: 'モモ', price: 150, colorName: 'ピンク', colorCode: 'pink'},
      ],
      sort: {
        key: '',
        isAsc: false
      },
      filter: {
        name: '',
        price: [],
        color: []
      }
    }
  },
  methods: {
    sortBy(key) {
      this.sort.isAsc = this.sort.key === key ? !this.sort.isAsc : true;
      this.sort.key = key;
    },
    sortClass(key) {
      return this.sort.key === key ? `sort ${this.sort.isAsc ? 'asc' : 'desc'}` : '';
    }
  },
  computed: {
    sortedItems() {
      // sort()は元の配列の中身もソートされてしまうため、slice()で配列のコピーを作成してからソートする
      let list = this.items.slice();
      if (this.sort.key) {
        list.sort((a, b) => {
          a = a[this.sort.key];
          b = b[this.sort.key];
          return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1);
        });
      }
      // 商品名のフィルター
      if (this.filter.name) {
        list = list.filter(item => item.name.indexOf(this.filter.name) > -1);
      }
      // 価格によるフィルター
      if (this.filter.price.length > 0) {
        list = list.filter(item => {
          // 200円未満が選択されている場合
          if (this.filter.price.indexOf('under') > -1) {
            if (item.price < 200) {
              return true;
            }
          }
          // 200円未満が選択されている場合
          if (this.filter.price.indexOf('over') > -1) {
            if (item.price >= 200) {
              return true;
            }
          }
          return false;
        });
      }
      // 色によるフィルター
      if (this.filter.color.length > 0) {
        list = list.filter(item => {
          return this.filter.color.indexOf(item.colorCode) > -1;
        });
      }
      return list;
    }
  }
}
</script>

<style lang="scss">
th {
  .sort {
    &.desc::after,
    &.asc::after {
      display: inline-block;
    }
    &.desc::after {
      content: '▼';
    }
    &.asc::after {
      content: '▲';
    }
  }
}
</style>
