<template>
  <h1 class="title_page">Mis Productos
    <button class="btn_publicar" v-on:click="loadCreateProduct">
    Publicar nuevo producto
    </button>
  </h1>
  <div v-if="loaded" class="productos">
    <div v-for="item in productsArray" :key="item" class="listado_productos" v-on:click="getProductId(item.id)">
      <br />
      <img
        class="ig-img"
        :src="item.imagen1"
        alt="image"
        width="200"
        height="200"
      />
      <h3>
        <span class="precio">{{ item.precio }}</span>
      </h3>
      <h3>
        <span class="item_titulo">{{ item.titulo }}</span>
      </h3>
      <!--
      <h3>
        Vendedor: <span>{{ item.vendedor }}</span>
      </h3>
      <h3>
        Marca: <span>{{ item.marca }}</span>
      </h3>

      <h3>
        Descripción: <span>{{ item.descripcion }}</span>
      </h3>
      
      <h3 v-if="item.nuevo">
        Estado: <span >Nuevo</span>
      </h3>
      <h3 v-else>
        Estado: <span >Usado</span>
      </h3>
      <h3>
        Fecha publicación: <span>{{ item.fecha_publicacion }}</span>
      </h3>
      -->
    </div>
    
  </div>
</template>
<script>
import jwt_decode from "jwt-decode";
import axios from "axios";
export default {
  name: "Productos",
  data: function () {
    return {
      titulo: "",
      vendedor: 0,
      marca: "",
      precio: 0,
      descripcion: "",
      nuevo: false,
      categoria: "",
      fecha_publicacion: "",
      imagen1: "",
      productsArray: [],
      loaded: true,
    };
  },

  methods: {
    getData: async function () {
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

      axios
        //.get(`https://database-technodevices.herokuapp.com/productos/`)
        .get(`https://database-technodevices.herokuapp.com/productos/${userId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
        )
        
        .then((response) => {
          this.productsArray = response.data;
          this.int_to_price_format(this.productsArray)
        });
    },
    loadCreateProduct: function () {
      this.$router.push({ name: "createproduct" });
    },
    getProductId: function (data) {
      this.datoEnviado = data;
      let id_producto = this.datoEnviado;
      this.$emit("sendProductId", id_producto);
      this.$router.push({ name: "productDetails" });
    },
    verifyToken: function () {
      return axios
        .post(
          "https://database-technodevices.herokuapp.com/refresh/",
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
    int_to_price_format(array){
      const format = { style: 'currency', currency: 'COP', currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0, minimumFractionDigits: 0};
      const numberFormat2 = new Intl.NumberFormat('es-co', format);

      for (let index = 0; index < array.length; index++) {
        array[index].precio = (numberFormat2.format(array[index].precio));
      }
    },


  
  },
  created: async function () {
    this.getData();
  },
};
</script>

<style>
.title_page {
  font-size: 50px;
}

.productos {
  margin-top: 10px;
  display: inline-flex;
  text-align: center;
  height: 100%;
}

.item_titulo{
  color: aquamarine !important;
}

.ig-img {
  border: 1px solid #283747;
}

.productos h1 {
  font-size: 60px;
  color: #0f1316;
}
.productos h2 {
  font-size: 40px;
  color: #283747;
}

.listado_productos:hover {
  cursor: pointer;
}


</style>
