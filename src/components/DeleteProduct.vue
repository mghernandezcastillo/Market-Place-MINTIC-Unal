<template>
  <div class="product_delete">
    <div class="container_product_delete">
      <h1 class="title">¿Está seguro?</h1>
      <button v-on:click="processDeleteProduct" class="btn_options">
        <strong>Confirmar</strong>
      </button>
      <button v-on:click="loadMyProducts" id="cancelar">
        <strong>Cancelar</strong>
      </button>
    </div>
  </div>
</template>
<script>
import jwt_decode from "jwt-decode";
import axios from "axios";
export default {
  name: "CreateProduct",
  data: function () {
    return {};
  },

  methods: {
    processDeleteProduct: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken(); // esto se utiliza para esperar a que la sección de comprobación y actualización delaccess token terminen, y que solo cuando hayan terminado

      let token = localStorage.getItem("token_access");
      let userId = jwt_decode(token).user_id.toString();
      let producto = this.id_producto;

      axios
        .delete(
          `https://technodevices-bk.herokuapp.com/producto/remove/${userId}/${producto}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((result) => {
          this.loaded = true; //booleano que se utiliza para renderizar la información del usuario únicamente cuando ya se ha consultado al componente lógico
          this.loadMyProducts();
        })
        .catch(() => {});
    },

    verifyToken: function () {
      return axios
        .post(
          "https://technodevices-bk.herokuapp.com/refresh/",
          { refresh: localStorage.getItem("token_refresh") },
          { headers: {} }
        )
        .then((result) => {
          localStorage.setItem("token_access", result.data.access);
        })
        .catch(() => {
          this.$emit("logOut");
        });
    },
    loadMyProducts: function () {
      this.$router.push({ name: "myProducts" });
    },
  },
  created: async function () {
    (this.id_producto = localStorage.getItem("id_producto"))
  },
};
</script>

<style>
#cancelar {
  background-color: darkcyan;
}
#cancelar:hover {
  background-color: rgb(31, 153, 153);
  cursor: pointer;
}

.product_delete {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 70px;
}

.title {
  font-family: Arial, Helvetica, sans-serif;
}

.imagen_title {
  margin: 0;
}

.combo_marcas {
  width: 100%;
  height: 40px;
  padding-left: 17px;
  margin-bottom: 10px;
}
.combo_categorias {
  width: 100%;
  height: 40px;
  padding-left: 17px;
  margin-bottom: 5px;
}

.container_product_delete {
  border: 3px solid #283747;
  border-radius: 10px;
  width: 25%;
  height: 60%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.product_delete h2 {
  color: #283747;
}
.product_delete form {
  width: 70%;
}
.product_delete input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #283747;
}
.product_delete button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0 25px 0;
}
.product_delete button:hover {
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;
}

.checkbox {
  font-weight: normal;
  display: flex;
  font-size: 15px;
  align-items: center;
}

.estado {
  margin-right: 5px;
  margin-left: 5px;
}

@media (max-width: 760px) {
  .container_product_delete {
    width: 80%;
  }
}
</style>