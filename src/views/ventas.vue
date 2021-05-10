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
                @keyup="verifyStock(producto)"
              >
              </b-form-input>
              <div class="text-center">
                <b-button
                  class="btn color-primary mr-2 text-white c-hand w-50"
                  @click="saveStore(producto)"
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
            <p>{{ productos.producto }} cantidad: {{ productos.cantidad }}</p>
            <p class="text-right">total: {{ productos.total }}</p>
            <hr />
          </div>
        </div>
        <div class="card-footer d-flex">
          <div class="btn color-primary mr-2 text-white c-hand w-50">
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
import { mapState } from "vuex";

export default {
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
          stock: 3,
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
    ...mapState(["dark"]),
    total() {
      return this.store.reduce((sum, item) => sum + item.total, 0);
    },
  },
  methods: {
    deleteStore() {
      this.store = [];
    },
    verifyStock(index) {
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
        if (index.venta == 0|| index.venta==null) return
      if (index.cantidad - index.stock < index.venta) {
        index.alerta = "limite de stock disponible";

      } else {
        
        index.cantidad = index.cantidad - index.venta;
        let total = index.precio * index.venta;
        this.store.push({
          producto: index.nombre,
          cantidad: index.venta,
          precio: index.precio,
          total: total,
        });
        index.venta = null;
        index.alerta = null;
      }
    },
  },
};
</script>
