

<template>
  <div>
    <b-row>
      <b-col>
        <div class="d-flex">
          <div
            class="text-center boton-cuadrado quinto c-hand text-white mt-3"
            data-toggle="modal"
            data-target="#modalAdd"
          >
            <i class="fas fa-plus"></i> <br />
            nuevo
          </div>
          
          <div
            class=" d-none text-center boton-cuadrado yellow-danger c-hand text-white mt-3 ml-3"
            data-toggle="modal"
            data-target="#modalEdit"
          >
            <i class="fas fa-pencil-alt"></i> <br />
            editar
          </div>
          <div
            class="text-center boton-cuadrado color-primary c-hand text-white mt-3 ml-3"
           
          >
           <i>{{proveedores.length}}</i> <br>
proveedores
          </div>
          <div
            class="d-none text-center boton-cuadrado color-primary c-hand text-white mt-3 ml-3"
            data-toggle="modal"
            data-target="#modalSearch"
          >
            <i class="fas fa-search"></i> <br />
            buscar
          </div>
           <div class="d-flex align-items-center" >
            <b-form-input
            class="w-75 ml-3"
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            
             
            
          </div>
          
              
          
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <div class="">
          <div class="text-center">
            <div>
             
    <b-table class="card mt-3 list-scroll scrollbar-light-blue" :sticky-header="true" striped  hover :filter="filter" :items="proveedores" :fields="fields">
<template #cell(funciones)="row">
        <div class="btn red-alert text-white mt-0 c-hand" size="sm" @click="deleteProveedor(row.item._id)" >
         <i class="fas fa-trash-alt"></i>
        </div>
        <div class="btn yellow-danger text-white mt-0 c-hand" size="sm" data-toggle="modal"
            data-target="#modalEdit" @click="FormEditSend(row.item)" >
          <i class="fas fa-pencil-alt"></i>
        </div>

        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
        
      </template>

    </b-table>
  </div>
            
          </div>
        </div>
      </b-col>
    </b-row>
    <!-- modales  -->
    <div>
      <!-- modal edit -->

      <div
      data-bs-backdrop="static"
       data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true"
        class="modal fade"
        id="modalEdit"
        
        role="dialog"
       
       
      >
        <div class="modal-dialog modal-md">
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
             
              <!-- form editar -->
              <div :class="{ 'd-none': !formVisibilityEDit }">
                <form id="formEdit" class="">
                  <div class="form-group mb-2">
                    <b-form-input
                      required
                      type="text"
                      v-model="FormEdit.nombre"
                      onkeyup="validateNombre(this)"
                      id="nombreEdit"
                      name="nombre"
                      placeholder="nombre"
                      class="mt-3"
                      autocomplete="off"
                    ></b-form-input>
                    <b-form-input
                      required
                      v-model="FormEdit.codigo"
                      type="text"
                      onkeyup="validateCod(this)"
                      style="text-transform: uppercase"
                      id="codigoEdit"
                      name="codigo"
                      placeholder="codigo"
                      class="form-control mt-3"
                      autocomplete="off"
                    ></b-form-input>
                    
                    <div class="d-flex">
                     
                      <b-form-input
                        v-model="FormEdit.telefono"
                        required
                        type="number"
                        onkeyup="validateTelefono(this)"
                        id="telefonoEdit"
                        name="telefono"
                        placeholder="telefono"
                        class="form-control mt-3  w-50"
                        autocomplete="off"
                      ></b-form-input>
                      <b-form-input
                        v-model="FormEdit.rif"
                        
                
                       
                        
                        placeholder="rif"
                        class="form-control mt-3 ml-2 w-50"
                        autocomplete="off"
                      ></b-form-input>
                    </div>
                    
                  </div>
                </form>
                <div class="d-flex text-white">
                  <div
                    @click="sendEdit(FormEdit._id)"
                    class="btn btn-block color-primary mr-2 text-white c-hand"
                  >
                    guardar
                  </div>
                  <div
                  @click="intercambioEdit"
                    style="width: 50px; height: 40px; border-radius: 2px"
                    class="c-hand red-alert d-flex align-items-center justify-content-center"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </div>
                </div>
              </div>
              <!-- form editar  -->
            </div>
            <div
              class="modal-footer d-flex justify-content-center mr-4 ml-4"
            ></div>
          </div>
        </div>
      </div>

      <!-- modal edit -->
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
                  <b-form-input
                    required
                    type="text"
                    onkeyup="validateNombre(this)"
                    id="nombre"
                    v-model="formAdd.nombre"
                    placeholder="nombre"
                    class="mt-3"
                    autocomplete="off"
                  />
                  <b-form-input
                    required
                    type="text"
                    onkeyup="validateCod(this)"
                    style="text-transform: uppercase"
                    id="codigo"
                    v-model="formAdd.codigo"
                    placeholder="codigo"
                    class="form-control mt-3"
                    autocomplete="off"
                  />
                 
                  <div class="d-flex">
                    
                    <b-form-input
                      required
                      type="number"
                      onkeyup="validateTelefono(this)"
                      id="telefono"
                      v-model="formAdd.telefono"
                      placeholder="telefono"
                      class="form-control mt-3  w-50"
                      autocomplete="off"
                    />
                    <b-form-input
                    required
                    type="text"
                    id="rif"
                    v-model="formAdd.rif"
                    placeholder="rif"
                    class="form-control mt-3 ml-2 w-50"
                    autocomplete="off"
                  />
                  </div>
                 
                  
                </div>
              </form>
            </div>
            <div class="modal-footer d-flex justify-content-center">
             
              <div
                @click="addProveedores"
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
      
      
    </div>
    <!-- modales  -->
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "proveedor",

  computed: {
    sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      },
    ...mapState(["dark", "alerts", "server"]),
  },
  data() {
    return {
      filter: null,
        filterOn: [],
      optionsSearch: [
        {
          value: null,
          text: "parametro de busqueda",
          disabled: true,
          selected: true,
        },
        { value: "nombre", text: "nombre" },
        { value: "codigo", text: "codigo" },
        
        
      ],
      
      formVisibilityEDit: false,
      

      FormEdit: {
        codigo: null,
        
        createdAt: null,
        
        
        nombre: null,
        status: null,
        telefono: null,
        updatedAt: null,
        _id: null,
        rif: null

      },
      infoDelete: {
        codigo: null,
        
        createdAt: null,
       
        rif: null,
        nombre: null,
        status: null,
        telefono: null,
        updatedAt: null,
        _id: null
        

      },
      infoSearch: {
        codigo: null,
        
        createdAt: null,
       
        rif: null,
        nombre: null,
        status: null,
        telefono: null,
        updatedAt: null,
        _id: null
        

      },
      resultadosDelete: [],
      resultadosEdit: [],
      resultados: [],
      resultadoSearch: [],

      params: {
        InputDelete: null,
        InputEdit: null,
        InputSearch: null,
        paramDelete: null,
        paramEdit: null,
        paramSearch: null,
      },
      fields: [
          {
            key: 'nombre',
            sortable: true
          },
          {
            key: 'codigo',
            sortable: true
          },
          {
            key: 'telefono',
            sortable: true
          },
          {
            key: 'rif',
            sortable: true
          },
        'funciones',

        ],
      formAdd: {
        nombre: "",
        codigo: "",
       
        
        telefono: "",
        
        rif: ""

      },
      proveedores: [],
    };
  },
  created() {
    this.getting()
  },
  methods: {
    anonimo(data){console.log(data);},
    alert(data) {
      this.alerts.push(data);
    },
    async sendEdit(id) {
      const { data } = await axios.put(
        `${this.server}/proveedores/put/${id}`,
        {
          nombre: this.FormEdit.nombre,
          codigo: this.FormEdit.codigo,
          rif: this.FormEdit.rif,
          
          telefono: this.FormEdit.telefono,
         
          
        }
      );
    this.getting()
      
      this.intercambioEdit();
      this.alert(data);
    },
   
    async deleteProveedor(id){
   const {data}= await  axios
        .delete(
          `${this.server}/proveedores/delete/${id}`
        )
      this.alert(data);
    this.getting()

    },
    FormEditSend(data){
      this.FormEdit= data
      this.intercambioEdit()
    },
    
    
    
    
    intercambioEdit() {
      this.formVisibilityEDit = !this.formVisibilityEDit;
      
    },
    
   
    async addProveedores() {
      const { data } = await axios.post(
        `${this.server}/proveedores/post`,
        this.formAdd
      );
      this.alert(data);
if (data.value == false) return
      this.formAdd = {};
      this.getting()
    },
   
    async getting() {
      const {data} = await axios
        .get(`${this.server}/proveedores/get`)
        this.proveedores = data
    },
  },
};
</script>
