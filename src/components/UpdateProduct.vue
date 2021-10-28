<template>

  <div class="product_update">
    <div class="container_product_update">
      <h1 class="title">Actualizar Producto</h1>
      <h2 class="title_product">{{ title_product }}</h2>
      <h4 class="subtitle_product">{{ description_product }}</h4>

      <form v-on:submit.prevent="processUpdateProduct">
        <label class="checkbox">
          <input type="radio" value="True" id="nuevo" name="rememberMe" v-model="producto.nuevo" required/>
          <p class="estado">nuevo</p>
          <input type="radio" value="False" id="usado" name="rememberMe" v-model="producto.nuevo" required/>
          <p class="estado">usado</p>
        </label>
        <br />
        <h4 class="imagen_title">Imagen del producto</h4>
        <div class="button-wrapper">
          <span class="label">
            <strong>Upload File</strong>
          </span>
        <input type="file" @change="updatePhoto"  id="upload" name="upload" class="upload-box" required placeholder="Upload File"/>
        </div>


        <input type="text" v-model="producto.titulo" placeholder="Titulo del anuncio" maxlength="36" id="titulo" required/>
        
        <select v-model="producto.categoria" class="combo_categorias" id="categoria" v-on:change="traerMarcas" required>
          <option value="" disabled>Categoría</option>
          <option v-for="categoria in categorias" :key="categoria" class="listado_marcas">
            {{ categoria.nombre }}
          </option>
        </select>
        
        <select v-model="producto.marca" class="combo_marcas" id="marca" required>
          <option value="" disabled>Marca</option>
          <option v-for="marca in marcas" :key="marca" class="listado_marcas">
            {{ marca.nombre }}
          </option>
        </select>
        <input type="number" v-model="producto.precio" placeholder="Precio" id="precio" required/>
        
        <input type="text" v-model="producto.descripcion" placeholder="Descripcion" id="descripcion" required/>  
        <button type="submit">Actualizar</button>
     
      </form>
    </div>
  </div>
</template>
<script>
import jwt_decode from "jwt-decode";
import axios from "axios";
export default {
  name: "CreateProduct",
  data: function () {
    return {
      producto: {
        titulo: "",
        marca: "",
        categoria: "",
        precio: null,
        descripcion: "",
        estado: "",
        imagen1: "",
        imagen2: "",
        imagen3: "",
        loaded: false,
        fecha_actualizacion: this.getDateToday(),
      },
      marcas: [],
      categorias: [],
    };
  },

  methods: {
    processUpdateProduct: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken(); 

      let token = localStorage.getItem("token_access");
      let userId = jwt_decode(token).user_id.toString();
      let producto = this.id_producto;

      axios
        .put(
          `https://technodevices-bk.herokuapp.com/producto/update/${userId}/${producto}/`,
          this.producto,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((result) => {
          this.loaded = true; 
          this.loadMyProducts();
        })
        .catch(() => {});
    },

    loadMyProducts: function () {
      this.$router.push({ name: "myProducts" });
    },
    traerMarcas: async function () {
      axios
        .get(`https://technodevices-bk.herokuapp.com/marcas/`)
        .then((result) => {
          this.marcas = []
          for (let index = 0; index < result.data.length; index++) {
            if(categoria.value == result.data[index].categoria){
              this.marcas.push(result.data[index])
            }
          }
        })
        .catch(() => {});
    },

    traerTodasLasCategorias: async function () {
      axios
        .get(`https://technodevices-bk.herokuapp.com/categorias/`)
        .then((result) => {
          for (let index = 0; index < result.data.length; index++) {
            this.categorias.push(result.data[index]);
          }
        })
        .catch(() => {});
    },

    getDataUpdate: async function () {
      let producto = this.id_producto;

      console.log(producto);
      this.is_auth = localStorage.getItem("isAuth");
      console.log(this.is_auth);
      if (this.is_auth) {
        let token = localStorage.getItem("token_access");
        this.userId = jwt_decode(token).user_id.toString();
      }
      
      axios
        .get(`https://technodevices-bk.herokuapp.com/producto/${producto}/`)
        .then((response) => {
          this.title_product = response.data[0].titulo;
          this.description_product = response.data[0].descripcion;
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
    updatePhoto(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onloadend = (file) => {
        this.producto.imagen1 = reader.result;
      };
      reader.readAsDataURL(file);
    },

      getDateToday: function (){
      let date = new Date()

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      if(month < 10){
        return(`${day}-0${month}-${year}`)
      }else{
        return(`${day}-${month}-${year}`)
      }
    }
  },
  created: async function () {
    (this.id_producto = localStorage.getItem("id_producto")),
    this.traerTodasLasCategorias();
    this.getDataUpdate();
  },
};
</script>

<style>
.product_update {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 70px;
}

.button-wrapper {
  position: relative;
  width: 150px;
  text-align: center;
  margin: 20% auto;
}

.button-wrapper span.label {
  position: relative;
  z-index: 0;
  display: inline-block;
  width: 100%;
  background: #00bfff;
  cursor: pointer;
  color: #fff;
  padding: 10px 0;
  text-transform:uppercase;
  font-size:12px;
}

#upload {
    display: inline-block;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
}

.title{
  font-size: 25px;
  font-family: Arial, Helvetica, sans-serif;
}

.title_product{
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  color: cornflowerblue !important;
}
.subtitle_product{
  margin-top: 0;
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
  color: rgb(93, 100, 112) !important;
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

.container_product_update {
  border: 3px solid #283747;
  border-radius: 10px;
  width: 25%;
  height: 60%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.product_update h2 {
  color: #283747;
}
.product_update form {
  width: 70%;
}
.product_update input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #283747;
}
.product_update button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0 25px 0;
}
.product_update button:hover {
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;
  cursor: pointer;
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
  .container_product_update{
    width: 80%;
    
  }
 }
</style>