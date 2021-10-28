<template>
  <div class="greetings">
    <h1>
      ¡Bienvenido <span> {{ email }} </span>!
    </h1>
  </div>
  <button class="btn_publicar" v-on:click="loadCreateProduct">
    Publicar nuevo producto
  </button>
</template>
<script>
export default {
  name: "Home",
  data: function () {
    return {
      email: localStorage.getItem("email") || "none",
    };
  },
  methods: {
    loadCreateProduct: function () {
      this.$router.push({ name: "createproduct" });
    },
  },
};
</script>
<style>
.greetings {
  margin: 0;
  padding: 0%;
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.greetings h1 {
  font-size: 50px;
  color: #283747;
}
.greetings span {
  color: #3782d1;
  font-weight: bold;
}

.btn_publicar {
  color: #02101f;
  font-size: 20px;
  font-weight: 500;
  background: #dfe20a;
  border: 3px solid #130000;
  border-radius: 5px;
  padding-top: 7px;
  padding-bottom: 7px;
  width: 300px;
  margin-left: 5px;
}

.btn_publicar:hover {
  cursor: pointer;
  background: #fbff00;
}

@media (max-width: 760px) {
  .container_signUp_user {
    width: 80%;
  }
  .greetings h1 {
    font-size: 30px;
    color: #283747;
  }
.greetings span {
    font-size: 18px;
  }
}
</style>