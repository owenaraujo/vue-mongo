<template>
  <div>
    <div class="card mt-2 p-2">
      <b-row cols-md="2">
        <b-col>
          <div class="d-flex">
            <b-form-input
              type="datetime-local"
              style="width:40%"
              class=" mr-2"
              v-model="time"
            />
            <b-form-input
              type="datetime-local"
              style="width:40%"
              class=" mr-2"
              v-model="time"
            />
            <div style="width:15%" class="btn" @click="getProductos">
              <i class="fas fa-search"></i>
            </div>
          </div>
        </b-col>
        <b-col>
          <div class="d-flex">
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
    <b-row>
      <b-col md="6">
        <b-table
          style="max-height: 70vh"
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
        <div class="card mt-3" ref="content">
          <div class="card-header">informacion</div>
          <div class="card-body">
            <button @click="createPdf()"></button>
            <p>
              
              cotizacion del dia de venta : {{ infoVenta.dolar | formatNumber }}
            </p>
            <p>total de venta : {{ totalPrecio }}$</p>
            <p>vendidos: {{ totalProductos }} unidades</p>
          </div>
          <b-table
            style="max-height: 40vh"
            :sticky-header="true"
            striped
            hover
            class=" mt-3 list-scroll scrollbar-light-blue"
            :items="productos"
            :fields="fieldsInfo"
          ></b-table>
        </div>
      </b-col>
    </b-row>

    <Err />
  </div>
</template>

<script>
import jspdf from 'jspdf'

import { mapState, mapMutations } from "vuex";
import numeral from "numeral";
import axios from "axios";
import Vue from "vue";
import Err from "../components/404.vue";
import moment from "moment";

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY hh:mm");
  }
});
Vue.filter("formatNumber", function(value) {
  return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
});
export default {
  components: {
    Err,
  },
  created() {
    this.getProductos();
  },
  name: "Links",
  data() {
    return {
      infoVenta: [],
      fields: [{ key: "createdAt", label: "creacion",
          sortable: true,
      
      
      }, "acciones"],
      fieldsInfo: [
        { key: "id_producto.nombre", label: "producto", sortable: true },
        "cantidad",
        { key: "precio", label: "precio de venta" },
        { key: "id_producto.precio", label: "precio actual" },
      ],
      time: null,
      ventas: [],
      visible: false,
      busqueda: "",
      validated: 1,

      store: [],
      productos: [],
    };
  },
  computed: {
    ...mapState([
      "options",
      "dark",
      "server",
      "infoEmpresa",
      "usuario",
      "token",
    ]),
    total() {
      return this.store.reduce(
        (sum, item) => sum + parseFloat(item.cantidad * item.precio),
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
    createPdf(){
let pdfName = 'pdf'
 var doc = new jspdf();
 const contentHtml = this.$refs.content.innerHTML;
  doc.fromHTML(contentHtml, 15, 15, {
    width: 170
  });
  
    doc.save(pdfName + '.pdf');

    },
    ventaInfo(data) {
      this.infoVenta = data;
      this.productos = data.productos;
    },
    filter() {
      const text = this.id;
      console.log(text);
    },
    sumCantidad(index, id) {
      this.store.map((element) => {
        if (element.id_producto == id) {
          this.productos.map(function(item) {
            if (item._id === element.id_producto) {
              if (item.cantidad == 0) {
                return;
              }
              item.cantidad--;

              element.cantidad++;
            }
          });
        }
      });
    },
    resCantidad(index, id) {
      const self = this;
      this.store.map((element) => {
        if (element.id_producto === id) {
          this.productos.map(function(item) {
            if (item._id === element.id_producto) {
              if (element.cantidad == 0) {
                return;
              }
              item.cantidad++;
              element.cantidad--;
              if (element.cantidad == 0) {
                self.deleteFromStore(index);
              }
            }
          });
        }
      });
    },
    deleteFromStore(index) {
      this.store.splice(index);
    },
    ...mapMutations([
      "getStorage",
      "getLogin",
      "cambiarLogin",
      "saveToken",
      "getUser",
      "getInfoEmpresa",
    ]),
    async getProductos() {
      const { data } = await axios.get(`${this.server}/ventas/get/`);
      this.ventas = data;
    },
    deleteStore() {
      this.store = [];
      this.getProductos();
    },
    obtener() {
      return this.store.reduce(
        (sum, item) => sum + parseFloat(item.cantidad * item.precio),
        0
      );
    },
    async enviar() {
      if (this.store.length == 0) {
        return;
      }
      const value = this.obtener();
      const valores = {
        dolar: this.infoEmpresa.dolar,
        total: value,
        productos: this.store,
      };
      const { data } = await axios.post(`${this.server}/ventas`, valores, {
        headers: { xtoken: this.token },
      });

      this.alert(data);
      if (data.value === true) {
        this.store = [];
      }
    },
    verifyStock(index) {
      for (let i = 0; i < this.productos.length; i++) {
        const element = this.productos[index];
        let param = element.cantidad - element.stock;
        if (element.cantidad < element.venta) {
          element.alerta = "stock no disponible";
        }
        if ((param <= element.venta) & (element.venta < element.cantidad)) {
          element.alerta = "limite de stock";
        }
        if (param > element.venta) {
          element.alerta = null;
        }

        if (element.cantidad == element.venta) element.alerta = "stock en 0";
      }
    },
    save() {
      var index = null;
      let param = index.cantidad - index.stock;

      if (index.cantidad < index.venta) {
        index.alerta = "stock no disponible";
      }
      if ((param <= index.venta) & (index.venta < index.cantidad)) {
        index.alerta = "limite de stock";
      }
      if (param > index.venta) {
        index.alerta = null;
      }

      if (index.cantidad == index.venta) index.alerta = "stock en 0";
    },

    saveStore(index) {
      for (let i = 0; i < this.productos.length; i++) {
        const element = this.productos[index];
        if (element.venta == 0 || element.venta == null) return;
        if (element.cantidad - element.stock < element.venta) {
          element.alerta = "limite de stock disponible";
        } else {
          element.cantidad = element.cantidad - element.venta;
          let data = this.store.map(function(item) {
            if (item.id_producto == element._id) {
              const ventaActual = parseFloat(element.venta);
              const ventaAnterior = parseFloat(item.cantidad);
              //element.cantidad = element.cantidad - ventaActual
              item.cantidad = ventaActual + ventaAnterior;
              return true;
            } else {
              return false;
            }
          });
          if (data[0] === true) {
            element.venta = null;
            element.alerta = null;

            return;
          }
          this.store.push({
            producto: element.nombre,
            cantidad: element.venta,
            precio: element.precio,
            id_producto: element._id,
          });

          element.venta = null;
          element.alerta = null;
        }
      }
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
