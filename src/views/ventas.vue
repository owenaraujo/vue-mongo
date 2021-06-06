<template>
  <div>
    <div v-if="usuario.roles.name !== 'usuario'">
      <div
        style="position: fixed; z-index: 1500; right: 70px; bottom: 10px"
        @click="visible = !visible"
        class="c-hand"
        :class="visible ? null : 'collapsed'"
        :aria-expanded="visible ? 'true' : 'false'"
        aria-controls="collapse-4"
      >
        <div class="btn color-primary text-white">
          <i class="fas fa-shopping-cart"></i>
        </div>
        <div class=" iconC red-alert text-white">{{ store.length }}</div>
      </div>
      <div
        style="position: fixed; z-index: 1000; right: 10px ; bottom: 65px; width: 340px"
      >
        <b-collapse id="collapse-4" v-model="visible" class="mt-2">
          <div class=" card " :class="{ 'dark-secondary': dark }">
            <div
              class="card-header d-flex"
              :class="{ 'color-secondary': dark }"
            >
              <p class="text-left w-50">
                total {{ (total * infoEmpresa.dolar) | formatNumber }}
              </p>
              <p class="text-right w-50">total {{ total }}</p>
            </div>
            <div class="card-body list-scroll scrollbar-light-blue">
              <div v-for="(productos, index) in store" :key="index">
                <div>
                  {{ productos.producto }}
                  <div>{{ productos.precio }} $ c/u</div>
                  <div>
                    <div
                      class="btn red-alert text-white"
                      v-on:click="
                        resCantidad(index, `${productos.id_producto}`)
                      "
                    >
                      <i class="fas fa-minus"></i>
                    </div>
                    {{ productos.cantidad }}
                    <div
                      class="btn yellow-danger text-white"
                      v-on:click="
                        sumCantidad(index, `${productos.id_producto}`)
                      "
                    >
                      <i class="fas fa-plus"></i>
                    </div>
                    <p class="text-right">
                      total: {{ productos.cantidad * productos.precio }}
                    </p>
                  </div>
                </div>

              </div>
            </div>
            <div class="card-footer d-flex">
              <button
              :disabled="btnEnviar "
                class="btn color-primary mr-2 text-white c-hand w-50"
                @click="enviar"
              >
                <i class="fas fa-check"></i>
              </button>
              <div
                @click="deleteStore"
                class="btn color-danger mr-2 text-white c-hand w-50"
              >
                <i class="fas fa-trash"></i>
              </div>
            </div>
          </div>
        </b-collapse>
      </div>
      <b-row>
        <b-col md="3" class="mt-2" sm="2">
          <b-form-input
            class="w-75"
            id="filter-input"
            v-model="busqueda"
            type="search"
            placeholder="busqueda"
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <div v-for="(producto, index) in productos" v-bind:key="index">
          <b-col
            sm="12"
            md="12"
            v-if="
              producto.nombre.toLowerCase().indexOf(busqueda.toLowerCase()) !==
                -1 ||
                producto.codigo
                  .toLowerCase()
                  .indexOf(busqueda.toLowerCase()) !== -1
            "
          >
            <div class="card  mt-2"  :class="{'dark-secondary': dark}">
              <div class="card-header" :class="{'color-secondary': dark}">
                {{ producto.nombre }}
              </div>
              <div class="card-body">
                disponible: {{ producto.cantidad }}
                
                <div class="text-center">
                  <b-button
                    class="btn color-primary mr-2 text-white c-hand w-50"
                    @click="saveStore(index ,producto._id)"
                    :disabled="
                      producto.venta > producto.cantidad ||
                        producto.cantidad === 0
                    "
                  >
                    +
                  </b-button>
                  <div>
                    {{ producto.alerta }}
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </div>
      </b-row>
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
      btnEnviar: false,
      fields: ["producto", "opciones"],
      visible: false,
      busqueda: "",
      validated: 1,

      store: [],
      productos: [
        {
          id: 1,
          nombre: "mayonesa",
          precio: 3,
          cantidad: 7,
          alerta: null,
          stock: 3,
        },
        {
          id: 2,
          nombre: "harina",
          precio: 1.4,
          cantidad: 8,
          alerta: null,
          stock: 3,
        },
        { id: 3, nombre: "arroz", precio: 1.2, cantidad: 4 },
        {
          id: 4,
          nombre: "mantequilla",
          precio: 2.5,
          cantidad: 5,
          alerta: null,
          stock: 3,
        },
        {
          id: 5,
          nombre: "esto",
          precio: 1,
          cantidad: 6,
          alerta: null,
          stock: 3,
        },
        {
          id: 6,
          nombre: "aquello",
          precio: 1,
          cantidad: 9,
          alerta: null,
          stock: 0,
        },
        {
          id: 7,
          nombre: "asd",
          precio: 3,
          cantidad: 0,
          alerta: null,
          stock: 3,
        },
      ],
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
  },
  methods: {
    
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
      const heredado = this;
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
                heredado.deleteFromStore(index);
              }
            }
          });
        }
      });
    },
    deleteFromStore(index) {
      console.log(index);
      this.store.splice(index, 1);
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
      const { data } = await axios.get(`${this.server}/productos/get`);
      this.productos = data;
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
      this.btnEnviar = true
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
      this.btnEnviar = false

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

    saveStore(index, id) {
      this.productos.map(element=>{
if (element._id === id) {
  element.venta= 1
        if (element.venta == 0 || element.venta == null) return;
        if (element.cantidad - element.stock < element.venta) {
          element.alerta = "limite de stock";
        } else {
          element.cantidad = element.cantidad - element.venta;
          let data = this.store.map(function(item) {
            if (item.id_producto === element._id) {
              const ventaActual = parseFloat(element.venta);
              const ventaAnterior = parseFloat(item.cantidad);
              //element.cantidad = element.cantidad - ventaActual
              item.cantidad = ventaActual + ventaAnterior;
              return true;
            } else {
              return false;
            }
          });
          if (data.indexOf(true) !== -1) {
            
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
      })
      
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
.border-white{
  border:0.2px solid white;
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
