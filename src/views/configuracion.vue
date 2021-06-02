<template>
  <div>
    <div v-if="usuario.roles.name !== 'usuario' ">
    <div class="mt-2">
      <b-tabs content-class="mt-3" align="center">
        <b-tab title="General">
          <b-container fluid>
            <b-row>
              <b-col md="4">
                <b-list-group :class="{'text-white' : dark}">
                  <b-list-group-item  :class="{'dark-secondary' : dark}"
                    class="d-flex justify-content-between align-items-center"
                  >
                    proveedores registrados
                    <b-badge variant="primary" pill>{{
                      ProveedoresCount
                    }}</b-badge>
                  </b-list-group-item>

                  <b-list-group-item :class="{'dark-secondary' : dark}"
                    class="d-flex justify-content-between align-items-center"
                  >
                    productos registrados
                    <b-badge variant="primary" pill>{{
                      productosCount
                    }}</b-badge>
                  </b-list-group-item>

                  <b-list-group-item :class="{'dark-secondary' : dark}"
                    class="d-flex justify-content-between align-items-center"
                  >
                    total de ventas
                    <b-badge variant="primary" pill>1</b-badge>
                  </b-list-group-item>
                  <b-list-group-item :class="{'dark-secondary' : dark}"
                    class="d-flex justify-content-between align-items-center"
                  >
                    dolar
                    <b-badge variant="primary" pill>{{
                      infoEmpresa.dolar | formatNumber
                    }}</b-badge>
                  </b-list-group-item>
                </b-list-group>

                <div>
                  <div 
          v-if="usuario.roles.name === 'administrador'"

                    class="btn color-secondary text-white c-hand"
                    v-b-toggle.collapse-1
                  >
                    editar dolar
                  </div>
                  <b-collapse id="collapse-1" class="mt-2" 
          v-if="usuario.roles.name === 'administrador'"
                  
                  >
                    <b-card :class="{'dark-secondary' : dark}" >
                      <div class="card-body d-flex">
                        <b-form-input
                          type="number"
                          class="w-75"
                          v-model.number="infoEmpresa.dolar"
                        ></b-form-input>
                        <div
                          @click="putDolar()"
                          class="btn color-primary text-white c-hand "
                          style="margin-top: 0px"
                        >
                          <i class="fas fa-pencil-alt"></i>
                        </div>
                      </div>
                    </b-card>
                  </b-collapse>
                </div>
                <div class="mt-4 d-flex"></div>
              </b-col>
              <b-col md="4">
                <div class="card"   :class="{'dark-secondary' : dark}">
                  <div class="card-header" :class="{'color-secondary' : dark}">Información del Negocio</div>
                  <div class="card-body">
                    {{ infoEmpresa.nombre }}
                    <hr />
                    telefono: {{infoEmpresa.telefono }} 
                    <hr>
                    registro:
                    {{ infoEmpresa.rif }}
                  </div>
                </div>
              </b-col>
              <b-col md="4">
                <div class="card" :class="{'dark-secondary' : dark}">
                  <div class="card-header" :class="{'color-secondary' : dark}">
                    Información de {{ usuario.roles.name }}
                  </div>
                  
                  <div class="card-body">
                     nombre : {{ usuario.nombre }}
                    <hr />
                    documento : {{ usuario.documento }}
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </b-tab>
        <b-tab v-if="usuario.roles.name === 'administrador' " title="Productos">
          <b-row class="ml-2">
            <b-col 
            md="4" 
          v-if="usuario.roles.name === 'administrador'"

            class=" mt-2">
              <b-form class="text-center card"  :class="{'dark-secondary' : dark}">
                <div class="card-header" :class="{'color-secondary' : dark}">Categorias</div>
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
            </b-col>
            <b-col class="mt-2">
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
            </b-col>
          </b-row>
          <b-row class=" ml-2 mt-2">
            <b-col 
          v-if="usuario.roles.name === 'administrador'"
            
            md="4" class="mt-2">
              <b-form class="text-center card" :class="{'dark-secondary' : dark}">
                <div class="card-header" :class="{'color-secondary' : dark}">unidades de medida</div>
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
                  <div
                    @click="sendUnidad()"
                    class="btn text-white btn-lg color-primary c-hand"
                  >
                    guardar
                  </div>
                </div>
              </b-form>
            </b-col>
            <b-col  class="mt-2">
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
            </b-col>
          </b-row>
        </b-tab>

        <b-tab
          active
          v-if="usuario.roles.name === 'administrador'"
          title="Administración"
        >
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
                  <i>{{ usuarios.length }}</i> <br />
                  Usuarios
                </div>
                <div
                  class="d-none text-center boton-cuadrado color-primary c-hand text-white mt-3 ml-3"
                  data-toggle="modal"
                  data-target="#modalSearch"
                >
                  <i class="fas fa-search"></i> <br />
                  buscar
                </div>
                <div class="d-flex align-items-center">
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
                    <b-table
                      :filter="filter"
                      class="card mt-3 list-scroll scrollbar-light-blue"
                      :sticky-header="true"
                      striped
                      hover
                      :items="usuarios"
                      :fields="fieldsUsuarios"
                    >
                      <template #cell(funciones)="row">
                        <div
                          :class="{ 'd-none': row.item.status == false }"
                          @click="deleteUser(row.item)"
                          class="btn red-alert text-white mt-0 c-hand"
                          size="sm"
                        >
                          <i class="fas fa-trash-alt"></i>
                        </div>
                        <div
                          v-if="row.item.status == false"
                          @click="activateUser(row.item)"
                          class="btn color-primary text-white mt-0 c-hand"
                          size="sm"
                        >
                          <i class="fas fa-check"></i>
                        </div>
                        <div
                          @click="editUser(row.item)"
                          class="btn yellow-danger text-white mt-0 c-hand"
                          size="sm"
                          data-toggle="modal"
                          data-target="#modalEdit"
                        >
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
        </b-tab>
      </b-tabs>
    </div>

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
                  placeholder="nombre y apellido"
                  class="mt-3"
                  autocomplete="off"
                />
                <b-form-select
                  class="mt-3"
                  v-model="formAdd.roles"
                  :options="roles"
                ></b-form-select>
                <b-form-input
                  required
                  type="text"
                  v-model="formAdd.username"
                  placeholder="usuario de acceso"
                  class="form-control mt-3"
                  autocomplete="off"
                />
                {{ formAdd.username }}
                <b-form-input
                  required
                  type="password"
                  v-model="formAdd.password"
                  placeholder="contraseña"
                  class="form-control mt-3"
                  autocomplete="off"
                />

                <b-form-input
                  required
                  type="password"
                  :state="validacion"
                  v-model="verifyPassword"
                  placeholder="verificar contraseña"
                  class="form-control mt-3"
                  autocomplete="off"
                />

                <div class="d-flex">
                  <b-form-input
                    required
                    type="text"
                    id="telefono"
                    v-model="formAdd.documento"
                    placeholder="documento de identidad"
                    class="form-control mt-3  w-50"
                    autocomplete="off"
                  />
                  <b-form-input
                    required
                    type="email"
                    v-model="formAdd.correo"
                    placeholder="correo electronico"
                    class="form-control mt-3 ml-2 w-50"
                    autocomplete="off"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer d-flex justify-content-center">
            <div
              @click="saveUser()"
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
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
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
              <form id="formEdit" class="mx-3">
                <div class="form-group mb-2">
                  <b-form-input
                    required
                    type="text"
                    onkeyup="validateNombre(this)"
                    v-model="formEditUser.nombre"
                    placeholder="nombre y apellido"
                    class="mt-3"
                    autocomplete="off"
                  />
                  <b-form-input
                    required
                    type="text"
                    v-model="formEditUser.username"
                    placeholder="usuario de acceso"
                    class="form-control mt-3"
                    autocomplete="off"
                  />
                  <b-form-input
                    required
                    type="password"
                    v-model="formEditUser.password"
                    placeholder="contraseña"
                    class="form-control mt-3"
                    autocomplete="off"
                  />

                  <b-form-input
                    required
                    type="password"
                    :state="validacionEdit"
                    v-model="verifyPassword"
                    placeholder="verificar contraseña"
                    class="form-control mt-3"
                    autocomplete="off"
                  />

                  <div class="d-flex">
                    <b-form-input
                      required
                      type="text"
                      v-model="formEditUser.documento"
                      placeholder="documento de identidad"
                      class="form-control mt-3  w-50"
                      autocomplete="off"
                    />
                    <b-form-input
                      required
                      type="email"
                      v-model="formEditUser.correo"
                      placeholder="correo electronico"
                      class="form-control mt-3 ml-2 w-50"
                      autocomplete="off"
                    />
                  </div>
                </div>
              </form>

              <div class="d-flex text-white">
                <div
                  @click="sendEditUser()"
                  class="btn btn-block color-primary mr-2 text-white c-hand"
                >
                  guardar
                </div>
                <div
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
  </div>
  <Err/>
  </div>
</template>
<script>
import Err from '../components/404.vue'
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import Vue from "vue";
import numeral from "numeral";
Vue.filter("formatNumber", function(value) {
  return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
});
export default {
  components:{Err},
  computed: {
    validacionEdit() {
      return this.formEditUser.password === this.verifyPassword;
    },
    validacion() {
      return this.formAdd.password === this.verifyPassword;
    },
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
    ...mapState([
      "server",
      "dark",
      "usuario",
      "options",
      "infoEmpresa",
      "token",
    ]),
  },
  data() {
    return {
      formEditUser: {
        username: null,
        password: null,
        correo: null,
        documento: null,
        nombre: null,
        roles: null,
      },
      formVisibilityEDit: true,
      roles: [],
      filter: null,
      verifyPassword: null,

      formAdd: {
        username: null,
        nombre: null,
        documento: null,
        roles: null,
        correo: null,
        password: null,
      },
      fieldsUsuarios: [
        {
          key: "nombre",
          sortable: true,
        },
        {
          key: "correo",
          sortable: true,
        },
        {
          key: "documento",
          sortable: true,
        },
        {
          key: "roles.name",
          label: "Rol",
          sortable: true,
        },
        "funciones",
      ],
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
      usuarios: [],
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
    this.getInfoEmpresa();
    this.getUnidades();
    this.CountProveedores();
    this.countProductos();
    this.getUsers();
    this.getRoles();
  },
  methods: {
    editUser(data) {
      data.password = null;
      if (this.formVisibilityEDit === false) {
        this.formVisibilityEDit = true;
      }
      this.formEditUser = data;
    },
    async sendEditUser() {
      const { data } = await axios.put(
        `${this.server}/auth/edit`,
        this.formEditUser,{headers:{xtoken: this.token}}
      );
      this.alert(data);
      if (data.value == true) {
        this.formVisibilityEDit = false;

        this.getUsers();
      }
    },
    async deleteUser(item) {
      const { data } = await axios.delete(
        `${this.server}/auth/user/${item._id}/${item.roles._id}`,{headers:{xtoken: this.token}}
      );
      this.getUsers();
      this.alert(data);
    },
    async activateUser(item) {
      const { data } = await axios.put(
        `${this.server}/auth/user/${item._id}/${item.roles._id}`,{headers:{xtoken: this.token}}
      );
      this.alert(data);
      this.getUsers();
    },
    async saveUser() {
      if (this.formAdd.roles == null) {
        return;
      }
      if (this.formAdd.password != this.verifyPassword) {
        return;
      }
      const { data } = await axios.post(
        `${this.server}/auth/signup`,
        this.formAdd,{headers:{xtoken: this.token}}
      );
      if (data.value === false || null) {
        this.alert(data);
        return;
      }
      this.alert(data);
      this.formAdd.password = null;
      this.formAdd.username = null;
      this.formAdd.nombre = null;
      this.verifyPassword = null;
      this.formAdd.documento = null;
      this.formAdd.roles = null;
      this.formAdd.correo = null;
      this.getUsers();
    },
    async getRoles() {
      this.roles = [];
      let { data } = await axios.get(`${this.server}/auth/get/roles`);
      data.forEach((rol) => {
        data = { value: rol._id, text: rol.name };

        this.roles.push(data);
      });
      let defaultSelect = {
        value: null,
        text: "seleccione una opcion",
        disabled: true,
      };
      this.roles.push(defaultSelect);
    },
    async putDolar() {
      let json = { dolar: this.infoEmpresa.dolar };
      const { data } = await axios.put(
        `${this.server}/system/empresa/dolar/${this.infoEmpresa._id}`,
        json,{headers:{xtoken: this.token}}
      );
      this.alert(data);
    },
    alert(data) {
      if (data.value === true) {
        this.$toastr.success(data.message, "configuracion", this.options);
      }
      if (data.value === false) {
        this.$toastr.error(data.message, "configuracion", this.options);
      }
      if (data.value === null) {
        this.$toastr.warning(data.message, "configuracion", this.options);
      }
    },
    async deleteCategoria(id) {
      const { data } = await axios.delete(
        `${this.server}/system/categoriaProducto/${id}`,{headers:{xtoken: this.token}}
      );
      this.alert(data);

      this.getCategoriasProductos();
    },
    async getUsers() {
      const { data } = await axios.get(`${this.server}/auth/getUsers/`);
      this.usuarios = data;
    },
    async deleteUnidad(id) {
      const { data } = await axios.delete(
        `${this.server}/system/unidades/${id}`,{headers:{xtoken: this.token}}
      );
      this.alert(data);
      this.getUnidades();

      this.getCategoriasProductos();
    },

    async CountProveedores() {
      const { data } = await axios.get(`${this.server}/proveedores/get/count`);
      this.ProveedoresCount = data;
    },
    async countProductos() {
      const { data } = await axios.get(`${this.server}/productos/get/count`);
      this.productosCount = data;
    },
    async getInfoUsuario() {
      const data = await axios.get(`${this.server}/auth/config/user/:id`);
      this.infoUsuario = data;
    },
    async getUnidades() {
      const { data } = await axios.get(`${this.server}/system/unidades`);
      this.unidades = data;
    },
    async getCategoriasProductos() {
      const { data } = await axios.get(
        `${this.server}/system/categoriaProducto`
      );
      this.categoriasProductos = data;
    },
    async sendUnidad() {
      const { data } = await axios.post(
        `${this.server}/system/unidades`,

        this.nuevaUnidad,{headers:{xtoken: this.token}}
      );
      this.alert(data);
      this.nuevaUnidad.nombre = null;
      this.nuevaUnidad.abreviacion = null;
      this.getUnidades();
    },
    async sendCategoria() {
      const { data } = await axios.post(
        `${this.server}/system/categoriaProducto`,
        this.nuevaCategoria,{headers:{xtoken: this.token}}
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
    ...mapMutations([
      "getStorage",
      "getLogin",
      "cambiarLogin",
      "saveToken",
      "getUser",
      "getInfoEmpresa",
    ]),
  },
};
</script>
<style scoped>
.btn {
  border-radius: 0.25rem;
}
</style>
