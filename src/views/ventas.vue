<template>
  <div class="">
    <div class="d-flex">
      <div class="w-75 row">
        <div
          class="col-4"
          v-for="(producto, index) in productos"
          v-bind:key="index"
        >
          <div class="card  mt-2">
            <div class="card-header">
              {{ producto.nombre }}
            </div>
            <div class="card-body">
              disponible: {{ producto.cantidad }}
              <b-form-input
                type="number"
                v-model="producto.venta"
                @keyup="verifyStock(index)"
              >
              </b-form-input>
              <div class="text-center">
                <b-button
                  class="btn color-primary mr-2 text-white c-hand w-50"
                  @click="saveStore(index)"
                  :disabled="
                    producto.venta > producto.cantidad ||
                      producto.cantidad === 0
                  "
                >
                  +
                </b-button>
                {{ producto.alerta }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-25 ml-2 card ">
        <div class="card-header">
          <p class="text-right">total {{ total }}</p>
        </div>
        <div class="card-body list-scroll scrollbar-light-blue">
          <div v-for="(productos, index) in store" v-bind:key="index">
            <div>{{ productos.producto }} cantidad:
               <div class="btn" @click="productos.cantidad++">+</div> 
               {{ productos.cantidad }} 
               <div class="btn" @click="productos.cantidad--">-</div>
               </div>
            <p class="text-right">total: {{ productos.cantidad*productos.precio }}</p>
            <hr />
          </div>
        </div>
        <div class="card-footer d-flex">
          <div class="btn color-primary mr-2 text-white c-hand w-50" @click="enviar">
            <i class="fas fa-check"></i>
          </div>
          <div
            @click="deleteStore"
            class="btn color-danger mr-2 text-white c-hand w-50"
          >
            <i class="fas fa-trash"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
export default {
  created() {
    this.getProductos();
  },
  name: "Links",
  data() {
    return {
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
    ...mapState(["dark", "server", "infoEmpresa", "usuario",'token']),
    total() {
      return this.store.reduce((sum, item) => sum + parseFloat(item.cantidad*item.precio), 0);
    },
  },
  methods: {
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
      this.getProductos()
    }, obtener() {
      return this.store.reduce((sum, item) => sum + parseFloat(item.cantidad*item.precio), 0);
    },
    async enviar(){
     
    const value = this.obtener()
    const valores = {
      dolar: this.infoEmpresa.dolar ,
      total: value,
      productos: this.store
      }
      console.log(this.token);
      const {data}= await axios.post(`${this.server}/ventas/token`, valores,{headers:{xtoken: this.token}})
      return console.log(data);
      //this.alert(data);

      
      
    },
    verifyStock(index) {
    for (let i = 0; i < this.productos.length; i++) {
       const element = this.productos[index];
       let param =element.cantidad - element.stock;
      if (element.cantidad <element.venta) {
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
      console.log(index);
      for (let i = 0; i < this.productos.length; i++) {
        const element = this.productos[index];
        console.log(element);
        if (element.venta == 0 || element.venta == null) return;
      if (element.cantidad - element.stock < element.venta) {
        element.alerta = "limite de stock disponible";
      } else {
        element.cantidad = element.cantidad - element.venta;
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
  },
};
</script>
