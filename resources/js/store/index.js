import Vuex from 'vuex';
import Vue from 'vue';
import axios from "axios";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartItems: [],
    cartTotal: 0,
    productItems: [],
    totalPrice:0

  },
  getters: {
    cart: state => state.cartItems,
    cartTotal: state => state.cartTotal,
    product: state => state.productItems,
    price: state => state.totalPrice

    
  },
  mutations: {
    UPDATE_CART_ITEMS (state, payload) {
        state.cartItems = payload;
    },

    ADD_TO_CART(state,{id,name,price,quantity}){
        state.totalPrice += price;
        state.cartTotal += quantity;
        let findProduct = state.productItems.find(o => o.name === name)
        
        findProduct.stock -= quantity;
        let findCart = state.cartItems.find(o => o.name === name)
        if(findCart){
            findCart.quantity +=1;
        }else{
            state.cartItems.push({
                id,
                name,
                price,
                quantity
            })
        }
    },

    UPDATE_PRODUCT_BY_ID(state, payload) {
        state.products = state.products.map(product => {
            if (product._id === payload._id) {
                return Object.assign({}, product, payload);
            }
            return product;
        });
    },

    ADD_STOCK_PRODUCT(state, payload) {
        state.products = state.products.map(item => {
            if (item._id === payload._id) {
                return Object.assign({}, item, payload);
            }
            return item;
        });
    },


    UPDATE_PRODUCT_ITEMS (state, payload) {
        state.productItems = payload;
    },

    DELETE_ITEM_CART(state,{id,quantity,price}){
        let totalHarga = state.totalPrice += price;
        let findProduct = state.productItems.find(o => o.id === id)
        let findCart = state.cartItems.find(o => o.id === id)
        if(quantity === 1){
            state.cartItems.splice(state.cartItems.findIndex(function(i){
                return i.id === id;
            }), 1);
            findProduct.stock += 1;
            splice(totalHarga);
        }else{
            findCart.quantity -= 1;
            findProduct.stock += 1;
            splice(totalHarga);
        }

        
    }


  },
  actions: {
    getCartItems ({ commit }) {
        axios.get('api/item').then((response) => {
          commit('UPDATE_CART_ITEMS', response.data.data)
        });
    },

    ADD_CART_ITEM(state, payload) {
        state.checkoutItems.push(payload);
    },

    UPDATE_CHECKOUT(state) {
        state.totalCheckout += 1;
    },

    async addCartItem(context, data) {
        axios.put('http://localhost:8000/api/item' + data._id, {
            stock: data.stock - 1,
            name: data.name,
            desc: data.desc,
            price: data.price
        })
            .then(response => {
                context.commit('UPDATE_PRODUCT_BY_ID', response.data);
                context.commit('UPDATE_CHECKOUT');
            })
            .catch(error => {
                console.log(error);
            });

        // Menambahkan atau mengupdate data di cart
        let test;
        await axios.get('http://localhost:8000/api/cart' + data._id)
            .then(res => {
                test = {
                    "name": res.data[0].name,
                    "quantity": res.data[0].quantity,
                    "price": res.data[0].price,
                };
            })
            .catch(err => console.log("Gagal : ", err));

        if (test) {
            const newQuantity = test.quantity + 1;
            axios.put('http://localhost:8000/api/cart' + test._id, {
                quantity: newQuantity,
                name: test.name,
                price: data.price * newQuantity,
                desc: test.desc,
            })
                .then(response => {
                    context.commit('UPDATE_CHECKOUT_BY_ID', response.data);
                })
                .catch(error => {
                    console.log(error.response.data);
                });
        } else {
            axios.post('http://localhost:8000/cart/', {
                name: data.name,
                quantity: 1,
                price: data.price,
            })
                .then(res => {
                    context.commit('ADD_CART_ITEM', res.data);
                })
                .catch(error => {
                    console.log(error.response.data)
                });
        }
    },

    addProductToCart({commit},{id,name,price , quantity}){
        commit('ADD_TO_CART',{id,name,price, quantity});
    },

    getProductItems ({ commit }) {
        axios.get(`api/item`).then((response) => {
          commit('UPDATE_PRODUCT_ITEMS', response.data.data)
        });
    },
    deleteItemFromCart({commit},{id,quantity,price}){
        commit('DELETE_ITEM_CART',{id,quantity});
    }
  }
  
})
