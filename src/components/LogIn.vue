<template>
  <div class="logIn_user">
    <div class="container_logIn_user">
      <h2>Iniciar sesión</h2>
      <p id="confirmation"><strong>Contraseña o email invalido</strong></p>
      <form v-on:submit.prevent="processLogInUser">
        <input type="text" v-model="user.email" placeholder="Email" required/>
        <br />
        <input type="password" v-model="user.password" placeholder="Password" required/>
        <br />
        <button type="submit">Iniciar Sesion</button>

        <a v-on:click="loadSignUp" class="link_registrarme"><strong>Registrarse</strong></a>
        <br>
        <a v-on:click="loadResetPasswordRequirement" class="link_olvido_contraseña"><strong>Olvidé mi contraseña</strong></a>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LogIn",
  data: function () {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    processLogInUser: function () {
      axios
        .post("https://technodevices-bk.herokuapp.com/login/", this.user, {
          headers: {},
        })
        .then((result) => {
          let dataLogIn = {
            email: this.user.email,
            token_access: result.data.access,
            token_refresh: result.data.refresh,
          };
          this.$emit("completedLogIn", dataLogIn);
        })
        .catch((error) => {
          if (error.response.status == "401")
          this.showMessageErrorLogin();
        });
    },
    loadSignUp: function () {
      this.$router.push({ name: "signUp" });
    },
    loadResetPasswordRequirement: function () {
      this.$router.push({ name: "resetPasswordRequirement" });
    },
    showMessageErrorLogin: function (){
      let confirmation = document.getElementById("confirmation");
      confirmation.style.display = "inherit";
    }
    },
};
</script>


<style>
.logIn_user {
  margin-top: 20px;
  height: 70%;
  padding: 0%;

  display: flex;
  justify-content: center;
  align-items: center;
}
.container_logIn_user {
  border: 3px solid #283747;
  border-radius: 10px;
  width: 25%;
  height: 60%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.logIn_user h2 {
  color: #283747;
}

.logIn_user form {
  width: 70%;
}
.logIn_user input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #283747;
}
.logIn_user button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0;
  font-size: 15px;
}
.logIn_user button:hover {
  color: #e5e7e9;
  background: #37495c;
  border: 1px solid #283747;
  cursor: pointer;
}

.link_registrarme{
  color: #2e5fa8 !important;
  font-size: 18px;
}
.link_registrarme:hover{
  color: #0066ff !important;
  cursor: pointer;
}

.link_olvido_contraseña{
  color: #a82e67;
  font-size: 15px;
}
.link_olvido_contraseña:hover{
  color: #ff0077;
  cursor: pointer;
}

#confirmation{
  color: #ff0000;
  display: none;
}

@media (max-width: 760px) {
  .container_logIn_user{
    width: 90%;
    margin-top: 15px;
  }
}

</style>