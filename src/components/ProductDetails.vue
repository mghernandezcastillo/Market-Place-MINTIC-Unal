
<template>
  <h1 class="title_page">Información del producto</h1>
  <div v-if="loaded" class="producto">
    <div class="listado">
      <br />
      <img class="product_img" :src="imagen1" alt="image" v-on:click="loadLightboxBg"/>
      <h3>
        <span class="titulo">{{ titulo }}</span>
      </h3>
      <h3>
        <span class="precio">{{ precio }}</span>
      </h3>
      <h3 class="label_item">
        Marca: <span >{{ marca }}</span>
      </h3>

      <h3 class="label_item">
        Descripción: <span >{{ descripcion }}</span>
      </h3>

      <h3 v-if="nuevo" class="label_item">Estado: <span >Nuevo</span></h3>
      <h3 v-else class="label_item">Estado: <span >Usado</span></h3>
      <h3 class="label_item">
        Fecha publicación: <span >{{ fecha_publicacion }}</span>
      </h3>
      <h3 class="label_item">
        Vendedor: <span>{{ vendedor }}</span>
      </h3>
      <h3 class="label_item">
        Teléfono Contácto: <span ><a :href="'http://wa.me/' + 57 +  telefono_contacto " target="blank">{{telefono_contacto}}</a></span>
      </h3>

      <h3 class="label_item">
        Correo Contácto: <span >{{ email_contacto }}</span>
      </h3>

      <div class="btns_product_options">
      <button v-if="is_user && is_auth" v-on:click="loadUpdateProduct" class="btn_options btn_actualizar">Actualizar datos</button>
      <button v-if="is_user && is_auth" v-on:click="loadDeleteProduct" class="btn_options btn_eliminar">Eliminar publicación</button>
      </div>

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
      vendedor: "",
      vendedor_id: "",
      marca: "",
      precio: 0,
      descripcion: "",
      nuevo: false,
      categoria: "",
      fecha_actualizacion: "",
      imagen1: "",
      productsArray: [],
      loaded: true,
      id_producto: "",
      is_auth: false,
      is_user: false,
      telefono_contacto: "",
      name: "",
      email_contacto: "",
      userId_to_compare: 0,
      userId: 0,
      idVendedor: 0,
      lightboxBg: document.createElement('div'),
    };
  },

  methods: {
    getData: async function () {
      let producto = this.id_producto;

      this.is_auth = localStorage.getItem("isAuth");
      if (this.is_auth) {
        let token = localStorage.getItem("token_access");
        this.userId = jwt_decode(token).user_id.toString();
      }
      
      axios
        .get(`https://technodevices-bk.herokuapp.com/producto/${producto}/`)
        .then((response) => {
          console.log(response.data)
          this.titulo = response.data[0].titulo;
          let datosVendedor = response.data[0].vendedor.split("-");
          console.log(datosVendedor)
          this.idVendedor = datosVendedor[1];
          this.vendedor = datosVendedor[0];
          this.precio = response.data[0].precio
          this.int_to_price_format(this.precio)
          this.marca = response.data[0].marca;
          this.descripcion = response.data[0].descripcion;
          this.nuevo = response.data[0].nuevo;
          this.categoria = response.data[0].categoria;
          this.fecha_publicacion = response.data[0].fecha_actualizacion;
          this.telefono_contacto = response.data[0].telefono_contacto;
          this.email_contacto = response.data[0].email_contacto;
          this.imagen1 = response.data[0].imagen1;
          this.is_user = (this.userId == this.userId_to_compare)
          this.getContactData(this.idVendedor);
        });
    },

    getContactData: async function (idvendedor) {
      axios
        .get(`https://technodevices-bk.herokuapp.com/contacto/${idvendedor}/`)
        .then((response) => {
          this.telefono_contacto = response.data[0].telefono;
        });
    },

    getAccountData: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("productos");
        return;
      }
      await this.verifyToken(); // esto se utiliza para esperar a que la sección de comprobación y actualización delaccess token terminen, y que solo cuando hayan terminado

let token = localStorage.getItem("token_access");
      let userId = jwt_decode(token).user_id.toString();

      axios
        .get(`https://technodevices-bk.herokuapp.com/user/${userId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          console.log(result.data)
          this.name = result.data.account.name;
          this.loaded = true;
          this.is_user = this.name == this.vendedor
        })
        .catch(() => {
          this.$emit("logOut");
        });
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




    loadUpdateProduct: function () {
      this.$router.push({ name: "updateProduct" });
    },
    loadDeleteProduct: function () {
      this.$router.push({ name: "deleteProduct" });
    },
    int_to_price_format(price){
      const formate = { style: 'currency', currency: 'COP', currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0, minimumFractionDigits: 0};
      const numberFormat2 = new Intl.NumberFormat('es-co', formate);
      this.precio = numberFormat2.format(price);
    },

    loadDiv: function () {
      this.lightboxBg.id = 'lightboxBg';
      document.body.appendChild(this.lightboxBg);
    },

    loadLightboxBg: function () {
      
      this.lightboxBg.classList.add('active');
      const lightboxImg = document.createElement('img');
      lightboxImg.src = this.imagen1;
      lightboxImg.id = 'lightboxImg';
      this.lightboxBg.appendChild(lightboxImg);
    },

    closeLightboxBg: function () {
      this.lightboxBg.classList.remove('active');
      if(this.lightboxBg.childNodes.length != 0){
      this.lightboxBg.removeChild(this.lightboxBg.childNodes[0]);
      }
    }

  },

  created: async function () {
    window.scrollTo(0,0);
    (this.id_producto = localStorage.getItem("id_producto")),
    this.getAccountData();
    this.getData();
    this.loadDiv();
    document.addEventListener('click', (e) => {
      if (e.target.id === 'lightboxBg') {
        this.closeLightboxBg();
      }
    });
  },
};

</script>

<style >
.title_page {
  font-size: 50px;
}

.producto {
  margin-top: 10px;
  display: flex;
  text-align: center;
  justify-content: center;
  height: 100vh;
  flex-wrap: wrap;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 100px;
}

.producto span {
  color: #ffffff;
  font-weight: bold;
  font-size: 20px;
}

.image_container{
    width: 70vh;
    height: 70vh;
    background-color: yellow;
    position: fixed;
    display: none;
}

.product_img {
  transition: 1s;
  height: 200px;
  width: 200px;
  cursor: pointer;
  object-fit: cover;
  object-position: center center;
}

.product_img:hover{
  filter: grayscale(50%);
  transform: scale(1.1);
}

.producto h1 {
  font-size: 60px;
  color: #0f1316;
}
.producto h2 {
  font-size: 40px;
  color: #283747;
}

.label_item{
  color: aquamarine !important;
  font-size: 23px;
  
}

.titulo{
  font-size: 24px;
  color: aquamarine !important;
}

.precio {
  font-size: 23px;
  color: #78ba71 !important;
}


.listado {
  height: fit-content;
  width: auto;
  margin: 10px;
  border: 1px solid #283747;
  border-radius: 2%;
  padding-bottom: 5px;
  padding-right: 5px;
  padding-left: 5px;
  background-color: #283747;
}

.btns_product_options{
  display: flex;
  justify-content: center;
}

.btn_eliminar{
  background-color: rgb(209, 25, 62);
  font-size: 15px;
  margin-left: 5px;
}

.btn_eliminar:hover{
  background-color: rgb(255, 0, 51);
  color: #ffff;
}

.btn_actualizar{
  background-color: #13b629;
  color: #ffff;
  width: 130px;
  font-size: 15px;
  margin-right: 5px;

}

.btn_actualizar:hover{
  background-color: #24c53a;
  color: #ffff;
}

.btn_contactar{
  background-color: #13b629;
  color: #ffff;
  width: 130px;
  font-size: 15px;

}

.btn_contactar:hover{
  background-color: #24c53a;
  color: #ffff;
}

#lightboxBg {
  position: fixed;
  z-index: 150;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(150, 150, 150, .6);
  backdrop-filter: blur(2px);
  display:none;
}

#lightboxBg.active{
  display: grid;
  place-items: center;
}

#lightboxImg{
  max-width: 80vw;
  max-height: 80vh;
  border: 4px solid white;
  box-shadow: 1px 3px 20px rgba(0, 0, 0, .5);
}
</style>
