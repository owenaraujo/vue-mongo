<template>
  <div>
    <div class="mt-2">
      <b-tabs content-class="mt-3" align="center">
        <b-tab title="General" active
          >
          <b-container fluid>
         <b-row>
              <b-col md='4'>
                <b-list-group>
  <b-list-group-item class="d-flex justify-content-between align-items-center">
    proveedores registrados
    <b-badge variant="primary" pill>{{ProveedoresCount}}</b-badge>
  </b-list-group-item>

  <b-list-group-item class="d-flex justify-content-between align-items-center">
    productos registrados
    <b-badge variant="primary" pill>{{productosCount}}</b-badge>
  </b-list-group-item>

  <b-list-group-item class="d-flex justify-content-between align-items-center">
   total de ventas
    <b-badge variant="primary" pill>1</b-badge>
  </b-list-group-item>
  <b-list-group-item class="d-flex justify-content-between align-items-center">
   dolar
    <b-badge variant="primary" pill>{{infoEmpresa.dolar | formatNumber}}</b-badge>
  </b-list-group-item>
</b-list-group>

<div>
  <div class="btn color-secondary text-white c-hand" v-b-toggle.collapse-1 >editar dolar </div>
  <b-collapse id="collapse-1" class="mt-2">
    <b-card>
      <div class="card-body d-flex">
<b-form-input class="w-75" v-model="infoEmpresa.dolar"></b-form-input>
  <div @click="putDolar()"  class="btn color-primary text-white c-hand " style="margin-top: 0px"><i class="fas fa-pencil-alt"></i></div>
      </div>
    </b-card>
  </b-collapse>
</div>
<div class="mt-4 d-flex">
  
  
</div>
              </b-col>
              <b-col md="4">
                <div class="card"><div class="card-header">Información del Negocio</div>
                <div class="card-body">
                {{this.infoEmpresa.nombre}}
                <hr>
               telefono: {{this.infoEmpresa.telefono}}
               registro: {{this.infoEmpresa.rif}}
                </div>
                </div>
              </b-col>
              <b-col md="4">
                <div class="card"><div class="card-header">Información de usuario</div>
                <div class="card-body">
                {{this.infoEmpresa.nombre}}
                <hr>
               telefono: {{this.infoEmpresa.telefono}}
               registro: {{this.infoEmpresa.rif}}
                </div>
                </div>
              </b-col>
         </b-row>
          </b-container>
          
          </b-tab
        >
        <b-tab title="Productos">
          <div class="row ml-2">
            <div class=" col-4">
              <b-form class="text-center card">
                <div class="card-header">Categorias</div>
                <div class="card-body">
                  <b-form-input
                    class="mt-2"
                    placeholder="Nombre"
                    v-model="nuevaCategoria.nombre"
                  ></b-form-input>
                  <div
                    @click="sendCategoria"
                    class="btn text-white btn-lg color-primary c-hand"
                  >
                    guardar
                  </div>
                </div>
              </b-form>
            </div>
            <div class="col-8 ">
              <b-table 
                style="height:34vh"
                sticky-header="true"
                class=" text-center card  scrollbar-light-blue"
                striped
                hover
                :fields="fields"
                :items="categoriasProductos"
              >
                <template #cell(Acciones)="row">
                  <div
                    class=" btn c-hand text-white  red-alert"
                    @click="deleteCategoria(row.item._id)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </div>
                </template>
              </b-table>
            </div>
          </div>
          <div class="row ml-2 mt-2">
            <div class=" col-4">
              <b-form class="text-center card">
                <div class="card-header">unidades de medida</div>
                <div class="card-body">
                  <b-form-input
                    class="mt-2"
                    placeholder="Nombre"
                    v-model="nuevaUnidad.nombre"
                  ></b-form-input>
                  <b-form-input
                    class="mt-2"
                    placeholder="abreviacion"
                    v-model="nuevaUnidad.abreviacion"
                  ></b-form-input>
                  <div @click="sendUnidad()" class="btn text-white btn-lg color-primary c-hand">
                    guardar
                  </div>
                </div>
              </b-form>
            </div>
            <div class="col-8">
              <b-table
                style="height:34vh"
                sticky-header="true"
                class=" card scrollbar-light-blue text-center"
                striped
                hover
                :fields="colunnmasUnidades"
                :items="unidades"
              >
              <template #cell(Acciones)="row">
                  <div
                    class=" btn c-hand text-white  red-alert"
                    @click="deleteUnidad(row.item._id)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </div>
                </template>
              </b-table>
            </div>
          </div>
        </b-tab>

        <b-tab title="Administración"><p>I'm the 5 tab</p></b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import Vue from 'vue'
import numeral from 'numeral'
Vue.filter("formatNumber", function (value) {
    return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
  });
export default {
  computed: {
    ...mapState(["server", "dark", "usuario", "alerts"]),
  },
  data() {
    return {
      fields: [
        {
          key: "nombre",
          sortable: true,
        },
        "Acciones",
      ],
      colunnmasUnidades: [
        {
          key: "nombre",
          sortable: true,
        },
        {
          key: "abreviacion",
          sortable: true,
        },
        "Acciones",
      ],
      nuevaCategoria: { nombre: null },
      nuevaUnidad: { nombre: null, abreviacion: null },

      infoEmpresa: {},
      infoUsuario: {},
      categoriasProductos: [],
      unidades: [],
     
      tipoEquipo: {},
      tipoHerramienta: {},
      subsistemaPiezas: {},
      ProveedoresCount: null,
      productosCount: null,
    };
  },
  created() {
    this.getCategoriasProductos();
    this.getInfoEmpresa()
      this.getUnidades()
      this.CountProveedores()
      this.countProductos()

  },
  methods: {
  async  putDolar (){
    let json = {dolar: this.infoEmpresa.dolar}
    const {data} = await axios.put(`${this.server}/system/empresa/dolar/${this.infoEmpresa._id}`, json)
    this.alert(data)
    },
    alert(data) {
      this.alerts.push(data);
    },
    async deleteCategoria(id) {
      const { data } = await axios.delete(
        `${this.server}/system/categoriaProducto/${id}`
      );
      this.alert(data);

      this.getCategoriasProductos();
    },
    async deleteUnidad(id) {
      const { data } = await axios.delete(
        `${this.server}/system/unidades/${id}`
      );
      this.alert(data);
      this.getUnidades()
      

      this.getCategoriasProductos();
    },
    async getInfoEmpresa() {
      const {data} = await axios.get(`${this.server}/system/empresa`);
      this.infoEmpresa = data;
    },
    async CountProveedores() {
      const {data} = await axios.get(`${this.server}/proveedores/get/count`);
      this.ProveedoresCount = data;
    },
    async countProductos() {
      const {data} = await axios.get(`${this.server}/productos/get/count`);
      this.productosCount = data;
    },
    async getInfoUsuario() {
      const data = await axios.get(`${this.server}/auth/config/user/:id`);
      this.infoUsuario = data;
    },
    async getUnidades() {
      const { data } = await axios.get(
        `${this.server}/system/unidades`
      );
      this.unidades = data;
      
    },
    async getCategoriasProductos() {
      const { data } = await axios.get(
        `${this.server}/system/categoriaProducto`
      );
      this.categoriasProductos = data;
    },
    async sendUnidad (){
      const {data}= await axios.post(`${this.server}/system/unidades`,

      this.nuevaUnidad)
      this.alert(data);
      this.nuevaUnidad.nombre = null
      this.nuevaUnidad.abreviacion = null
      this.getUnidades()
    },
    async sendCategoria() {
      const { data } = await axios.post(
        `${this.server}/system/categoriaProducto`,
        this.nuevaCategoria
      );
      this.getCategoriasProductos();
      this.nuevaCategoria.nombre = null;
      this.alert(data);
    },
    async getTipoEquipo() {
      const data = await axios.get(`${this.server}/system/categoriaProducto`);
      this.tipoEquipo = data;
    },
    async getTipoHerramienta() {
      const data = await axios.get(`${this.server}/config/categoriasProductos`);
      this.tipoHerramienta = data;
    },
    async getSubsistemaPiezas() {
      const data = await axios.get(`${this.server}/config/categoriasProductos`);
      this.subsistemaPiezas = data;
    },
    CambiarEstadoSearcDelete() {},
    CambiarEstadoSearcEdit() {},
    prinDataEdit() {},
    prinDataDelete() {},
  },
};
</script>
<style scoped>
.btn{ border-radius: 0.25rem;}
</style>