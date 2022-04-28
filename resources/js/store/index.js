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

    async addCartItem(context, data) {
        axios.put('http://localhost:8000api/item' + data._id, {
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
        await axios.get('http://localhost:8000/data/cart/product/' + data._id)
            .then(res => {
                test = {
                    "_id": res.data[0]._id,
                    "name": res.data[0].name,
                    "quantity": res.data[0].quantity,
                    "desc": res.data[0].description,
                    "price": res.data[0].price,
                };
            })
            .catch(err => console.log("Gagal : ", err));

        if (test) {
            const newQuantity = test.quantity + 1;
            axios.put('http://localhost:8000/data/cart/' + test._id, {
                quantity: newQuantity,
                name: test.name,
                price: data.price * newQuantity,
                description: test.description,
                product_id: test.product_id
            })
                .then(response => {
                    context.commit('UPDATE_CHECKOUT_BY_ID', response.data);
                })
                .catch(error => {
                    console.log(error.response.data);
                });
        } else {
            axios.post('http://localhost:8000/data/cart/', {
                name: data.name,
                quantity: 1,
                price: data.price,
                product_id: data._id
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
