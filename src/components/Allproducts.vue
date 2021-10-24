<template>
<h1 class="title_page">Productos Destacados</h1>
<div id="slider">
  <figure>
    <img src="../assets/slider-images/banner1.png" alt="slider1">
    <img src="../assets/slider-images/banner2.png" alt="slider2">
    <img src="../assets/slider-images/banner3.png" alt="slider3">
    <img src="../assets/slider-images/banner1.png" alt="slider4">
    <img src="../assets/slider-images/banner2.png" alt="slider5">
  </figure>
</div>
<h6 class="title_disponibles">Productos Disponibles</h6>
  <div v-if="loaded" class="productos">
    
    <div v-for="item in productsArray" :key="item" class="listado_productos" v-on:click="getProductId(item.id)">
      <br />
      <img class="ig-img" :src="item.imagen1" alt="image" width="200" height="200"/>
      <h3>
        <span class="precio">{{ item.precio }}</span>
      </h3>
      <h3>
        <span class="titulo_producto">{{ item.titulo }}</span>
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
import axios from "axios";
export default {
  name: "Productos",
  data: function () {
    return {
      titulo: "",
      vendedor: "",
      marca: "",
      precio: "",
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
      axios
        .get(`https://database-technodevices.herokuapp.com/productos/`)
        .then((response) => {
          this.productsArray = response.data;
          this.int_to_price_format(this.productsArray)
        });
    },
    getProductId: function(data){
      this.datoEnviado = data;
      let id_producto = this.datoEnviado;
      this.$emit('sendProductId', id_producto)
      this.$router.push({ name: "productDetails" });
    },
    int_to_price_format(array){
      const format = { style: 'currency', currency: 'COP', currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0, minimumFractionDigits: 0};
      const numberFormat2 = new Intl.NumberFormat('es-co', format);

      for (let index = 0; index < array.length; index++) {
        array[index].precio = (numberFormat2.format(array[index].precio));
      }
    }

  },
  created: async function () {
    this.getData();
  },



};
</script>

<style>

.title_page{
  font-size: 50px;
  font-family: Arial, Helvetica, sans-serif;
  color: #283747;
}
.title_disponibles{
  font-size: 30px;
  font-family: Arial, Helvetica, sans-serif;
  color: #283747;
  margin-bottom: 0;
  margin-top: 10px;
}

#slider{
  overflow: hidden;
}

#slider figure{
  position: relative;
  width: 500%;
  margin: 0;
  left: 0;
  animation: 20s slider infinite;
}

#slider figure img{
  float: left;
  width: 20%;
}

@keyframes slider {
  0% {
    left: 0;
  }
  20% {
    left: 0;
  }
  25% {
    left: -100%;
  }
  45% {
    left: -100%;
  }
  50% {
    left: -200%;
  }
  70% {
    left: -200%;
  }
  75% {
    left: -300%;
  }
  95% {
    left: -300%;
  }
  100% {
    left: -400%;
  }
}

.productos {
  margin-top: 10px;
  display: flex;
  text-align: center;
  height: 100%;
  justify-content: center;
  flex-wrap: wrap;

}

.ig-img{
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
.productos h3 {
  font-family: Arial, Helvetica, sans-serif;
}
.productos span {
  color: #58af4f;
  font-weight: bold;
}

.precio{
  font-size: 23px;
  color: #78ba71 !important;;
}

.titulo_producto{
  color: aquamarine !important;
}

.listado_productos {
  height: auto;
  width: min-content;
  margin: 10px;
  border: 1px solid #283747;
  border-radius: 2%;
  padding-bottom: 5px;
  padding-right: 5px;
  padding-left: 5px;
  background-color: #283747;

}

.listado_productos:hover{
  cursor: pointer;
}

 @media (max-width: 760px) {
  .title_page{
    font-size: 20px !important;
  }
  .title_disponibles{
    font-size: 18px !important;
  }
}
</style>
