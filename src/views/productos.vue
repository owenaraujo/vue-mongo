<template>
  <div>
    <div>
    <b-row>
      <b-col>
        <div class="d-flex">
          <div v-if="usuario.roles.name !== 'usuario'"
            class="text-center boton-cuadrado quinto c-hand text-white mt-3"
            data-toggle="modal"
            data-target="#modalAdd"
          >
            <i class="fas fa-plus"></i> <br />
            nuevo
          </div>

          <div @click="pdfCompleto()"
            class="text-center boton-cuadrado color-primary c-hand text-white mt-3 ml-3"
            data-toggle="modal"
            data-target="#modalSearch"
          >
          {{productos.length}}
            <br>
            <div v-if="productos.length === 1">producto</div>
            <div v-if="productos.length > 1">productos</div>
            <div v-if="productos.length ===0">productos</div>
            
          </div>
          <div class="d-flex align-items-center">
            <b-form-input
              class="w-75 ml-3"
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Buscar"
            ></b-form-input>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <div class="">
          <div class="text-center">
            <b-table
            :busy="isBusy"
              class=" card mt-3 list-scroll scrollbar-light-blue"
              :sticky-header="true"
              striped
              hover
              :filter="filter"
              :items="productos"
              :fields="fields"
            >
             <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Cargando...</strong>
        </div>
        te
      </template>
      <template #cell(cantidad)='row'>
    
             <Popper
    trigger="hover"
    
    :options="{
      placement: 'top',
      modifiers: { offset: { offset: '0,10px' } }
    }">
    <div class="popper">
      {{row.item.unidadMedida.nombre}}
                
    
    </div>
 
    <div slot="reference">
      {{row.item.cantidad}}
    </div>
  </Popper>
      
      </template>
              <template #cell(precio)="row">
                


                  <Popper
    trigger="hover"
    
    :options="{
      placement: 'top',
      modifiers: { offset: { offset: '0,10px' } }
    }">
    <div class="popper">
                {{infoDolar.promedio * row.item.precio | formatNumber }}
    
    </div>
 
    <div slot="reference">
      {{row.item.precio}}
    </div>
  </Popper>
              </template>
              <template #cell(funciones)="row" v-if="usuario.roles.name === 'administrador'">
                 <div
                            :class="{ 'd-none': row.item.status == false }"
                            @click="deleteProducto(row.item._id)"
                            class="btn color-primary text-white mt-0 c-hand"
                            size="sm"
                          >
                            <span class="material-icons d-flex">
                              toggle_on
                            </span>
                          </div>
                          <div
                            v-if="row.item.status == false"
                            @click="activateProducto(row.item._id)"
                            class="btn red-alert text-white mt-0 c-hand"
                            size="sm"
                          >
                            <span class="material-icons d-flex">
                              toggle_off
                            </span>
                          </div>
                
<div
                            style="font-size: 1px"
                            @click="formData(row.item._id)"
                            class="btn yellow-danger text-white mt-0 c-hand"
                            size="sm"
                            data-toggle="modal"
                            data-target="#modalEdit"
                          >
                            <span class="material-icons"> border_color </span>
                          </div>
                

                <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
              </template>
            </b-table>
          </div>
        </div>
      </b-col>
    </b-row>
    

    <!-- pdf -->


<div class="d-none">
<div ref="lista" class="">
<div class=" container-fluid">
  
      <div class=" mt-3">
        <div class="text-right">
          {{ fecha | formatDate }}
        </div>
        <h1>{{ infoEmpresa.nombre }}</h1>
        <h4>{{ infoEmpresa.telefono }}</h4>
        <h5>R.i.F. {{ infoEmpresa.rif }}</h5>
      </div>
    </div>


<b-table
            :busy="isBusy"
              class=" card mt-3 list-scroll scrollbar-light-blue"
              :sticky-header="true"
              striped
              hover
            
              :items="productos"
              :fields="fieldsReporte"
            >
            <template #cell(#)='row'>
            {{row.index +1}}
                
              
            </template>
            <template  v-slot:custom-foot>
        <b-tr>
          <b-th colspan="5"><span class="sr-only"></span></b-th>
          <b-th variant="warning" colspan="1">  
          {{totalUnidades}} unidades
          </b-th>
          <b-th variant="primary" colspan="1">

     {{total$}} $

          </b-th>
        </b-tr>
      </template>
            <template #cell(total)='row'>
            {{row.item.cantidad * row.item.precio}} $
                
              
            </template>
            <template #cell(createdAt)='row'>
            
                {{row.item.createdAt | formatDate}}
              
            </template>
             <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Cargando...</strong>
        </div>
        te
      </template>
      <template #cell(cantidad)='row'>
    
    
      {{row.item.cantidad}}  {{row.item.unidadMedida.nombre}}
    
  
      
      </template>
              <template #cell(precio)="row">
                


 
    
      {{row.item.precio}} $
  
              </template>
              
            </b-table>

</div>



</div>

    
    <!-- pdf -->
    <!-- modales  -->
    <!-- modal add  -->
    <div
      class="modal fade"
      id="modalAdd"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content" :class="{ 'dark-secondary': dark }">
          <div
            class="modal-header text-center"
            :class="{ 'color-secondary text-white': dark }"
          >
            <h4 class="modal-title w-100 font-weight-bold">Agregar</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" :class="{ 'dark-secondary': dark }">
            <form id="formAdd" class="mx-3">
              <div class="form-group mb-2">
                <b-form-select
                  class="mt-3"
                  v-model="nuevoProducto.categoria"
                  :options="categorias"
                ></b-form-select>
                <b-form-select
                  class="mt-3"
                  v-model="nuevoProducto.unidadMedida"
                  :options="unidadesMedida"
                ></b-form-select>
                <b-form-select
                  class="mt-3"
                  v-model="nuevoProducto.proveedor_id"
                  :options="proveedores"
                ></b-form-select>
                <b-form-input
                  required
                  type="text"
                  onkeyup="validateNombre(this)"
                  id="nombre"
                  v-model="nuevoProducto.nombre"
                  placeholder="nombre"
                  class="mt-3"
                  autocomplete="off"
                />
                <b-form-input
                  required
                  type="text"
                  onkeyup="validateCod(this)"
                  style="text-transform: uppercase"
                  v-model="nuevoProducto.codigo"
                  placeholder="codigo"
                  class="form-control mt-3"
                  autocomplete="off"
                />

                <div class="d-flex">
                  <b-form-input
                    required
                    type="number"
                    v-model="nuevoProducto.cantidad"
                    placeholder="cantidad"
                    class="form-control mt-3  w-50"
                    autocomplete="off"
                  />

                  <b-form-input
                    required
                    type="number"
                    v-model="nuevoProducto.stock"
                    placeholder="stock"
                    class="form-control mt-3 ml-2 w-50"
                    autocomplete="off"
                  />
                  <b-form-input
                    required
                    type="number"
                    v-model="nuevoProducto.precio"
                    placeholder="precio"
                    class="form-control mt-3 ml-2 w-50"
                    autocomplete="off"
                  />
                </div>
                <b-form-textarea
                  required
                  type="text"
                  v-model="nuevoProducto.descripcion"
                  placeholder="descripcion"
                  class="form-control mt-3 ml-2"
                  autocomplete="off"
                  style="  border-radius: 0.25rem;
"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer d-flex justify-content-center">
            <div
              @click="sendProduct()"
              id="btnPost"
              class="text-white mt-3 btn btn-block color-primary mr-4 ml-4 c-hand"
            >
              guardar
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- modal add  -->

    <!-- modal edit -->

    <div
      class="modal fade"
      id="modalEdit"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content" :class="{ 'dark-secondary ': dark }">
          <div
            class="modal-header text-center"
            :class="{ 'color-secondary text-white': dark }"
          >
            <h4 class="modal-title w-100 font-weight-bold">Editar</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body mx-3">
            <form
              id="formEdit
             "
              class="mx-3"
            >
              <div class="form-group mb-2" v-if="formVisibilityEDit === true">
                <b-form-select
                  class="mt-3"
                  v-model="formEdit.categoria"
                  :options="categorias"
                ></b-form-select>
                <b-form-select
                  class="mt-3"
                  v-model="formEdit.unidadMedida"
                  :options="unidadesMedida"
                ></b-form-select>
                <b-form-select
                  class="mt-3"
                  v-model="formEdit.proveedor_id"
                  :options="proveedores"
                ></b-form-select>
                <b-form-input
                  required
                  type="text"
                  v-model="formEdit.nombre"
                  placeholder="nombre"
                  class="mt-3"
                  autocomplete="off"
                />
                <b-form-input
                  required
                  type="text"
                  onkeyup="validateCod(this)"
                  style="text-transform: uppercase"
                  v-model="formEdit.codigo"
                  placeholder="codigo"
                  class="form-control mt-3"
                  autocomplete="off"
                />

                <div class="d-flex">
                  <b-form-input
                    required
                    type="number"
                    v-model="formEdit.cantidad"
                    placeholder="cantidad"
                    class="form-control mt-3  w-50"
                    autocomplete="off"
                  />
                  <b-form-input
                    required
                    type="number"
                    v-model="formEdit.stock"
                    placeholder="stock"
                    class="form-control mt-3 ml-2 w-50"
                    autocomplete="off"
                  />
                  
                </div>
                <b-form-textarea
                  required
                  type="text"
                  v-model="formEdit.descripcion"
                  placeholder="descripcion"
                  class="form-control mt-3 ml-2"
                  autocomplete="off"
                  style="  border-radius: 0.25rem;
"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer d-flex justify-content-center mr-4 ml-4">
            <div
              @click="sendEdit(formEdit._id)"
              class="text-white mt-3 btn btn-block color-primary mr-4 ml-4 c-hand"
            >
              guardar
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- modal edit -->

    <!-- modales  -->
  </div>
  </div>
</template>

<script>
import moment from "moment";
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY hh:mm a");
  }
});
import numeral from "numeral";
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import Vue from "vue";
Vue.filter("formatNumber", function(value) {
  return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
});
 import Popper from 'vue-popperjs';
export default {
  components: {
       Popper
    },
    beforeMount() {
    this.dolar()
      
    },
  mounted() {
    this.tiempo()
    this.getCategorias();
    this.getUnidades();
    this.getProveedores();
    this.getProductos();
  },
  methods: {
    ...mapMutations([
      'dolar',

    ]),
    tiempo() {
      setInterval(() => {
        this.fecha = new Date();
      }, 1000);
    },
    pdfCompleto ()
{
 
 const lista = this.$refs.lista
      var ventana = window.open("", "PRINT", "height=400,width=600");
ventana.document.write(
        '<link rel="stylesheet" href="/md/bootstrap.min.css" />'
      );
     
      ventana.document.write(lista.innerHTML);
   ventana.focus()
   setTimeout(  
function() {
  ventana.print()
  
}
, 2000
   )
  

},  
    //solicitudes inmediatas
    async getUnidades() {
      const { data } = await axios.get(`${this.server}/system/unidades`);
      data.forEach((item) => {
        let data = { value: item._id, text: item.nombre };
        this.unidadesMedida.push(data);
      });
      let defaultItem = {
        value: null,
        text: "seleccione una unidad",
        disabled: true,
      };
      this.unidadesMedida.push(defaultItem);
    },
    async getCategorias() {
      const { data } = await axios.get(
        `${this.server}/system/categoriaProducto`
      );
      data.forEach((item) => {
        let data = { value: item._id, text: item.nombre };
        this.categorias.push(data);
      });
      let defaultItem = {
        value: null,
        text: "seleccione una categoria",
        disabled: true,
      };
      this.categorias.push(defaultItem);
    },
    async getProductos() {
      const { data } = await axios.get(`${this.server}/productos/get`);
      this.productos = data;
      this.isBusy = false
    },
    //solicitudes inmediatas

    async sendEdit(id) {
      const { data } = await axios.put(
        `${this.server}/productos/${id}`,
        this.formEdit,{headers:{xtoken: this.token}}
      );
      this.alert(data);
      if (data.value == true) return;
      if (data.value == false) return;
      this.formVisibilityEDit = false;
      this.formEdit.nombre = null;
      this.formEdit.codigo = null;
      this.formEdit.cantidad = null;
      this.formEdit.stock = null;
      this.formEdit.precio = null;
      this.formEdit.categoria = null;
      this.formEdit.unidadMedida = null;
      this.formEdit.proveedor_id = null;
      this.formEdit.unidadMedida = null;
      this.formEdit.descripcion = null;
      this.formEdit._id = null;
      this.getProductos();
    },

    async getProveedores() {
      const { data } = await axios.get(`${this.server}/proveedores/get`);
      data.forEach((item) => {
        let data = { value: item._id, text: item.nombre };
        this.proveedores.push(data);
      });
      let defaultItem = {
        value: null,
        text: "seleccione un proveedor",
        disabled: true,
      };
      this.proveedores.push(defaultItem);
    },
    async deleteProducto(id) {
      const { data } = await axios.delete(`${this.server}/productos/${id}`,{headers:{xtoken: this.token}});
      this.alert(data);
      if (data.value == false) {
        return;
      }
      this.getProductos();
    },
       async activateProducto(id) {
      const { data } = await axios.delete(`${this.server}/productos/activate/${id}`,{headers:{xtoken: this.token}});
      this.alert(data);
      if (data.value == false) {
        return;
      }
      this.getProductos();
    },
    async formData(id) {
      const { data } = await axios.get(`${this.server}/productos/${id}`);
      this.formVisibilityEDit = true;
      this.formEdit = data;
    },

    async sendProduct() {
      const { data } = await axios.post(
        `${this.server}/productos/`,
        this.nuevoProducto,{headers:{xtoken: this.token}}
      );
      this.alert(data);
      if (data.value == null) return;
      if (data.value == false) return;
      this.nuevoProducto.nombre = null;
      this.nuevoProducto.codigo = null;
      this.nuevoProducto.cantidad = null;
      this.nuevoProducto.stock = null;
      this.nuevoProducto.precio = null;
      this.nuevoProducto.categoria = null;
      this.nuevoProducto.unidadMedida = null;
      this.nuevoProducto.proveedor_id = null;
      this.nuevoProducto.unidadMedida = null;
      this.nuevoProducto.descripcion = null;
      this.getProductos();
    },
    alert(data) {
      if (data.value === true) {
        this.$toastr.success(data.message, "productos", this.options);
      }
      if (data.value === false) {
        this.$toastr.error(data.message, "productos", this.options);
      }
      if (data.value === null) {
        this.$toastr.warning(data.message, "productos", this.options);
      }
    },
  },

  computed: {
    totalUnidades() {


      return this.productos.reduce(
        (sum, item) => sum + parseFloat(item.cantidad),
        0
      );
    },
    total$() {


      return this.productos.reduce(
        (sum, item) => sum + parseFloat(item.cantidad * item.precio),
        0
      );
    },
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
    ...mapState(["dark", "options", "server", "infoEmpresa",'token','usuario', 'infoDolar']),
  },

  data() {
    return {
      fecha: null,
      isBusy: true,
      proveedores: [],
      filter: null,
      filterOn: [],
      fieldsReporte: [
         '#',
         {
          key: "createdAt",
          label: "creacion",
          
        },
        {
          key: "nombre",
        
        },
        {
          key: "codigo",
         
        },
      
        {
          key: "precio",
          label: "precio",
        
        },
      
       
        {
          key: "cantidad",
          label: "cantidad",
         
        },
       
      'total'
      ],
      fields: [
        {
          key: "nombre",
          sortable: true,
        },
        {
          key: "codigo",
          sortable: true,
        },
      
        {
          key: "precio",
          label: "precio",
          sortable: true,
        },
      
       
        {
          key: "cantidad",
          label: "cantidad",
          sortable: true,
        },
        "funciones",
      ],

      inputEditVisibilyty: true,
      inputSearchVisibilyty: true,
      formVisibilityEDit: false,
      infoVisibilityDelete: false,
      infoVisibilityEdit: false,
      inputDeleteVisibilyty: true,

      formEdit: {
        nombre: null,
        codigo: null,
        stock: null,
        descripcion: null,
        categoria: null,
        unidadMedida: null,
        precio: null,
        proveedor_id: null,
        cantidad: null,
        createdAt: null,

        updatedAt: null,
        _id: null,
      },

      categorias: [],

      unidadesMedida: [],

      nuevoProducto: {
        nombre: null,
        codigo: null,
        stock: null,
        descripcion: null,
        categoria: null,
        unidadMedida: null,
        precio: null,
        proveedor_id: null,
        cantidad: null,
      },
      productos: [],
    };
  },
};
</script>
