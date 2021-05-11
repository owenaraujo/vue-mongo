<template>
  <div>
    <div class="mt-2">
  <b-tabs content-class="mt-3" align="center">
    <b-tab title="General" active><p>{{infoEmpresa}}</p></b-tab>
    <b-tab title="Productos">
      <div class="row ml-2">
        <div class=" col-4">
          <b-form class="text-center card">
            <div class="card-header">categorias</div>
       <div class="card-body">
          <b-form-input class="mt-2" placeholder="categoria" v-model="nuevaCategoria.nombre"></b-form-input>
        <div @click="sendCategoria" class="btn text-white btn-lg color-primary c-hand">guardar</div>
       </div>
      </b-form>
      
        </div>
        <div class="col-8 " >
          <div class="">
    <b-table style="height:34vh" sticky-header='true' class="card  scrollbar-light-blue" striped hover :fields="fields" :items="categoriasProductos"></b-table>
  </div>
      </div>
      </div>
      <div class="row ml-2 mt-2">
        <div class=" col-4">
          <b-form class="text-center card">
            <div class="card-header">unidades de medida</div>
       <div class="card-body">
          <b-form-input class="mt-2" placeholder="categoria" v-model="nuevaUnidad.nombre"></b-form-input>
        <b-form-input class="mt-2" placeholder="abreviacion" v-model="nuevaUnidad.abreviacion"></b-form-input>
        <div  class="btn text-white btn-lg color-primary c-hand">guardar</div>
       </div>
      </b-form>
      
        </div>
        <div class="col-8" >
          <div class="">
    <b-table style="height:34vh" sticky-header='true' class=" card scrollbar-light-blue" striped hover :fields="fields" :items="categoriasProductos"></b-table>
  </div>
      </div>
      </div>
      
      
      
      </b-tab>
    
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
    ...mapState(["server", "dark", "usuario"]),
  },
  data() {
    return {
      fields: [
          {
            key: 'nombre',
            sortable: true
          }
        ],
      nuevaCategoria:{},
      nuevaUnidad:{},
      seach: {
        inputEdit: null,
        inputDelete: null,
        paramEdit: null,
        paramDelete: null,
      },
      
      infoEmpresa: {},
      infoUsuario: {},
      categoriasProductos:  [],
      tipoEquipo: {},
      tipoHerramienta: {},
      subsistemaPiezas: {},
    };
  },
  created(){
    this.getCategoriasProductos()
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
      const {data} = await axios.get(`${this.server}/system/categoriaProducto`)
     this.categoriasProductos= data
    },
   async sendCategoria() {
      const data = await axios.post(`${this.server}/system/categoriaProducto`, this.nuevaCategoria)
      console.log(data);
    },
   async getTipoEquipo() {
      const data = await axios.get(`${this.server}/system/categoriaProducto`)
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