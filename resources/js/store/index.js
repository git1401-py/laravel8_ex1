import { createStore } from "vuex";
import products from "./modules/products"
import storeproducts from "./modules/storeproducts"

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    products,
    storeproducts
  },
});
