import { createApp } from 'vue'

import router from "./router";
import store from "./store/index";

import App from './components/App.vue';
import Admin from './components/Admin.vue';
import Pagination from 'laravel-vue-pagination';

// sweetalert2
import Swal from 'sweetalert2'
window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  width: '24rem',
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});
window.Toast = Toast;

// End sweetalert2

//Progressbar
import VueProgressBar from "@aacassandra/vue3-progressbar";

const options = {
  color: "#1ffaa3",
  failedColor: "#874b4b",
  thickness: "5px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300,
  },
  autoRevert: true,
  location: "top",
  inverse: false,
};
//  End Progressbar

// Toast
import Toaster from "@meforma/vue-toaster";
/*
this.$toast.show(`Hey! I'm here`);
this.$toast.success(`Hey! I'm here`);
this.$toast.error(`Hey! I'm here`);
this.$toast.warning(`Hey! I'm here`);
this.$toast.info(`Hey! I'm here`);

// Close all opened toast after 3000ms
this.$toast.success(`Hey! I'm here`);
setTimeout(this.$toast.clear, 3000);
 */
// Import Notification class
// import Notification from './Helpers/Notification'
// window.Notification = Notification;



const app = createApp({});

app.use(store);
app.use(router);
app.use(Toaster);
app.component('pagination', Pagination);
app.use(VueProgressBar, options);
app.component('admin', Admin);
app.component('app', App)
    .mount('#app');

require('./bootstrap');
