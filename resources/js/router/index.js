import { createRouter, createWebHistory } from "vue-router";

// *******Product*****
import ProductComponent from "../components/product/ProductComponent.vue";


// *****todos**********
// import storetodo from "../components/Admin/todos/Create.vue";
// import todos from "../components/Admin/todos/Index.vue";
// import edittodo from "../components/Admin/todos/Edit.vue";

const routes = [
  // Product Routes
 { path: '/product', component: ProductComponent , name:'product',meta: {
  progress: {
    func: [
      { call: "color", modifier: "temp", argument: "#ffb000" },
      { call: "fail", modifier: "temp", argument: "#6e0000" },
      { call: "location", modifier: "temp", argument: "top" },
      {
        call: "transition",
        modifier: "temp",
        argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
      },
    ],
  },
},},

// Todos Routes
// { path: '/todos/create', component: storetodo , name:'store-todo'},
// { path: '/todos/index', component:todos  , name:'todos'},
// { path: '/todos/edit/:id', component:edittodo  , name:'edit-todo'},

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
