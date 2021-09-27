import axios from "axios";

const products = {
  namespaced: true,
  state: {
    products: [],
  },
  getters: {
    allproducts(state) {

      return state.products;
    },
  },
  mutations: {
    setproducts(state, products) {
      state.products = products;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      const res = await axios.get('/api/product', {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",

          Accept: "application/json",
        },
      });
      commit("setproducts", res.data);
    }
  },
};
export default products;
