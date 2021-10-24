<template>
  <div v-if="loaded" class="information">
    <h1>Información de su cuenta</h1>
    <h2>
      Nombre: <span>{{ name }}</span>
    </h2>
    <h2>
      Correo: <span>{{ email }}</span>
    </h2>
    <h2>
      Teléfono: <span>{{ telefono }}</span>
    </h2>

    <button v-on:click="loadContactInformationUpdate" class="btn_actualizar">Actualizar información</button>


  </div>
</template>
<script>
import jwt_decode from "jwt-decode";
import axios from "axios";
export default {
  name: "Account",
  data: function () {
    return {
      name: "",
      email: "",
      telefono: "",
      loaded: false,
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
        .get(`https://database-technodevices.herokuapp.com/user/${userId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          console.log(result.data)
          this.name = result.data.name;
          this.telefono = result.data.account.telefono;
          this.email = result.data.account.email;
         // this.email = result.data.email;
          //this.telefono = result.data.telefono;
          this.loaded = true; //booleano que se utiliza para renderizar la información del usuario únicamente cuando ya se ha consultado al componente lógico
        })
        .catch(() => {
          this.$emit("logOut");
        });
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
    loadContactInformationUpdate: function () {
      this.$router.push({ name: "contactInformationUpdate" });
    },
  },
  created: async function () {
    this.getData();
  },
};
</script>

<style>
.information {
  margin: 0;
  padding: 0%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
}

.information h1 {
  font-size: 60px;
  color: #0f1316;
}
.information h2 {
  font-size: 40px;
  color: #283747;
}
.information span {
  color: #3782d1;
  font-weight: bold;
}

.btn_actualizar {
  width: 100%;
  height: 50px;
  background-color: #3782d1;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

@media (max-width: 760px) {
.information h1 {
  font-size: 35px;
  color: #0f1316;
}
.information h2 {
  font-size: 25px;
  color: #283747;
  display: contents;
}
}
</style>
