<template>
    <div class="header-mobile">
      <img src="https://database-technodevices.herokuapp.com/media/imagenes/logotechnodevices.png" alt="" width="160" class="logo"/>
      <button v-on:click="reloadPage" class="btn_tienda">
        <strong>TIENDA</strong>
      </button>
      <nav id="navigation">
        <ul class="nav-items">
          <li v-on:click="loadMyProducts" v-if="is_auth"><a><span><strong>Mis productos</strong></span></a></li>
          <li v-on:click="loadCreateProduct" v-if="is_auth"><a><span class="vender_span"><strong>Vender</strong></span></a></li>
          <li v-on:click="loadAccount" v-if="is_auth"><a><span><strong>Cuenta</strong></span></a></li>
          <li v-on:click="logOut" v-if="is_auth"><a><span><strong>Cerrar Sesión</strong></span></a></li>
          <li v-on:click="loadLogIn" v-if="!is_auth"><a><span><strong>Iniciar Sesión</strong></span></a></li>
          <li v-on:click="loadSignUp" v-if="!is_auth"><a><span><strong>Registrarse</strong></span></a></li>
          <li v-on:click="loadLogIn" v-if="!is_auth"><a><span><strong>VENDER</strong></span></a></li>
        </ul>
      </nav>
    </div>
  <div id="app" class="app">

<!-- MOBILE MENU -->

<!-- DESKTOP MENU -->
    <div class="header">
        <img src="https://database-technodevices.herokuapp.com/media/imagenes/logotechnodevices.png" alt="" width="160" class="logo"/>
      <button v-on:click="loadProducts" class="btn_tienda">
        <strong>TIENDA</strong>
      </button>
      <nav class="menu">
        <button v-if="is_auth" v-on:click="loadMyProducts" class="btn_options">
         <strong>Mis Productos</strong> 
        </button>
        <button v-if="is_auth" v-on:click="loadCreateProduct" class="boton_vender">
          <strong>VENDER</strong>
        </button>
        <button v-if="is_auth" v-on:click="loadAccount" class="btn_options">
          <strong>Cuenta</strong>
        </button>
        <button v-if="is_auth" v-on:click="logOut" class="btn_options">
          <strong>Cerrar Sesión</strong>
        </button>
        <button v-if="!is_auth" v-on:click="loadLogIn" class="btn_options">
          <strong>Iniciar Sesión</strong>
        </button>
        <button v-if="!is_auth" v-on:click="loadSignUp" class="btn_options">
          <strong>Registrarse</strong>
        </button>
        <button
          v-if="!is_auth"
          v-on:click="loadLogIn"
          class="boton_vender btn_hover">
        
          <strong>VENDER</strong>
        </button>
      </nav>
    </div>
    <div class="main-component">
      <!-- funciones a travez de las cuales los hijos van a comunicarse con el padre -->
      <!-- se implementan en export default -->
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:logOut="logOut"
        v-on:sendProductId="sendProductId"
      >
      </router-view>
    </div>
    <div class="footer">
    <p><strong>© 2021 TECHNO DEVICES</strong></p>
    </div>
  </div>

</template>

<script>
export default {
  name: "App", // nombre del componente
  data: function () {
    // informacion que va a tener el componente y que se va apoder mostrar dentro el template
    return {
      is_auth: false,
      mounted: function (){
      document.title = 'TechnoDevices Marketplace'
      }
    };
  },
  components: {}, //componentes con los que se va a comunicar
  methods: {
    // metodos que definen el comportamiento que tendrá la aplicación
    verifyAuth: function () {
      this.is_auth = localStorage.getItem("isAuth") || false;

      if (this.is_auth == false) this.$router.push({ name: "productos" });
      else this.$router.push({ name: "productos" });
    },
    loadLogIn: function () {
      this.$router.push({ name: "logIn" });
    },
    loadSignUp: function () {
      this.$router.push({ name: "signUp" });
    },
    completedLogIn: function (data) {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      //alert("Autenticación Exitosa");
      this.verifyAuth();
    },
    completedSignUp: function (data) {
      alert("Registro Exitoso");
      this.completedLogIn(data);
    },
    loadHome: function () {
      this.$router.push({ name: "home" });
    },
    loadProducts: function () {
      this.$router.push({ name: "productos" });
    },
    loadMyProducts: function () {
      this.$router.push({ name: "myProducts" });
    },
    loadCreateProduct: function () {
      this.$router.push({ name: "createproduct" });
    },
    logOut: function () {
      localStorage.clear();
      this.verifyAuth();
      this.loadProducts();
    },
    loadAccount: function () {
      this.$router.push({ name: "account" });
    },

    sendProductId: function (data) {
      localStorage.setItem("id_producto", data);
      localStorage.setItem("product_image", data);
    },

    reloadPage: function (){
      window.scrollTo(0,0);
      this.$router.push({ name: "root" });
    }
  },
  created: function () {
    // funciones que se ejecutan cada vez que se ejecuta el componente
    this.verifyAuth();
    this.mounted();
  },
};
</script>

<style>
html {
  height: 100%;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  position: relative;
  margin: 0;
  padding-bottom: 6rem;
  min-height: 100%;
  font-family: "Helvetica Neue", Arial, sans-serif;
}



.footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: #283747;
  color: #ffffff;
  text-align: center;
}

.logo {
  margin-left: 100px;
}

.btn_tienda {
  background-color: #569ce7;
  font-size: 25px;
  border-radius: 10%;
  border: 3px solid #cbd5df;
  color: #ffffff;
  padding: 8px 15px;
}
.btn_tienda:hover {
  background-color: #6da5e0;
  cursor: pointer;
}

.app {
  height: 100%;
  text-align: center;
}
.header {
  margin: 0%;
  padding: 0;
  width: 100%;
  height: 10vh;
  min-height: 100px;
  background-color: #283747;
  color: #e5e7e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  width: 20%;
  text-align: center;
}
.header nav {
  height: 100%;
  align-items: center;
  font-size: 20px;
  display: flex;
  justify-content: flex-end;
}

.menu {
  margin-right: 50px;
}

.btn_options {
  color: #ffffff;
  background-color: #569ce7;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 5px;
}

.boton_vender{
  background-color: #1bac3a;
  font-size: 17px;
  border-radius: 10%;
  border: 2px solid #ffffff;
  color: #ffffff;
  padding: 8px 15px;
}

.boton_vender:hover{
  background-color: #07bd2e;
  cursor: pointer;
}

.btn_options:hover {
  background-color: #6da5e0;
  cursor: pointer;
}

.main-component {
  height: 100%;
  margin: 0%;
  padding: 0%;
  background: #fdfefe;
}

.header-mobile{
  display: none;
}

  #navigation{
    display: flex;
    font-family: Arial, Helvetica, sans-serif;
  }
@media (max-width: 760px) {

  .app {
    padding-top: 100px;
}

  .header{
    display: none;
  }

  .control-menu{
    display: flex;
    align-items: center;
  }

  .nav-items{
    text-align: end;
    margin-right: 15px;
    width: max-content;
    padding: 0;
  }

  .nav-items li{
    list-style: none;
  }

  .vender_span{
    color: #1bac3a;
  }

  #navigation{
    display: inherit;
    justify-content: right;
  }
  .header-mobile{
    background-color: #283747;
    color: #e5e7e9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 105px;
    z-index: 20;
  }

  .btn_tienda {
    background-color: #2f77c4;
    font-size: 15px !important;
    padding: 3px 4px;
    font-size: 10px;
    margin-left: 40px;
  }

  .logo{
    width: 90px;
    margin-left: 30px;
  }
  .header-mobile nav {
    width: 100%;
  }
}
</style>