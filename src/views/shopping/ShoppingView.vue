<template>
  <div id="shopping">
    <h1>Carrinho de compras</h1>

    <ProductsList @signUp="registrarCliente" v-bind:client="client"/>
  </div>
</template>

<script>
import ProductsList from "@/components/ProductsList.vue";
import { clientService } from "../../services/ClientService";

export default {
  name: "ShoppingView",
  components: {
    ProductsList,
  },
  data() {
    return {
      client: {}
    }
  },
  methods: {
    registrarCliente() {
      this.$swal
        .fire({
          title: "Registrando Cliente",
          html: `<form>
            <div class="form-group">
              <label for="client-name">Nome Completo</label>
              <input type="text" class="form-control" id="client-name" placeholder="Nome...">
            </div>
            <div class="form-group">
              <label for="client-email">Email</label>
              <input type="email" class="form-control" id="client-email" placeholder="E-mail...">
            </div>
            <div class="form-group">
              <label for="client-password">Senha</label>
              <input type="password" class="form-control" id="client-password" placeholder="Senha...">
            </div>
          </form>`,
        })
        .then(() => {
          const name = document.getElementById("client-name").value;
          const email = document.getElementById("client-email").value;
          const password = document.getElementById("client-password").value;

          this.signUp({
            name,
            email,
            password,
          });
        });
      // this.$swal({
      //   html:
      //     '<input type="text" id="client-name">' +
      //     '<input type="text" id="client-mail">',
      //     '<input type="password" id="client-password" class="swal2-input">'
      // }).then(function (result) {
      //   swal(JSON.stringify(result));
      // });
    },
    async signUp(data) {
      this.client = await clientService.signUp(data);
    },
  },
  // created() {
  //   this.client = {
  //     name: "Lucas"
  //   }
  //   // this.registrarCliente();
  // },
};
</script>

<style>
#shopping {
  background-color: #fff;
  border-radius: 10px;

  box-sizing: border-box;
  padding: 20px;
}
</style>
