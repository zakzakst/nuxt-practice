<template>
  <div class="content">
    <h1>ショッピングカート</h1>
    <div class="columns">
      <div class="column is-two-thirds">
        <article v-for="product in products" :key="product.id" class="media">
          <div class="media-left">
            <p class="image is-128x128">
              <img :src="product.image">
            </p>
          </div>
          <div class="media-content">
            <div class="columns">
              <div class="column is-half">
                <p>{{ product.title }}</p>
                <p>{{ product.price | formatCurrency }}</p>
                <p><input v-model="product.qty" class="input is-rounded" type="number"></p>
              </div>
              <div class="column is-half">
                <button class="button is-fullwidth" @click="addToCart(product)">カートに入れる</button>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-one-third">
        <shopping-cart :cartItems="cartItems" />
      </div>
    </div>
  </div>
</template>

<script>
import ShoppingCart from '~/components/container/ShoppingCart';

export default {
  data() {
    return {
      products: [
        {id: 1, title: '商品1', price: 500, qty: 1, image: 'https://picsum.photos/id/237/300/300'},
        {id: 2, title: '商品2', price: 1000, qty: 1, image: 'https://picsum.photos/id/238/300/300'},
        {id: 3, title: '商品3', price: 350, qty: 1, image: 'https://picsum.photos/id/239/300/300'},
        {id: 4, title: '商品4', price: 2000, qty: 1, image: 'https://picsum.photos/id/240/300/300'},
        {id: 5, title: '商品5', price: 1500, qty: 1, image: 'https://picsum.photos/id/241/300/300'},
        {id: 6, title: '商品6', price: 50, qty: 1, image: 'https://picsum.photos/id/242/300/300'},
        {id: 7, title: '商品7', price: 9800, qty: 1, image: 'https://picsum.photos/id/243/300/300'},
        {id: 8, title: '商品8', price: 20, qty: 1, image: 'https://picsum.photos/id/244/300/300'},
      ],
      cartItems: [],
    }
  },
  components: {
    ShoppingCart,
  },
  methods: {
    addToCart(itemToAdd) {
      let existence = false;
      this.cartItems.forEach(item => {
        if (item.id === itemToAdd.id) {
          existence = true;
          // v-modelにするとitem.qtyのほうが文字列になってた？
          item.qty = Number(item.qty) + Number(itemToAdd.qty);
        }
      });
      // 新規商品の場合は商品を追加
      if (existence === false) {
        // productsの内容をコピーしてからcartItemsに追加（※参照にしない）
        this.cartItems.push(JSON.parse(JSON.stringify(itemToAdd)));
      }
      // 追加完了したら、商品数を戻す
      itemToAdd.qty = 1;
    },
  },
  created() {
  },
  mounted() {
  },
  filters: {
    formatCurrency(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
}
</script>

<style lang="scss">
</style>
