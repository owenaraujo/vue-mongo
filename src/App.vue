<template>
  <div class="parent">
    <div id="scroll" class="child scroll">
      <div id="load" class="loading-box d-none">
        <div class="loading-animate">
          <div class="body"></div>
        </div>
      </div>

      <div
        class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header"
      >
        <header
          class="demo-header mdl-layout__header"
          :class="{ 'dark-secondary text-white': dark, 'tercero': !dark }"
        >
          <Nav></Nav>
        </header>
        <Links />

        <main
          class="mdl-layout__content"
          :class="{
            'dark-primary text-white': dark,
            'bg-white': !dark,
          }"
        >
          <div>
           
           
          </div>
          <b-container fluid='true' class="mx-3">
            <router-view></router-view>
           <div>
    <!-- Button trigger modal -->

<div :class="{'modal-backdrop fade show': modalShow, 'dark-primary': !dark}"></div>
<!-- Modal -->
<div :class="{ 'show' : modalShow}" class="modal text-center" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">inicio de sesion</h5>
        
      </div>
      <div class="modal-body">
        <div>
          <b-form-input placeholder="nombre de usuario" class="mt-3"  v-model="user.username"></b-form-input>
          <b-form-input placeholder="contraseña" class="mt-3" v-model="user.password"></b-form-input>
        </div>
      </div>
      <div class="modal-footer">
        <div @click="sigin()" type="button" class="btn color-primary c-hand text-white" data-dismiss="modal">iniciar</div>
      </div>
    </div>
  </div>
</div>
  </div>
          </b-container>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
import Nav from "./components/nav.vue";
import Links from "./components/links.vue";
import axios from 'axios'

export default {
  name: "App",
  data() {
    return {
      user:{username: null, password: null}
    
    };
  },
  computed: {
    ...mapState(["dark", 'options', 'modalShow', 'server',"token", 'id']),
  },
  components: {
    Nav,
    Links,
  },
  created() {
    this.getStorage()
    this.getLogin()
    this.getInfoEmpresa()
  },
   methods: {
      alert(data) {
if (data.value === true) {
      this.$toastr.success(data.message,'inicio', this.options);
  
}      
if (data.value === false) {
      this.$toastr.error(data.message,'inicio', this.options);
  
}      
if (data.value === null) {
      this.$toastr.warning(data.message,'inicio', this.options);
  
}      
    },
     async sigin(){
       const {data} = await axios.post(`${this.server}/auth/signin`, this.user)
      
       this.alert(data)
       if(data.value == null ) return
       if(data.value == false ) return
       localStorage.token = data.token
      
       localStorage.id = data.id
       sessionStorage.usuario= true
      
       
       this.getUser()
      this.user.username= null
      this.user.password= null
       this.cambiarLogin()
       },
    ...mapMutations(['getStorage', 'getLogin', 'cambiarLogin', 'saveToken', 'getUser','getInfoEmpresa'])
  },
}
</script>
<style scoped>
.modal-backdrop.show {
    opacity: 1;
}

</style>