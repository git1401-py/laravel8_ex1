<template>
    <div class="container my-5">
        <!-- Create -->
        <div class="row justify-content-end mb-2">
            <div class="col-4">
                <button class="btn btn-primary" @click="create">
                    <i class="fas fa-plus-circle"></i> Create
                </button>
            </div>
            <div class="col-4">
                <form @keyup="fetchProducts">
                    <div class="input-group">
                        <input
                            v-model="search"
                            type="text"
                            class="form-control"
                            placeholder="search"
                        />
                        <div class="input-group-append">
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- Create End -->

        <!-- Table -->
        <div class="row">
            <div class="col-4">
                <div class="card">
                    <h3 class="card-header">
                        {{ isEditMode ? "Edit" : "Create" }}
                    </h3>
                    <div class="card-body">
                        <alert-error
                            :form="form"
                            style="text-align: right"
                            class="small"
                            message="خطاهای زیر را برطرف کنید"
                        ></alert-error>
                        <form
                            @submit.prevent="
                                isEditMode ? updateProduct() : storeProduct()
                            "
                            @keydown="form.onKeydown($event)"
                            enctype="multipart/form-data"
                        >
                            <div class="form-group">
                                <label for="name">Name: </label>
                                <input
                                    id="name"
                                    type="text"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has('name'),
                                    }"
                                    v-model="form.name"
                                />
                                <div
                                    class="text-danger small"
                                    style="text-align: right"
                                    v-if="form.errors.has('name')"
                                    v-html="form.errors.get('name')"
                                />
                            </div>
                            <div class="form-group">
                                <label for="price">Price: </label>
                                <input
                                    id="price"
                                    type="number"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has('price'),
                                    }"
                                    v-model="form.price"
                                />
                                <div
                                    class="text-danger small"
                                    style="text-align: right"
                                    v-if="form.errors.has('price')"
                                    v-html="form.errors.get('price')"
                                />
                            </div>
                            <Button :form="form" class="btn btn-primary">
                                <i class="fas fa-save"></i> Save
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product.id">
                            <td>{{ product.id }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.price }}</td>
                            <td>
                                <button
                                    class="btn btn-success btn-sm me-1"
                                    @click="editProduct(product)"
                                >
                                    <i class="fas fa-edit"></i> Edit
                                </button>
                                <button
                                    class="btn btn-danger btn-sm"
                                    @click="deleteProduct(product)"
                                >
                                    <i class="fas fa-trash-alt"></i> Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- Table End -->

        <!-- <pagination :data="products" @pagination-change-page="fetchProducts"></pagination> -->
    </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import axios from "axios";
import Form from "vform";

import { AlertError, Button } from "vform/src/components/bootstrap5";

import {
    onMounted,
    onUnmounted,
    onUpdated,
    watch,
    watchEffect,
} from "@vue/runtime-core";
export default {
    components: {
        AlertError,
        Button,
    },
    setup() {
        const store = useStore();
        console.log("in setup");

        // const products = ref([]);
        // fetchProducts();
        // store.dispatch("products/fetchProducts");
        // const products = computed(()=> store.getters["products/allproducts"]);
        onUpdated(() => {
            console.log("in onUpdated");
        });
        onMounted(() => {
            console.log("in onMounted");
        });
        onUnmounted(() => {
            console.log("in onUnmounted");
        });
        watchEffect(() => {
            console.log("in watchEffect");
        });

        // async function fetchProducts() {
        //     await store.dispatch("products/fetchProducts");
        //     products.value = store.getters["products/allproducts"];
        // }

        return {};
    },
    data() {
        return {
            isEditMode: false,
            form: new Form({
                id: "",
                name: "",
                price: "",
            }),
            error: "",
            products: {},
            search: "",
        };
    },
    mounted() {
        this.fetchProducts();
    },
    methods: {
        //        searchFN(){
        //            axios.get(`/api/product?search=${this.search}`).then((response) => {
        //   this.products = response.data;
        //         });
        //        },
        fetchProducts(pageNumber = 1) {
      this.$Progress.start();
            axios
                .get(`/api/product?page=${pageNumber}&search=${this.search}`)
                .then((response) => {
                    this.products = response.data;
                    this.$Progress.finish();
                })
                .catch((error) => {
                    this.error = error.response.data.massege;
                    this.$Progress.fail();
                    });
                
        },
        storeProduct() {
            this.form
                .post("/api/product")
                .then(() => {
                    Toast.fire({
                        icon: "success",
                        title: "فیلد ذخیره شد",
                    });
                    // this.$toast.success(`فیلد ذخیره شد`);
                    setTimeout(this.$toast.clear, 3000);
                    // Notification.success();
                    this.fetchProducts();
                    this.form.reset();
                })
                .catch((error) => (this.error = error.response.data.massege));
        },
        updateProduct() {
            this.form
                .put(`/api/product/${this.form.id}`)
                .then(() => {
                    Toast.fire({
                        icon: "success",
                        title: "فیلد ویرایش شد",
                    });
                    // this.$toast.success(`فیلد ویرایش شد`);
                    setTimeout(this.$toast.clear, 3000);
                    this.fetchProducts();
                    this.form.reset();
                    this.isEditMode = false;
                })
                .catch((error) => (this.error = error));
        },
        editProduct(product) {
            this.form.clear();
            this.form.fill(product);
            this.isEditMode = true;
        },
        create() {
            this.form.clear();
            this.form.reset();
            this.isEditMode = false;
        },
        deleteProduct(product) {
            Swal.fire({
                title: " مطمئنید؟",
                text: "شما قادر به برگشت اطلاعات نخواهید بود",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "بله، حذف شود",
            }).then((result) => {
                if (result.value) {
                    axios
                        .delete(`/api/product/${product.id}`)
                        .then(() => {
                            this.fetchProducts();
                            Toast.fire({
                                icon: "success",
                                title: "فیلد حذف شد",
                            });
                        })
                        .catch((error) => (this.error = error));
                }
            });
        },
    },
};
</script>

<style></style>
