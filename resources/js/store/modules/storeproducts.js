import axios from "axios";

const storeproducts = {
  namespaced: true,
  state: {
    storeproducts: [],
  },
  getters: {
    allstoreproducts(state) {

      return state.storeproducts;
    },
  },
  mutations: {
    setstoreproducts(state, storeproducts) {
      state.storeproducts = storeproducts;
    },
  },
  actions: {
    async storeProduct( form) {
      console.log("form" , form);
      let x = {};
      x = form ;
      console.log("x",x);
      const res = await axios.post('/api/product',x);
    }
  },
};
export default storeproducts;
