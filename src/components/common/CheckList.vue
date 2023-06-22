<template>
  <div id="checklist">
    <h3>Escolha uma das opcoes abaixo</h3>

    <ul v-if="items">
      <li v-for="product in items" :key="product">
        <label :for="product.id">
          <input
            type="checkbox"
            :id="product.id"
            :name="product.name"
            :value="product.id"
            :checked="selectedItems.includes(product.id)"
            @click="itemClicked(product)"
          />
          &nbsp;&nbsp;
          {{ product.id }} -  {{ product.name }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "CheckList",
  props: ['selectedItems', 'items'],
  methods: {
    itemClicked(product) {
      this.$emit('itemClicked', product);
    }
  }
};
</script>

<style>
#checklist {
  /* box-sizing: border-box; */
  /* padding: 10px; */
}

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
</style>
