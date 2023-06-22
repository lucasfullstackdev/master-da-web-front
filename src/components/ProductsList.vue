<template>
  <h1>Lista de Produtos</h1>
  <CheckList
    @itemClicked="itemSelecionado"
    @removeItemFromOrder="removerItem"
    v-bind:selectedItems="selectedItems"
    v-bind:countItems="countItems"
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
      countItems: {},
      countItemsAux: {},
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
      this.$swal.fire("Sucesso!", "Seu pedido será processado!", "success");
    },
    itemSelecionado(product) {
      this.selectedItems.push(product);

      /** Realizando a contagem */
      this.countItemsAux[product.id] =
        (this.countItemsAux[product.id] || 0) + 1;
      this.countItems[product.id] = {
        count: this.countItemsAux[product.id],
        id: product.id,
        name: product.name,
      };
    },
    removerItem(productId) {
      this.selectedItems = this.selectedItems.filter(
        (item) => item.id !== productId
      );
      delete this.countItems[productId];
      delete this.countItemsAux[productId];
    },
    closeOrder() {
      this.$emit("signUp");
    },
  },
  async created() {
    this.items = await productService.listAll();
  },
};
</script>
