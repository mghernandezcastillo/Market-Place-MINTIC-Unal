<template>
  <div class="reset_pasword">
    <div class="container_reset_pasword">
      <h2>Solicitud reestablecimiento de contraseña</h2>
      <form v-on:submit.prevent="processResetPassword">
        <input type="email" v-model="reset.email" placeholder="Email" />
        <br />
        <button type="submit">Reestablecer</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "resetPasswordRequirement",
  data: function () {
    return {
      reset: {
        email: "",
      },
    };
  },
  methods: {
    processResetPassword: function () {
      axios
        .post("https://technodevices-bk.herokuapp.com/auth/reset/", this.reset, {
          headers: {},
        })
        .then((result) => {
         // let dataLogIn = {
         //   email: this.user.email,
         //   token_access: result.data.access,
         //   token_refresh: result.data.refresh,
         // };
         alert("solicitud hecha correctamente")
         this.lodadLogin();
        })
        
        .catch((error) => {
          if (error.response.status == "401")
            alert("ERROR 401: Error.");
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
  width: 25%;
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