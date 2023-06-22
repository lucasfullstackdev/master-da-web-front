<template>
  <h1>Lista de Produtos</h1>
  <CheckList
    @itemClicked="itemSelecionado"
    v-bind:selectedItems="selectedItems"
    v-bind:items="items"
  />

  <button id="fechar-pedido" @click="closeOrder">Fechar pedido</button>
</template>

<script>
import { productService } from "../services/ProductService";
import { shoppingService } from "../services/ShoppingService";
import CheckList from "./common/CheckList.vue";

export default {
  name: "ProductsList",
  props: ["client"],
  components: {
    CheckList,
  },
  items: [],
  data() {
    return {
      selectedItems: [],
      items: [],
    };
  },
  watch: {
    client: function (client) {
      const products = this.selectedItems.map((item) => {
        return {
          name: item.name,
          price: item.price,
        };
      });

      this.sendOrder({
        products,
        user_id: client.id,
      });
    },
  },
  methods: {
    async sendOrder(orderData) {
      await shoppingService.registerOrder(orderData);
      
    },
    itemSelecionado(product) {
      if (this.selectedItems.includes(product.id)) {
        this.selectedItems = this.selectedItems.filter(
          (item) => item.id !== product.id
        );
      } else {
        this.selectedItems.push(product);
      }
    },
    closeOrder() {
      this.$emit("signUp");
    },
  },
  async created() {
    this.items = await productService.listAll();
    this.$swal.fire("Sucesso!", "Seu pedido será processado!", "success");
  },
};
</script>
