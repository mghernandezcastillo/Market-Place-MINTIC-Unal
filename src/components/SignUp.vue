<template>
 <div class="signUp_user">
 <div class="container_signUp_user">
 <h2>Registrarse</h2>
 <p id="confirmation_sign_up"><strong>El email ya se encuentra registrado</strong></p>
 <form v-on:submit.prevent="processSignUp" >
 <input type="email" v-model="user.email " placeholder="Correo" required>
 <br>
 <input type="password" v-model="user.password" placeholder="Contraseña" required>
 <br>

 <input type="text" v-model="user.account.name" placeholder="Nombre" required>
 <br>
 <input type="text" v-model="user.account.telefono" placeholder="Teléfono" required>
 <br>
 <button type="submit">Registrarse</button>
 </form>
 </div>
 </div>
</template>
<script>
import axios from 'axios';
export default {
 name: "SignUp",
 data: function(){
 return {
 user: {
 email: "",
 password: "",
 account: {
 lastChangeDate: (new Date()).toJSON().toString(),
 isActive: true,
  name: "",
 telefono: ""
 }
 }
 }
 },
 methods: {
processSignUp: function(){
 axios.post(
 "https://technodevices-bk.herokuapp.com/user/",
 this.user,
 {headers: {}}
 )
 .then((result) => {
 let dataSignUp = {
 email: this.user.email,
 token_access: result.data.access,
 token_refresh: result.data.refresh,
 }
this.$emit('completedSignUp', dataSignUp)
 this.user = {
 email: "",
 password: "",

 account: {
 lastChangeDate: (new Date()).toJSON().toString(),
 isActive: true,
 name: "",
 telefono: "",
 }
 }
 })
 .catch((error) => {
 console.log(error)
 this.showMessageErrorLogin();
 });
 },
  showMessageErrorLogin: function (){
      let confirmation = document.getElementById("confirmation_sign_up");
      confirmation.style.display = "inherit";
    }
 }
}
</script>     


<style>
 .signUp_user{
 margin-top: 20px;
 padding: 0%;
 height: 100%;
 width: 100%;

 display: flex;
 justify-content: center;
 align-items: center;
 }
 .container_signUp_user {

border: 3px solid #283747;
 border-radius: 10px;
 width: 70vh;
 height: 60%;

 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
}
 .signUp_user h2{
 color: #283747;
}
 .signUp_user form{
 width: 70%;
}
 .signUp_user input{
 height: 40px;
 width: 100%;
 box-sizing: border-box;
 padding: 10px 20px;
 margin: 5px 0;
 border: 1px solid #283747;
}
 .signUp_user button{
 width: 100%;
 height: 40px;
 color: #E5E7E9;
 background: #283747;
 border: 1px solid #E5E7E9;
 border-radius: 5px;
 padding: 10px 25px;
 margin: 5px 0 25px 0;
 font-size: 15px;
}
 .signUp_user button:hover{
 color: #E5E7E9;
 background: #37495c;
 border: 1px solid #283747;
 cursor: pointer;
 }
#confirmation_sign_up{
  color: #ff0000;
  display: none;
}

 @media (max-width: 760px) {
  .container_signUp_user{
    width: 90%;
    margin-top: 15px;
  }
}
</style>