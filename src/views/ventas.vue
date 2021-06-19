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
                total {{ (total_mayor) | formatNumber }}
              </p>
              <p class="text-right w-50">total {{ total | formatNumber }}</p>
            </div>
            <b-form-checkbox v-model="is_dolar">pago en dolares</b-form-checkbox>
            {{is_dolar}}
            <div class="card-body list-scroll scrollbar-light-blue">
             <div>
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
              <div>
                <hr>
                venta al mayor
                <div v-for="(productos, index) in store_mayor" :key="index">
                <div>
                  {{ productos.producto }}
                  <div>{{ productos.precio }} $ c/u</div>
                  <div>
                    <div
                      class="btn red-alert text-white"
                      v-on:click="
                        resCantidad_mayor(index, `${productos.id_producto}`)
                      "
                    >
                      <i class="fas fa-minus"></i>
                    </div>
                    {{ productos.cantidad }}
                    <div
                      class="btn yellow-danger text-white"
                      v-on:click="
                        sumCantidad_mayor(index, `${productos.id_producto}`)
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
            </div>
            <div class="card-footer d-flex">
              <button
                :disabled="btnEnviar"
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

      <div class="row row-cols-1 row-cols-md-3">
        <div v-for="(producto, index) in productos" v-bind:key="index">
          <div
            class="mr-2 ml-2"
            v-if="
              producto.nombre.toLowerCase().indexOf(busqueda.toLowerCase()) !==
                -1 ||
                producto.codigo
                  .toLowerCase()
                  .indexOf(busqueda.toLowerCase()) !== -1
            "
          >
            <div
              class="card  mt-2"
              style="width:100%"
              :class="{ 'dark-secondary': dark }"
            >
              <div class="card-body d-flex">
                <div class="w-50">
                  <div>
                    {{ producto.nombre }}
                  </div>
                  disponible: {{ producto.cantidad }}
                </div>
                <div class=" w-50 text-right">
                  {{producto.venta}}
                  <b-button
                    style="border-radius: 0.6rem;
    
    padding: 2%;
    margin: 0;"
                    class="d-flex boton-cuadrado w-100 color-primary mr-2 text-white c-hand w-50"
                    @click="saveStore(`${1}`, producto._id)"
                    :disabled="
                      producto.venta > producto.cantidad ||
                        producto.cantidad === 0
                    "
                  >
                    agregar<i class=" ml-2 material-icons">add_shopping_cart</i>
                  </b-button>
                  <b-button
                    style="border-radius: 0.6rem;
    
    padding: 2%;
    margin: 0;"
                    class="d-flex boton-cuadrado w-100 color-primary mr-2 text-white c-hand w-50"
                    @click="saveStore(producto.cantidad_mayor, producto._id)"
                    :disabled="
                      producto.venta > producto.cantidad 
                    "
                  >
                    agregar mayor<i class=" ml-2 material-icons">add_shopping_cart</i>
                  </b-button>
                  <div>
                    {{ producto.alerta }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  return numeral(value).format("0,0.00"); // displaying other groupings/separators is possible, look at the docs
});
export default {
  components: {
    Err,
  },
  created() {
    this.getProductos();
    this.dolar();
  },
  name: "Links",
  data() {
    return {
      is_dolar: false,
      perdida_prestamo: false,
      nota: '',
      btnEnviar: false,
      fields: ["producto", "opciones"],
      visible: false,
      busqueda: "",
      validated: 1,

      store: [],
      store_mayor: [],
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
      "infoDolar",
    ]),
    total() {

      this.store.map(item =>{
        if (item.aumento === true) {
          const valor = this.infoDolar.promedio * 10 / 100
         
        item.dolar = parseFloat(this.infoDolar.promedio + valor)
        }
        else{item.dolar= this.infoDolar.promedio}
      })
        
       if (this.is_dolar === true) {
          return this.store.reduce(
        (sum, item) =>sum + parseFloat(item.cantidad * item.precio * item.dolar ),0);
       }
       else{
          return this.store.reduce(
        (sum, item) =>sum + parseFloat(item.cantidad * item.precio),0);
       }
    
      },
    total_mayor() {

      this.store_mayor.map(item =>{
        if (item.aumento === true) {
          const valor = this.infoDolar.promedio * 10 / 100
         
        item.dolar = parseFloat(this.infoDolar.promedio + valor)
        }
        else{item.dolar= this.infoDolar.promedio}
      })
        
       if (this.is_dolar === true) {
          return this.store_mayor.reduce(
        (sum, item) =>sum + parseFloat(item.cantidad * item.precio * item.dolar ),0);
       }
       else{
          return this.store_mayor.reduce(
        (sum, item) =>sum + parseFloat(item.cantidad * item.precio),0);
       }
    
      }
      
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
    sumCantidad_mayor(index, id) {
      this.store_mayor.map((element) => {
        if (element.id_producto == id) {
          this.productos.map(function(item) {
            if (item._id === element.id_producto) {
              if (item.cantidad <= 0) {
                return;
              }

              if (item.cantidad - item.cantidad_mayor < 0) {
                return
              }
              item.cantidad = item.cantidad - item.cantidad_mayor;

              element.cantidad++;
            }
          });
        }
      });
    },
    resCantidad_mayor(index, id) {
      const heredado = this;
      this.store_mayor.map((element) => {
        if (element.id_producto === id) {
          this.productos.map(function(item) {
            if (item._id === element.id_producto) {
              if (element.cantidad == 0) {
                return;
              }
              item.cantidad = item.cantidad+ item.cantidad_mayor;
              element.cantidad--;
              if (element.cantidad == 0) {
                heredado.deleteFromStore_mayor(index);
              }
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
    deleteFromStore_mayor(index) {
      console.log(index);
      this.store_mayor.splice(index, 1);
    },
    ...mapMutations([
      "getStorage",
      "getLogin",
      "cambiarLogin",
      "saveToken",
      "getUser",
      "getInfoEmpresa",
      "dolar",
    ]),
    async getProductos() {
      const { data } = await axios.get(`${this.server}/productos/get/activate`);
      this.productos = data;
    },
    deleteStore() {
      this.store = [];
      this.store_mayor = [];
      this.getProductos();
    },
    obtener() {
      return this.store.reduce(
        (sum, item) => sum + parseFloat(item.cantidad * item.salida),
        0
      );
    },
    async enviar() {
      if (this.store.length == 0) {
        return;
      }
      this.btnEnviar = true;
      const value = this.obtener();
      console.log(value);
      const valores = {
        dolar: this.infoDolar.promedio,
        total: value,
        nota: this.nota,
        perdida_prestamo: this.prestamo,
        is_dolar: this.is_Dolar,
        productos: this.store,
        por_mayor: this.store_mayor,
      };
      const { data } = await axios.post(`${this.server}/ventas`, valores, {
        headers: { xtoken: this.token },
      });

      this.alert(data);
      this.btnEnviar = false;

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

    saveStore(numero, id) {
      const number = parseFloat(numero)
      this.productos.map((element) => {
        if (number === 1) {
           if (element._id === id) {
          element.venta = 1
          if (element.venta == 0 || element.venta == null) return;
          if (element.cantidad - element.stock < element.venta) {
            element.alerta = "limite de stock"
          } 
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
              aumento: element.aumento,
              cantidad: element.venta,
              dolar: null,
              precio: element.salida,
              id_producto: element._id,
            });

            element.venta = 1;
            if (element.cantidad - element.stock < element.venta) {
            element.alerta = "limite de stock"; return
          } element.alert = null
          }
        }
        if (number > 1) {
           if (element._id === id) {
          console.log(number);
          if (number == 0 || number == null)  return;
          if (element.cantidad - element.stock < number) {
            return  element.alerta = "limite de stock"
          } 
          if (element.cantidad < number) {
            return
          }
            element.venta = number
            element.cantidad = element.cantidad - element.venta;
            let data = this.store_mayor.map(function(item) {
              if (item.id_producto === element._id) {
                const ventaAnterior = parseFloat(item.cantidad);
                //element.cantidad = element.cantidad - ventaActual
                item.cantidad = 1 + ventaAnterior;
                return true;
              } else {
                return false;
              }
            });
            if (data.indexOf(true) !== -1) {
              element.alerta = null;

              return;
            }
            this.store_mayor.push({
              producto: element.nombre,
              aumento: element.aumento,
              cantidad: 1,
              dolar: null,
              precio: element.salida_mayor,
              id_producto: element._id,
            });
            element.venta = 1;
            if (element.cantidad - element.stock < element.venta) {
            element.alerta = "limite de stock"; return
          } element.alert = null
          }
        }
      
        }
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
.btn[data-v-0668eac1] {
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
