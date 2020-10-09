<template>
  <div class="box has-background-light">
    <p class="cart__heading">
      <span class="icon">
        <fa :icon="['fas', 'shopping-cart']" />
      </span>
      ショッピングカート
    </p>
    <table class="table">
      <tbody>
        <tr v-for="(item, index) in cartItems" :key="item.id">
          <th>{{ item.title }}</th>
          <td>{{ item.qty }}点</td>
          <td>{{ item.price | formatCurrency }}</td>
          <td>
            <a href="#" @click.stop.prevent="remove(index)">削除</a>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="2">合計</th>
          <td colspan="2">{{ total | formatCurrency }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  props: ['cartItems'],
  methods: {
    remove(index) {
      this.cartItems.splice(index, 1);
    }
  },
  computed: {
    total() {
      let total = 0;
      this.cartItems.forEach(item => {
        total += item.price * item.qty;
      });
      return total;
    }
  },
  filters: {
    formatCurrency(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
}
</script>

<style lang="scss">
.cart__heading {
  display: flex;
  align-items: center;
}
</style>
