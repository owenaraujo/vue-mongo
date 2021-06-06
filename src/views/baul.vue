<template>
    <div>
    <b-row class="mt-2">
        <b-col>
            <div class="">
                <b-table  class="card mt-3 list-scroll scrollbar-light-blue" :sticky-header="true"
                        striped
                        hover :items="productos" :fields="fieldProductos">
                        
                        
                        <template #cell(precioBs)="row">
                {{ infoEmpresa.dolar * row.item.precio | formatNumber }}
              </template>
              <template #cell(funciones)="row" v-if="usuario.roles.name !== 'usuario'">
                <div
                  class="btn color-primary text-white mt-0 c-hand"
                  size="sm"
                  @click="activateProducto(row.item._id)"
                >
                  <i class="fas fa-check"></i>
                </div>

               
                <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
              </template>
                        </b-table>
            </div>
        </b-col>
        <b-col>
            <div class="card">
                asd
            </div>
        </b-col>
    </b-row>
    </div>
</template>

<script>
import axios from 'axios'
import {mapState, mapMutations} from 'vuex'
export default {
    data() {
        return {

            fieldProductos: [
        {
          key: "nombre",
          sortable: true,
        },
        {
          key: "codigo",
          sortable: true,
        },
        {
          key: "proveedor_id.nombre",
          sortable: true,
          label: "proveedor",
        },
        {
          key: "categoria.nombre",
          label: "categoria",
          sortable: true,
        },
        {
          key: "precio",
          label: "precio",
          sortable: true,
        },
        {
          key: "categoria.nombre",
          label: "categoria",
          sortable: true,
        },
        {
          key: "unidadMedida.nombre",
          label: "unidad",
          sortable: true,
        },
        {
          key: "cantidad",
          label: "cantidad",
          sortable: true,
        },
        "precioBs",
        "funciones",
      ],
            productos: [],
            categorias: [],
            unidades: [],
            proveedores: [],
            
        }
    },
    methods: {
         async activateProducto(id) {
      const { data } = await axios.delete(`${this.server}/productos/activate/${id}`,{headers:{xtoken: this.token}});
      this.alert(data);
      if (data.value == false) {
        return;
      }
      this.getProductos();
    },
        ...mapMutations([
      "getStorage",
      "getLogin",
      "cambiarLogin",
      "saveToken",
      "getUser",
      "getInfoEmpresa",
    ]),
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

    async getProductos(){
        const {data} = await axios.get(`${this.server}/productos/getDisable`)
    this.productos= data
    },
    },
    computed: {
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
    created() {
        this.getProductos()
    },
}
</script>