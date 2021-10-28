<template>

  <div class="contact_update">
    <div class="container_contact_update">
      <h1 class="title">Actualizar teléfono de contacto</h1>

      <form v-on:submit.prevent="processUpdatePhoneNumber">
        <br />
        <input type="number" v-model="account.telefono" placeholder="Teléfono" maxlength="36" id="telefono" required/>
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
    account : {
        telefono: "",
        email: ""
    },
    
    loaded: false,
    };
  },

  methods: {
    processUpdatePhoneNumber: async function () {
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
        .put(
          `https://technodevices-bk.herokuapp.comtelefono/update/${userId}/`,
           this.account,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((result) => {
          this.loaded = true; //booleano que se utiliza para renderizar la información del usuario únicamente cuando ya se ha consultado al componente lógico
          console.log("teléfono actualizado")
          this.loadAccount();
        })
        .catch(() => {});
    },

    loadAccount: function () {
      this.$router.push({ name: "account" });
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
  },
  created: async function () {
    (this.id_producto = localStorage.getItem("id_producto"))
  },
};
</script>

<style>
.contact_update {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 70px;
}

.title{
  font-size: 25px;
  font-family: Arial, Helvetica, sans-serif;
}

.item_title{
    font-size: 15px;
    font-family: Arial, Helvetica, sans-serif;
}



.container_contact_update {
  border: 3px solid #283747;
  border-radius: 10px;
  width: 80%;
  height: 60%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.contact_update h2 {
  color: #283747;
}
.contact_update form {
  width: 70%;
}
.contact_update input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #283747;
}
.contact_update button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0 25px 0;
}
.contact_update button:hover {
  color: #e5e7e9;
  background: #405a75;
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