<template>
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">{{productItem.name}}</h5>
          <p class="card-text">{{productItem.desc}}</p>
          <a class="btn btn-light">{{productItem.stock}}</a>
          <a class="btn btn-light">Rp. {{productItem.price}}</a>
          <button class="btn btn-primary" @click="addToCart()">Add to Cart</button>
        </div>
      </div>
    
</template>

<script>


export default {
  name: "ProductListItem",
  props: ["productItem"],
  methods: {
      addToCart(){
          this.$store.dispatch('addProductToCart',{
              id: this.productItem.id,
              name: this.productItem.name,
              price: this.productItem.price,
              quantity: 1
          })
      }
  },
};
</script>