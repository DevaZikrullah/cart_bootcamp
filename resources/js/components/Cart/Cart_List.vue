<template>
        <div class="main">
            <table class="table table-borderless">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <CartListItem v-for="cartItem in cart" :key="cartItem.id" :cartItem="cartItem"></CartListItem>
                    <tr>
                       <td> <p>Total :</p></td>
                       <td></td>
                       <td><p>Rp. {{price}}</p></td> 
        
                       <td></td>
                    </tr>
                </tbody>
            </table>
            <button class="btn btn-primary" onClick="alert('Terbeli')">Checkout</button>
        </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from './Cart_Item.vue'
export default {
  name: "CartList",
  components:{
      CartListItem
  },
  computed: {
    ...mapGetters(["cart","price"]),
  }
};
</script>
