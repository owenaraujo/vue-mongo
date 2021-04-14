<template>
  <div>
    <div class="mt-2">
  <b-tabs content-class="mt-3" align="center">
    <b-tab title="General" active><p>I'm the first tab</p></b-tab>
    <b-tab title="Categorias"><p>I'm the second tab</p></b-tab>
    
    <b-tab title="Administración"><p>I'm the 5 tab</p></b-tab>
   
  </b-tabs>
</div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["server"]),
  },
  data() {
    return {
      seach: {
        inputEdit: null,
        inputDelete: null,
        paramEdit: null,
        paramDelete: null,
      },
      estados: {
        FormEdit: false,
        dataDelete: false,
      },
      infoEmpresa: {},
      infoUsuario: {},
      categoriasProductos: {},
      tipoEquipo: {},
      tipoHerramienta: {},
      subsistemaPiezas: {},
    };
  },
  methods: {
    
    async getInfoEmpresa() {
      const data = await axios.get(`${this.server}/config/empresa`)
      this.infoEmpresa = data
    },
    async getInfoUsuario() {

      const data  = await axios.get(`${this.server}/auth/config/user/:id`)
    this.infoUsuario = data;
    },
   async getCategoriasProductos() {
      const data = await axios.get(`${this.server}/config/categoriasProductos`)
      this.categoriasProductos = data
    },
   async getTipoEquipo() {
      const data = await axios.get(`${this.server}/config/categoriasProductos`)
      this.tipoEquipo = data
    },
  async  getTipoHerramienta() {
      const data = await axios.get(`${this.server}/config/categoriasProductos`)
      this.tipoHerramienta = data
    },
   async getSubsistemaPiezas() {
      const data = await axios.get(`${this.server}/config/categoriasProductos`)
      this.subsistemaPiezas = data
    },
    CambiarEstadoSearcDelete() {
     
    },
    CambiarEstadoSearcEdit() {
     
    },
    prinDataEdit() {
      
    },
    prinDataDelete() {
     
    },
  },
};
</script>