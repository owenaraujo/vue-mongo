<template>
  <div>
    <div class="card mt-2 p-2">
      <b-row cols-md="2" cols="1">
        <b-col>
          <div class="d-flex align-items-center">
            <b-form-datepicker
              type="datetime"
              style="width: 35% ;height: 40px; font-size: 10px"
              class="mr-2"
              v-model="fechaInicio"
            />
            <b-form-datepicker
              v-model="fechaFinal"

              type="datetime"
              style="width: 35%; height: 40px; font-size: 10px"
              class="mr-2"
            />
            <div style="width: 15%" class="btn material-icons c-hand color-primary text-white" @click="getVentas">
search
            </div>
            <div style="width: 15%"  class="btn material-icons yellow-danger text-white"  @click="pdfCompleto()" >
              download
            </div>
          
          </div>

        </b-col>
        <b-col>
          <div class="d-flex align-items-center ">
            <div class="w-50">
              <p class="text-center">ventas del dia: {{ totalVentas$ }} $</p>
            </div>
            <div class="w-50">
              <p class="text-center">
                ventas del dia: {{ totalVentasBs | formatNumber }} bs
              </p>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <div ref="info" class="d-none container fluid">
      <div class="container fluid mt-3">
        <div class="text-right">
          {{ fecha | formatDate }}
        </div>
        <h1>{{ infoEmpresa.nombre }}</h1>
        <h4>{{ infoEmpresa.telefono }}</h4>
        <h5>R.i.F. {{ infoEmpresa.rif }}</h5>
      </div>
    </div>
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="total de productos vendidos">
          <div class="container fluid" ref="reporteCompleto">
            <div class="container fluid">
              <b-table
                :sticky-header="true"
                striped
                style="max-height: 65vh"
                hover
                bordered
                outlined
                class="mt-3 list-scroll scrollbar-light-blue text-center"
                :fields="reportesField"
                :items="reporte"
              >
                <template v-slot:custom-foot>
                  <b-tr class="d-none">
                    <b-th colspan="3"><span class="sr-only"></span></b-th>
                    <b-th variant="warning" colspan="1">
                      {{ cantidadReporte }}
                    </b-th>
                    <b-th variant="primary" colspan="1">
                      {{ totalVentas$ }} $
                    </b-th>
                  </b-tr>
                </template>
                <template #cell(numero)="row">
                  {{ row.index + 1 }}
                </template>
                <template #cell(total)="row">
                  
                  {{ (row.item.cantidad * row.item.id_producto.precio)  }} $
                </template>
              </b-table>
              <hr />
            </div>
          </div>
        </b-tab>
        <b-tab title="detalles de ventas" active>
          <b-row class="">
            <b-col class="" md="6">
              <b-table
                style="max-height: 67.2vh"
                :shortable="true"
                :sticky-header="true"
                :items="ventas"
                :fields="fields"
                striped
                responsive="sm"
                class="card mt-3 list-scroll scrollbar-light-blue"
              >
                <template #cell(createdAt)="row">
                  {{ row.item.createdAt | formatDate }}
                </template>

                <template #cell(acciones)="row">
                  <div size="sm" @click="ventaInfo(row.item)" class="mr-2 btn">
                    información
                  </div>
                </template>
              </b-table>
            </b-col>
            <b-col md="6">
              <div class="card mt-3 text-dark" >
                <div class="card-header text-center c-hand"  @click="createPdf()">detalles de venta
                  
                   </div>
                <div  ref="lista">
                  <div class="card-body">
                  <p>
                    cotizacion del dia de venta :
                    {{ infoVenta.dolar | formatNumber }}
                  </p>
                  <p>total de venta : {{ totalPrecio }}$</p>
                  <p>vendidos: {{ totalProductos }} unidades</p>
                </div>
                <div class="text-center container-fluid">
                  <b-table
                    style="max-height: 30vh"
                    :sticky-header="true"
                    striped
                    hover
                    class="mt-3 list-scroll scrollbar-light-blue"
                    :items="productos"
                    :fields="fieldsInfo"
                  >
                  <template #cell(total)='row'>
                  {{row.item.cantidad * row.item.id_producto.precio}}
                  
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

    <Err />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import numeral from "numeral";
import axios from "axios";
import Vue from "vue";
import Err from "../components/404.vue";
import moment from "moment";
Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY hh:mm a");
  }
});
Vue.filter("formatNumber", function (value) {
  return numeral(value).format("0,0.00"); // displaying other groupings/separators is possible, look at the docs
});
export default {
  components: {
    Err,
  },
  async created() {
    this.tiempo();
    this.dolar()
  },
  name: "Links",
  data() {
    return {
      total: [],
      fechaInicio: null,
      fechaFinal: null,
      fecha: null,
      reporte: [],
      infoVenta: [],
      reportesField: [
        { key: "numero", label: "#" },
        { key: "id_producto.nombre", label: "Nombre" },

        { key: "id_producto.precio", label: "precio" },
        "cantidad",
        "total",
      ],
      fields: [
        { key: "createdAt", label: "creacion", sortable: true },
        "acciones",
      ],
      fieldsInfo: [
        { key: "id_producto.nombre", label: "producto" },
        "cantidad",
        { key: "id_producto.precio", label: "precio" },
        { key: "total", label: "total" },
      ],
      time: null,
      ventas: [],
      visible: false,
      busqueda: "",
      validated: 1,

      productos: [],
    };
  },
  computed: {
    ...mapState([
      "options",
      'infoDolar',
      "dark",
      "server",
      "infoEmpresa",
      "usuario",
      "token",
    ]),

    
    cantidadReporte() {
      return this.reporte.reduce(
        (sum, item) => sum + parseFloat(item.cantidad),
        0
      );
    },
    totalVentasBs() {
      return this.ventas.reduce(
        (sum, item) => sum + parseFloat(item.total * item.dolar),
        0
      );
    },
    totalVentas$() {
      return this.ventas.reduce((sum, item) => sum + parseFloat(item.total), 0);
    },
    totalProductos() {
      return this.productos.reduce(
        (sum, item) => sum + parseFloat(item.cantidad),
        0
      );
    },
    totalPrecio() {
      return this.productos.reduce(
        (sum, item) => sum + parseFloat(item.precio * item.cantidad),
        0
      );
    },
  },
  methods: {
    tiempo() {
      setInterval(() => {
        this.fecha = new Date();
      }, 1000);
    },
    productosAll() {
      this.reporte = [];
      this.total.map((item) => {
        item.productos.map((e) => {
          const vall = this.reporte.map((value) => {
            if (value.id_producto._id === e.id_producto._id) {
              let valor =value.cantidad + e.cantidad

             value.cantidad = valor;

              return true;
            } else {
              return false;
            }
          });
          if (vall.length === 0) {
            return this.reporte.push(e);
          }
          if (vall.indexOf(true) !== -1) {
            return;
          }

          this.reporte.push(e);
        });
      });
    },
    pdfCompleto() {
      const info = this.$refs.info;
      const lista = this.$refs.reporteCompleto;
      var ventana = window.open("", "PRINT", "height=400,width=600");
      ventana.document.write(
        '<link rel="stylesheet" href="/md/bootstrap.min.css" />'
      );
      ventana.document.write(info.innerHTML);
      ventana.document.write(lista.innerHTML);
    },
    createPdf() {
      const lista = this.$refs.lista;
      const info = this.$refs.info;

      var ventana = window.open("", "PRINT", "height=400,width=600");

      ventana.document.write(info.innerHTML);
      ventana.document.write(lista.innerHTML);
      ventana.document.write(
        '<link rel="stylesheet" href="../md/bootstrap.min.css" />'
      );
      ventana.document.close();
      ventana.focus();
      setTimeout(function () {
        ventana.print();
      }, 2000)
    },
    ventaInfo(data) {
      
      this.infoVenta = data;
      this.productos = data.productos;
    },
    filter() {
      const text = this.id;
      console.log(text);
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
    async getVentas() {
      if (this.fechaInicio == null) return
      if (this.fechaFinal == null) return
      const { data } = await axios.get(`${this.server}/ventas/get/${this.fechaInicio}/${this.fechaFinal}`);
      this.ventas = data;
    this.getTotal();
    
    },
    async getTotal() {
      if (this.fechaInicio == null) return
      if (this.fechaFinal == null) return
      const { data } = await axios.get(`${this.server}/ventas/get/${this.fechaInicio}/${this.fechaFinal}`);
      this.total = data;
    this.productosAll();
    
    },
    deleteStore() {
      this.store = [];
      this.getVentas();
    },
    obtener() {
      return this.store.reduce(
        (sum, item) => sum + parseFloat(item.cantidad * item.precio),
        0
      );
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
  },
};
</script>
<style scoped>
.border-white {
  border: 0.2px solid white;
  padding: 5px;
}

.iconC {
  top: -5px;
  width: 23px;
  left: 31px;
  height: 23px;
  position: absolute;
  border-radius: 10rem;
  text-align: center;

  align-content: center;
}

.card {
  max-height: 80vh;
}
.btn {
  border-radius: 10rem;
}
</style>
