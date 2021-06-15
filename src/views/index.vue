<template>
  <div class="text-center mt-4">
    <img src="icon.ico" alt="" />
    <h1>
      {{ info.name }}
      V.{{ info.version }}
    </h1>
    <h4>author: {{ info.autor }}</h4>
    <h5>
      <div>
        <div>
          <a
            @click="openApp(info.contact.facebook)"
            class="material-icons text-primary mr-2"
          >
            <i class="fab fa-facebook"></i>
          </a>
        
          <a
            @click="openApp(info.contact.Ig)"
            class="material-icons text-primary mr-2"
          >
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div class="mt-4">
      <a  v-clipboard:copy="info.contact.telefono"
      v-clipboard:success="alertTelefono"><div class="material-icons">call</div> {{ info.contact.telefono }}</a>
      </div>
      <div class="mt-4">
      <a  v-clipboard:copy="info.contact.correo"
      v-clipboard:success="alertCorreo" class=""> <div class="material-icons">email</div> {{ info.contact.correo }}</a>
      </div>
       <div class="c-hand mt-3" @click="openApp(`http://${info.ip}:${info.PORT}`)"> <p>

         para acceder a la aplicacion desde 
       un dispostitivo externo conectado a la misma red accede http://{{info.ip}}:{{info.PORT}}
       </p></div>

    </h5>
    <h4></h4>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  data() {
    return {
      info: {
        autor: null,
        contact: {
          telefono: null,
          correo: null,
          facebook: null,
        },
        version: null,
        name: null,
        description: null,
        ip: null,
        PORT: null,
      },
    };
  },
  computed: {
    ...mapState([
      "options",
      "infoDolar",
      "dark",
      "server",
      "infoEmpresa",
      "usuario",
      "token",
    ]),
  },
  created() {
    this.getInfo();
  },
  methods: {
    
      alertTelefono() {
      
        this.$toastr.success("copiado con exito",'telefono', this.options);
},
      alertCorreo() {
      
        this.$toastr.success("copiado con exito",'correo', this.options);
},
    
    openApp(ruta) {
      window.open(
        `${ruta}`,
        "",
        "width=600,height=400,left=50,top=50,toolbar=yes"
      );
    },
    async getInfo() {
      const { data } = await axios.get(`${this.server}/informacion`);
      this.info = data;
    },
  },
};
</script>