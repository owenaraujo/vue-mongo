<template>
  <div>
    <b-row class="mt-2">
      <b-col sm="8">
        <div class="">
          <b-table
            :busy="isBusy"
            class="card text-center mt-3 list-scroll scrollbar-light-blue"
            :sticky-header="true"
            striped
            hover
            :filter="filter"
            :items="productos"
            :fields="fieldProductos"
          >
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong> Cargando...</strong>
              </div>
            </template>
            <template #cell(precio)="row">
              <Popper
                trigger="hover"
                :options="{
                  placement: 'top',
                  modifiers: { offset: { offset: '0,10px' } },
                }"
              >
                <div class="popper">
                  {{ infoDolar.promedio * row.item.precio | formatNumber }}
                </div>

                <div slot="reference">
                  {{ row.item.precio }}
                </div>
              </Popper>
            </template>
            <template
              #cell(funciones)="row"
              v-if="usuario.roles.name !== 'usuario'"
            >
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
        <div class="card">asd</div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Vue from 'vue'
import numeral from 'numeral'
import Popper from "vue-popperjs";
import axios from "axios";
import { mapState, mapMutations } from "vuex";
Vue.filter("formatNumber", function(value) {
  return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
});
export default {
  components: {
    Popper,
  },
  data() {
    return {
      isBusy: true,
      filter: null,
      filterOn: [],
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
          key: "precio",
          label: "precio",
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
        "funciones",
      ],

      productos: [],
      categorias: [],
      unidades: [],
      proveedores: [],
    };
  },
  methods: {
    async activateProducto(id) {
      const { data } = await axios.delete(
        `${this.server}/productos/activate/${id}`,
        { headers: { xtoken: this.token } }
      );
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
      'dolar',
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

    async getProductos() {
      const { data } = await axios.get(`${this.server}/productos/getDisable`);
      this.productos = data;
      this.isBusy = false
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
      'infoDolar',
    ]),
  },
  created() {
    this.getProductos();
    this.dolar()
  },
};
</script>