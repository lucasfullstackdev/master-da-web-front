<template>
  <div id="checklist">
    <h3>Escolha uma das opcoes abaixo</h3>

    <ul v-if="items">
      <li v-for="product in items" :key="product">
        <label>
          <div class="btn-add-product" @click="itemClicked(product)">
            <i class="fa-solid fa-plus"></i>
          </div>

          &nbsp;&nbsp;
          {{ product.name }}
        </label>
      </li>
    </ul>

    <!-- Exibindo o resumo dos produtos selecionados -->
    <div id="container-resume">
      <div class="resume-item" v-for="item in countItems" :key="item">
        <span v-if="item.count > 1">{{ item.count }}x </span>{{ item.name }}
        <span @click="removeItemFromOrder(item.id)">
          <i class="fa-solid fa-trash"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckList",
  props: ["selectedItems", "countItems", "items"],
  resume: [],
  methods: {
    itemClicked(product) {
      this.$emit("itemClicked", product);
    },
    removeItemFromOrder(product) {
      this.$emit("removeItemFromOrder", product);
    },
  },
};
</script>

<style>
ul {
  list-style-type: none;
  padding: 0px;
}

ul li {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

ul li input {
  /* width: 50px; */
}

ul li label {
  height: 40px !important;
  width: 300px;

  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 10px;
}

/** Botao para adicionar o produto a lista de compras */
.btn-add-product {
  background-color: red;
  width: 20px;
  height: 20px;

  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
}

.btn-add-product .fa-plus {
  color: white !important;
  font-size: 0.8em;
}

/** Resumo */
#container-resume {
  /* background-color: red; */
  margin: 20px 0px;
}

#container-resume .resume-item {
  /* background-color: blue; */
  line-height: 30px;
}

#container-resume .resume-item .fa-trash {
  margin-left: 15px;
}
</style>
