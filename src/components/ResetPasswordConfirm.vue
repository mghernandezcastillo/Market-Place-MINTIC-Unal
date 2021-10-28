<template>
  <div class="reset_pasword">
    <div class="container_reset_pasword">
      <h2>Reestablecer contraseña</h2>
      <form v-on:submit.prevent="processResetPassword" autocomplete="off">
        <input type="text" v-model="reset.token" placeholder="Token" autocomplete="off"/>
        
        <br />
        <input type="password" v-model="reset.password" placeholder="Nueva contraseña" autocomplete="new-password" minlength="8"/>
        <span>La contraseña debe tener al menos 8 digitos</span>
        <br />
        <button type="submit">Cambiar contraseña</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ResetPasswordConfirm",
  data: function () {
    return {
      reset: {
        password: "",
        token: "",
      },
    };
  },
  methods: {
    processResetPassword: function () {
      axios
        .post("https://technodevices-bk.herokuapp.com/auth/reset/confirm/", this.reset, {
          headers: {},
        })
        .then((result) => {
         // let dataLogIn = {
         //   email: this.user.email,
         //   token_access: result.data.access,
         //   token_refresh: result.data.refresh,
         // };
          console.log("cambio exitoso")
          this.lodadLogin();
          
        })
        .catch((error) => {
          console.log(error)
          if (error.response.status == "404")
            alert("ERROR 401: Token inválido.");
        });
    },
    lodadLogin: function () {
      this.$router.push({ name: "logIn" });
    },
  },
};
</script>


<style>
.reset_pasword {
  margin-top: 20px;
  height: 70%;
  padding: 0%;


  display: flex;
  justify-content: center;
  align-items: center;
}
.container_reset_pasword {
  border: 3px solid #283747;
  border-radius: 10px;
  width:100vh;
  height: 60%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.reset_pasword h2 {
  color: #283747;
}

.reset_pasword form {
  width: 70%;
}
.reset_pasword input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #283747;
}
.reset_pasword button {
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
.reset_pasword button:hover {
  color: #e5e7e9;
  background: #37495c;
  border: 1px solid #283747;
  cursor: pointer;
}

.link_registrarme{
  color: #a82e67;
  font-size: 18px;
}
.link_registrarme:hover{
  color: #ff0077;
  cursor: pointer;
  
}

@media (max-width: 760px) {
  .container_logIn_user{
    width: 80%;
    margin-top: 15px;
  }
}

</style>