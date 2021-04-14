

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
            class="text-center boton-cuadrado yellow-danger c-hand text-white mt-3 ml-3"
            data-toggle="modal"
            data-target="#modalEdit"
          >
            <i class="fas fa-pencil-alt"></i> <br />
            editar
          </div>
          <div
            style="position: absolute; right: 15px"
            class="text-center boton-cuadrado red-alert c-hand text-white mt-3 ml-3"
            data-toggle="modal"
            data-target="#modalDelete"
          >
            <i class="fas fa-trash-alt"></i> <br />
            borrar
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <div class="card mt-3 list-scroll scrollbar-light-blue">
          <div class="text-center">
            <table
              class="table table-striped table-hover"
              :class="{ 'table-dark': dark }"
            >
              <thead class="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">proveedor</th>
                  <th scope="col">codigo</th>
                  <th scope="col">telefono</th>
                  <th scope="col">correo</th>
                </tr>
              </thead>
              <tbody class="" id="tabla">


                  <tr class="table-active" v-for="proveedor of proveedores" v-bind:key="proveedor._id">
   
                      <th scope="row">{{ proveedor.i++}}</th>
                      <td>{{proveedor.nombre}}</td>
                      <td>{{proveedor.codigo}}</td>
                      <td>{{proveedor.telefono}}</td>
                      <td>{{proveedor.correo}}</td>

                      
                    </tr>

              
              </tbody>
              <tfoot class="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">proveedor</th>
                  <th scope="col">codigo</th>
                  <th scope="col">telefono</th>
                  <th scope="col">correo</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </b-col>
    </b-row>
    <!-- modales  -->
    <div>
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
              <div
                id="busquedaEdit"
                :class="{ 'd-none': !inputEditVisibilyty }"
              >
                <div class="md-form mb-4 d-flex">
                  <i class="fas fa-search prefix grey-text"></i>
                  <b-form-input
                    autocomplete="off"
                    @keyup="getByParamsEdit"
                    v-model="params.InputEdit"
                    
                    :class="{ 'text-white': dark }"
                  >
                  </b-form-input>
                  <b-form-select
                    style="
                      
                      border-left: 0px;
                      border-right: 0px;

                      border-top: 0px;
                      padding-left: 10px;
                    "
                    :options="optionsSearch"
                    @change="getByParamsEdit"
                    v-model="params.paramEdit"
                    class="form-control custom-select ml-3"
                    :class="{ 'text-white dark-secondary': dark }"
                  >
                    
                  </b-form-select>
                  <label
                    data-error="wrong"
                    :class="{ 'text-white': dark }"
                    data-success="right"
                    for="defaultForm-pass"
                    >buscar</label
                  >
                </div>

                <div
                  id="resultadoEdit"
                  class="list-scroll scrollbar-light-blue"
                  style="max-height: 50vh"
                >
                  <div
                    v-for="resultado of resultados"
                    v-bind:key="resultado._id"
                  >
                    <div class="c-hand div-search mb-3">
                      <div
                        @click="formData(resultado._id)"
                        class="text-center w-100"
                      >
                        {{ resultado.nombre }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
                    <b-form-input
                      v-model="FormEdit.descripcion"
                      required
                      type="text"
                      onkeyup="validateDescripcion(this)"
                      id="descripcionEdit"
                      name="descripcion"
                      placeholder="descripcion"
                      class="form-control mt-3"
                      autocomplete="off"
                    ></b-form-input>
                    <div class="d-flex">
                      <b-form-input
                        v-model="FormEdit.correo"
                        required
                        type="email"
                        onkeyup="validateCorreo(this)"
                        id="correoEdit"
                        name="correo"
                        placeholder="correo"
                        class="form-control mt-3 mr-2"
                        autocomplete="off"
                      ></b-form-input>
                      <b-form-input
                        v-model="FormEdit.telefono"
                        required
                        type="number"
                        onkeyup="validateTelefono(this)"
                        id="telefonoEdit"
                        name="telefono"
                        placeholder="telefono"
                        class="form-control mt-3 ml-2 w-75"
                        autocomplete="off"
                      ></b-form-input>
                    </div>
                    <b-form-input
                      v-model="FormEdit.direccion"
                      required
                      type="text"
                      onkeyup="validateDireccion(this)"
                      id="direccionEdit"
                      name="direccion"
                      placeholder="direccion"
                      class="form-control mt-3"
                      autocomplete="off"
                    ></b-form-input>
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
                  <b-form-input
                    required
                    type="text"
                    onkeyup="validateDescripcion(this)"
                    id="descripcion"
                    v-model="formAdd.descripcion"
                    placeholder="descripcion"
                    class="form-control mt-3"
                    autocomplete="off"
                  />
                  <div class="d-flex">
                    <b-form-input
                      required
                      type="email"
                      onkeyup="validateCorreo(this)"
                      id="correo"
                      v-model="formAdd.correo"
                      placeholder="correo"
                      class="form-control mt-3 mr-2"
                      autocomplete="off"
                    />
                    <b-form-input
                      required
                      type="number"
                      onkeyup="validateTelefono(this)"
                      id="telefono"
                      v-model="formAdd.telefono"
                      placeholder="telefono"
                      class="form-control mt-3 ml-2 w-75"
                      autocomplete="off"
                    />
                  </div>
                  <b-form-input
                    required
                    type="text"
                    onkeyup="validateDireccion(this)"
                    id="direccion"
                    v-model="formAdd.direccion"
                    placeholder="direccion"
                    class="form-control mt-3"
                    autocomplete="off"
                  />
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
      <!-- modal delete  -->
      <div
        class="modal fade"
        id="modalDelete"
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
              <h4 class="modal-title w-100 font-weight-bold">Borrar</h4>
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
              <div id="busqueda" :class="{'d-none' : !inputDeleteVisibilyty}">
                <div class="md-form mb-4 d-flex" id="formSearchDelete">
                  <i class="fas fa-search prefix grey-text"></i>

                  <b-form-input
                    v-model="params.InputDelete"
                    
                    autocomplete="off"
                    :class="{ 'text-white': dark }"
                    type="text"
                    @keyup="getByParamsDelete"
                  >
                  </b-form-input>

                  <b-form-select
                    v-model="params.paramDelete"
                    :options="optionsSearch"
                    @change="getByParamsDelete"
                    style="
                      
                      border-left: 0px;
                      border-right: 0px;

                      border-top: 0px;
                      padding-left: 10px;
                    "
                    name=""
                    id="parametroDelete"
                    class="form-control  custom-select ml-3"
                    :class="{ 'text-white dark-secondary': dark }"
                  >
                  </b-form-select>
                  <label
                    data-error="wrong"
                    :class="{ 'text-white': dark }"
                    data-success="right"
                    for="defaultForm-pass"
                    >buscar</label
                  >
                </div>

                <div
                  id="resultadoDelete"
                  class="list-scroll scrollbar-light-blue"
                  style="max-height: 50vh"
                >
                  <div
                    v-for="resultado of resultadosDelete"
                    v-bind:key="resultado._id"
                  >
                    <div class="c-hand div-search mb-3">
                      <div
                        @click="infoData(resultado._id)"
                        class="text-center w-100"
                      >
                        {{ resultado.nombre }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="informacionDelete" :class="{'d-none': inputDeleteVisibilyty}">
                <div id="contenedorDelete">
                  <h4>{{infoDelete.nombre}}</h4>
                  <p>{{infoDelete.descripcion}}</p>
                  <div class="d-flex justify-content-center">
                    <p class="h5">{{infoDelete.correo}}</p>
                    <p class="h5 ml-3">{{infoDelete.telefono}}</p>
                  </div>
                  <div class="d-flex justify-content-center">
                    <div
                      @click="deleteProveedor(infoDelete._id)"
                      class="text-center boton-cuadrado color-primary c-hand text-white mt-3 mr-5"
                    >
                      <i class="fas fa-check"></i> <br />
                      borrar
                    </div>
                    <div
                      @click="cancelDelete"
                      class="text-center boton-cuadrado red-alert c-hand text-white mt-3 ml-5"
                    >
                      <i class="fas fa-times"></i> <br />
                      cancelar
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal-footer d-flex justify-content-center mr-4 ml-4"
            ></div>
          </div>
        </div>
      </div>

      <!-- modal delete  -->
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
    ...mapState(["dark", "alerts", "server"]),
  },
  data() {
    return {
      optionsSearch: [
        {
          value: null,
          text: "parametro de busqueda",
          disabled: true,
          selected: true,
        },
        { value: "nombre", text: "nombre" },
        { value: "codigo", text: "codigo" },
        { value: "correo", text: "Correo" },
        { value: "direccion", text: "Dirección" },
      ],
      inputEditVisibilyty: true,
      formVisibilityEDit: false,
      infoVisibilityDelete: false,
      inputDeleteVisibilyty: true,

      FormEdit: {
        codigo: null,
        correo: null,
        createdAt: null,
        descripcion: null,
        direccion: null,
        nombre: null,
        status: null,
        telefono: null,
        updatedAt: null,
        _id: null,
      },
      infoDelete: {
        codigo: null,
        correo: null,
        createdAt: null,
        descripcion: null,
        direccion: null,
        nombre: null,
        status: null,
        telefono: null,
        updatedAt: null,
        _id: null,
      },
      resultadosDelete: [],
      resultados: [],

      params: {
        InputDelete: null,
        InputEdit: null,
        paramDelete: null,
        paramEdit: null,
      },
      formAdd: {
        nombre: "",
        codigo: "",
        descripcion: "",
        correo: "",
        telefono: "",
        direccion: "",
      },
      proveedores: [],
    };
  },
  created() {
    this.getting()
  },
  methods: {
    alert(data) {
      this.alerts.push(data);
    },
    async sendEdit(id) {
      const { data } = await axios.put(
        `${this.server}/proveedores/put/${id}`,
        {
          nombre: this.FormEdit.nombre,
          codigo: this.FormEdit.codigo,
          descripcion: this.FormEdit.correo,
          correo: this.FormEdit.correo,
          telefono: this.FormEdit.telefono,
          direccion: this.FormEdit.direccion,
        }
      );
    this.getting()
      
      this.intercambioEdit();
      this.alert(data);
    },
    cancelDelete(){
      
      this.intercambioDelete()
    },
    async deleteProveedor(id){
   const {data}= await  axios
        .delete(
          `${this.server}/proveedores/delete/${id}`
        )
      this.alert(data);
    this.getting()

      this.intercambioDelete()

    },
    getByParamsEdit() {
      // if (this.params.InputEdit === "") return (this.resultados = []);
      axios
        .get(
          `${this.server}/proveedores/get/${this.params.InputEdit}/${this.params.paramEdit}`
        )
        .then((response) => (this.resultados = response.data));
      // this.resultados = data;
    },
    getByParamsDelete() {
      axios
        .get(
          `${this.server}/proveedores/get/${this.params.InputDelete}/${this.params.paramDelete}`
        )
        .then((response) => (this.resultadosDelete = response.data));
    },
    intercambioDelete() {
      
      this.inputDeleteVisibilyty = !this.inputDeleteVisibilyty;
      this.params.InputDelete = null;
    },
    intercambioEdit() {
      this.formVisibilityEDit = !this.formVisibilityEDit;
      this.inputEditVisibilyty = !this.inputEditVisibilyty;
      this.params.InputEdit = null;
    },
    async formData(id) {
      const { data } = await axios.get(
        `${this.server}/proveedores/get/${id}`
      );
      this.FormEdit = data;
      this.resultados = [];
      this.intercambioEdit();
    },
    async infoData(id) {
      const { data } = await axios.get(
        `${this.server}/proveedores/get/${id}`
      );
      this.infoDelete = data;
      this.resultadosDelete = [];
      this.intercambioDelete();
    },
    async addProveedores() {
      const { data } = await axios.post(
        `${this.server}/proveedores/post`,
        this.formAdd
      );

      this.formAdd = {};
      this.getting()
      this.alert(data);
    },
   
    getting() {
      axios
        .get(`${this.server}/proveedores/get`)
        .then(
          (response) => (
            (this.proveedores = response.data)
          )
        );
    },
  },
};
</script>
<style >
.form-control {
  border-radius: 20rem;
}
</style>