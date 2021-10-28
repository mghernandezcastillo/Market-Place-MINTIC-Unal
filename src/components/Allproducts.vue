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
    
    <div v-for="item in datosPaginados" :key="item" class="listado_productos" v-on:click="getProductId(item.id)">
      <br />
      <img class="ig-img" :src="item.imagen1" alt="image" width="200" height="200"/>
      <h3>
        <span class="precio">{{ item.precio }}</span>
      </h3>
      <h3>
        <span class="titulo_producto">{{ item.titulo }}</span>
      </h3>
    </div>

    <!---------------------------- VERSION CON TABLAS ------------------------------------------
    <div class="row">
  <table class="table">
  <thead>
    <tr>
      <th scope="col">Imagen</th>
      <th scope="col">Precio</th>
      <th scope="col">Título</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in datosPaginados" :key="item" class="listado_productos" v-on:click="getProductId(item.id)">

      <td>
        <img class="ig-img" :src="item.imagen1" alt="image" width="200" height="200"/>
      </td>

      <td>
      <h3>
        <span class="precio">{{ item.precio }}</span>
      </h3>
      </td>
      
      <td>
        <h3>
        <span class="titulo_producto">{{ item.titulo }}</span>
        </h3>
      </td>
    </tr>
  </tbody>
</table>
<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" v-on:click="getPreviusPage()"><a class="page-link" href="#">Previous</a></li>

    <li v-for="pagina in totalPaginas()" :key="pagina" v-on:click="getDataPagina(pagina)" class="page-item"><a class="page-link" href="#">{{pagina}}</a></li>

    <li class="page-item" v-on:click="getNextPage()"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>

    </div>-->

  </div>
  <div class="navigation_container">
      <nav aria-label="Page navigation" class="page_navigation">
    <ul class="pagination">
      <li class="page-item" v-on:click="getPreviusPage()"><a class="page-link" href="#"><strong>Anterior</strong></a></li>

      <li v-for="pagina in totalPaginas()" :key="pagina" v-on:click="getDataPagina(pagina)" class="page-item"><a class="page-link" href="#"><strong>{{pagina}}</strong></a></li>

      <li class="page-item" v-on:click="getNextPage()"><a class="page-link" href="#"><strong>Siguiente</strong></a></li>
      
    </ul>
    <div class="pagina_actual"><strong>página actual</strong><h6 class="num_pag"><strong>{{ paginaActual }}</strong></h6></div>
    </nav>   
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
      elementosPorPagina: 5,
      datosPaginados: [],
      paginaActual: 1,
    };
  },
  


  methods: {
    getData: async function () {
      axios
        .get(`https://technodevices-bk.herokuapp.com/productos/`)
        .then((response) => {
          this.productsArray = response.data;
          this.int_to_price_format(this.productsArray)
          this.getDataPagina(1);
        });
    },
    getProductId: function (data) {
      this.datoEnviado = data;
      let id_producto = this.datoEnviado;
      this.$emit("sendProductId", id_producto);
      this.$router.push({ name: "productDetails" });
    },
    int_to_price_format(array){
      const format = { style: 'currency', currency: 'COP', currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0, minimumFractionDigits: 0};
      const numberFormat2 = new Intl.NumberFormat('es-co', format);

      for (let index = 0; index < array.length; index++) {
        array[index].precio = (numberFormat2.format(array[index].precio));
      }
    },
    totalPaginas(){
      return Math.ceil(this.productsArray.length/this.elementosPorPagina)
    },

    getDataPagina(noPagina){
      this.paginaActual = noPagina
      this.datosPaginados = [];
      let ini = (noPagina * this.elementosPorPagina) - this.elementosPorPagina;
      let fin = (noPagina * this.elementosPorPagina);
      this.datosPaginados = this.productsArray.slice(ini,fin);
    },

    getPreviusPage(){
      if(this.paginaActual > 1){
        this.paginaActual--;
      }
      this.getDataPagina(this.paginaActual);
      
    },

    getNextPage(){
      if(this.paginaActual < this.totalPaginas()){
        this.paginaActual++;
      }
      this.getDataPagina(this.paginaActual);
      
    },

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
  font-size: 20px;
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

.navigation_container{
  width: 100%;
  display: flex;
  justify-content: center;
}

.num_pag{
  color: #2570d1;
}


 @media (max-width: 760px) {
  .title_page{
    font-size: 20px !important;
  }
  .title_disponibles{
    font-size: 18px !important;
  }

  .ig-img{
    margin-bottom: 10px !important;
  }
}
</style>
