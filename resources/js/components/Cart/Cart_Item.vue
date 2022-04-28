<template>
    <tr>
      <th scope="row">{{cartItem.name}}</th>
      <td>Rp. {{cartItem.price}}</td>
      <td>{{cartItem.quantity}}</td>
      <td><button class="btn btn-dark" @click="deleteItem()">Delete</button></td>
    </tr>
</template>

<script>
export default {
  name: "CartListItem",
  props: ['cartItem'],
  methods: {
      deleteItem(){
          this.$store.dispatch('deleteItemFromCart',{
              id: this.cartItem.id,
              quantity: this.cartItem.quantity
          })
      }
  },
};
</script>