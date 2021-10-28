<template>
  <h1 class="title">Publicar Producto</h1>
  <div class="product_create">
    <div class="container_product_create">
      <form v-on:submit.prevent="processCreateProduct">
        <!-- CHECKBOX NUEVO O USADO TIPO RANGE-->
        <label class="checkbox">
          <input type="radio" value="True" id="nuevo" class="radio_option" name="rememberMe" v-model="producto.nuevo" required/>
          <p class="estado">nuevo</p>
          <input type="radio" value="False" id="usado" class="radio_option" name="rememberMe" v-model="producto.nuevo" required/>
          <p class="estado">usado</p>
        </label>
        <br />

         <!-- CARGA DE IMAGEN DEL PRODUCTO CON FUNCIÓN PARA BASE64 TIPO FILE-->
        <h4 class="imagen_title">Imagen del producto</h4>
        
        <div class="button-wrapper">
          <span class="label_upload">
            <strong>Upload File</strong>
          </span>
        <input type="file" @change="updatePhoto"  id="upload" name="upload" class="upload-box" required placeholder="Upload File"/>
        </div>

        <!-- TITULO PUBLICACIÓN-->
        <input type="text" v-model="producto.titulo" placeholder="Título del anuncio" maxlength="36" required />





        <!-- COMBOBOX CATEGORÍAS-->
        <select v-model="producto.categoria" class="combo_categorias" id="categoria" v-on:change="traerMarcas" required>
          <option value="" disabled>Categoría</option>
          <option v-for="categoria in categorias" :key="categoria" class="listado_marcas">
            {{ categoria.nombre }}
          </option>
        </select>

        <!-- COMBOBOX MARCAS-->
        <select v-model="producto.marca" class="combo_marcas" id="marca" required>
          <option value="" disabled>Marca</option>
          <option v-for="marca in marcas" :key="marca" class="listado_marcas">
            {{ marca.nombre }}
          </option>
        </select>

        <!-- PRECIO PRODUCTO-->
        <input type="number" v-model="producto.precio" placeholder="Precio" required/>

        <!-- DESCRIPCIÓN PRODUCTO-->
        <input type="text" v-model="producto.descripcion" placeholder="Descripción" required/>

        <button type="submit">Crear</button>
      </form>

    </div>

  </div>

</template>

<!--------------- JAVASCRIPT-------------->
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
    processCreateProduct: async function () {
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
        .post(
          `https://technodevices-bk.herokuapp.com/producto/${userId}/create/`,
          this.producto,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((result) => {
          this.loaded = true; //booleano que se utiliza para renderizar la información del usuario únicamente cuando ya se ha consultado al componente lógico
          this.loadMyProducts();
        })
        .catch((error) => {
          console.log(error)
        });
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

    loadMyProducts: function () {
      this.$router.push({ name: "myProducts" });
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
    this.traerTodasLasCategorias();
    console.log(this.getDateToday())
    
  },
};
</script>

<style>
.product_create {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 70px;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #f1f8ff;
}

.title {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 40px !important;
}

.imagen_title {
  margin: 0;
  color: #1478e4;
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

.container_product_create {
  border: 3px solid #283747;
  border-radius: 10px;
  width: 25%;
  height: 60%;
  background-color: #e3e7ec;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.button-wrapper {
  position: relative;
  width: 150px;
  text-align: center;
  margin: 20% auto;
  cursor: pointer;
}

.button-wrapper span.label_upload {
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

.upload-box{
  cursor: pointer;
}

.product_create h2 {
  color: #283747;
}
.product_create form {
  width: 70%;
}
.product_create input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #283747;
}
.product_create button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #389c2f;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0 25px 0;
  font-size: 18px;
}
.product_create button:hover {
  color: #ffffff;
  background: #38aa2e;
  border: 1px solid #283747;
  cursor: pointer;
  font-size: 20px;
}

.checkbox {
  font-weight: normal;
  display: flex;
  font-size: 15px;
  align-items: center;
  margin-top: 20px;
}

.estado {
  margin-right: 5px;
  margin-left: 5px;
}

.radio_option{
  cursor: pointer;
}

@media (max-width: 760px) {
  .container_product_create {
    width: 80%;
    height: fit-content;
  }
}
</style>