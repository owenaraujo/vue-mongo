<template>
  <div>
   
    <div class="card mt-2 p-2" :class="{ 'dark-complement': dark }">
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
            <div
              style="width: 15%"
              class="btn material-icons c-hand color-primary text-white"
              @click="getVentas"
            >
              search
            </div>
            <div
              style="width: 15%"
              class="btn material-icons yellow-danger text-white"
              @click="pdfCompleto()"
            >
              download
            </div>
          </div>
        </b-col>
        <b-col>
          <div class="d-flex align-items-center ">
            <div class="w-50">
              <p class="text-center">ventas en Dolares: {{ totalVentas$ }} $</p>
            </div>
            <div class="w-50">
              <p class="text-center">
                ventas en moneda nacional: {{ totalVentasBs | formatNumber }} bs
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
        <b-tab  @click="deleteInfo" title="ventas en moneda nacional">

 <b-row class="">
            <b-col class="" md="6">
            
              <div>
                <b-table
                  style="max-height: 64.2vh"
                  :shortable="true"
                  :sticky-header="true"
                  :items="ventasBs"
                  :fields="fields"
                  striped
                  responsive="sm"
                  class="card mt-3 list-scroll scrollbar-light-blue"
                >
                  <template #cell(createdAt)="row">
                    {{ row.item.createdAt | formatDate }}
                  </template>

                  <template #cell(acciones)="row">
                    <div
                      size="sm"
                      @click="ventaInfo(row.item)"
                      class="mr-2 btn"
                    >
                    {{row.item }}  información
                    </div>
                  </template>
                </b-table>
              </div>
            </b-col>
            <b-col md="6">
              <div class="card mt-3 text-dark">
                <div
                  class="card-header text-center c-hand"
                  @click="createPdf()"
                >
                  detalles de venta
                </div>
                <div ref="lista">
                  <div class="card-body">
                    
                    <p>total de venta  : {{ infoVenta }}</p>
                    <p>vendidos: {{ totalProductos }} unidades</p>
                  </div>
                  <div
                    class="text-center container-fluid"
                    v-if="productos.length !== 0"
                  >
                    <b-table  head-variant="dark"
                      style="max-height: 30vh"
                      :sticky-header="true"
                      striped
                      hover
                      bordered
                      class="mt-3 list-scroll scrollbar-light-blue"
                      :items="productos"
                      :fields="fieldsInfo"
                    >
                      <template #cell(precio)="row">
                        {{row.item.salida | formatNumber }}
                      </template>
                      <template #cell(total)="row">
                        {{ row.item.cantidad * row.item.salida | formatNumber }}
                      </template>
                    </b-table>
                  </div>
                  <div
                    class="text-center container-fluid"
                    v-if="mayor.length !== 0"
                  >
                    <b-table
                      style="max-height: 30vh"
                      :sticky-header="true"
                       head-variant="dark"
                      striped
                      bordered
                      hover
                      class="mt-3 list-scroll scrollbar-light-blue"
                      :items="mayor"
                      :fields="fieldsInfo"
                    >
                      <template #cell(precio)="row">
                        {{ row.item.salida | formatNumber }}
                      </template>
                      <template #cell(total)="row">
                        {{ row.item.cantidad * row.item.salida | formatNumber}}
                      </template>
                    </b-table>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>

        </b-tab>
         <b-tab  @click="deleteInfo" title="ventas en Dolares" active>
          <b-row class="">
            <b-col class="" md="6">
             
              <div>
                <b-table
                  style="max-height: 64.2vh"
                  :shortable="true"
                  :sticky-header="true"
                  :items="ventasDolar"
                  :fields="fields"
                  striped
                  responsive="sm"
                  class="card mt-3 list-scroll scrollbar-light-blue"
                >
                  <template #cell(createdAt)="row">
                    {{ row.item.createdAt | formatDate }}
                  </template>

                  <template #cell(acciones)="row">
                    <div
                      size="sm"
                      @click="ventaInfo(row.item)"
                      class="mr-2 btn"
                    >
                      información
                    </div>
                  </template>
                </b-table>
              </div>
            </b-col>
            <b-col md="6">
              <div class="card mt-3 text-dark">
                <div
                  class="card-header text-center c-hand"
                  @click="createPdf()"
                >
                  detalles de venta
                </div>
                <div ref="lista">
                  <div class="card-body">
                    <p>
                      cotizacion del dia de venta :
                      {{ infoVenta.dolar | formatNumber }}
                    </p>
                    <p>total de venta : {{ infoVenta.total | formatNumber }}</p>
                    <p>vendidos: {{ totalProductos }} unidades</p>
                  </div>
                  <div
                    class="text-center container-fluid"
                    v-if="productos.length !== 0"
                  >
                    <b-table  head-variant="dark"
                      style="max-height: 30vh"
                      :sticky-header="true"
                      striped
                      hover
                      bordered
                      class="mt-3 list-scroll scrollbar-light-blue"
                      :items="productos"
                      :fields="fieldsInfo"
                    >
                      <template #cell(precio)="row">
                        {{row.item.salida }}
                      </template>
                      <template #cell(total)="row">
                        {{ row.item.cantidad * row.item.salida }}
                      </template>
                    </b-table>
                  </div>
                  <div
                    class="text-center container-fluid"
                    v-if="mayor.length !== 0"
                  >
                    <b-table
                      style="max-height: 30vh"
                      :sticky-header="true"
                       head-variant="dark"
                      striped
                      bordered
                      hover
                      class="mt-3 list-scroll scrollbar-light-blue"
                      :items="mayor"
                      :fields="fieldsInfo"
                    >
                      <template #cell(precio)="row">
                        {{ row.item.salida }}
                      </template>
                      <template #cell(total)="row">
                        {{ row.item.cantidad * row.item.salida }}
                      </template>
                    </b-table>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab  @click="deleteInfo" title="productos vendidos en moneda nacional">
          <div class=" container fluid" ref="reporteCompletoBs">
            <div class="container fluid ">
              <b-table
               :tbody-tr-class="rowClass"
                :sticky-header="true"
                striped
                hover
                bordered
                outlined
                class=" card mt-3 list-scroll scrollbar-light-blue text-center  h-65 "
                :fields="reportesField"
                :items="totalProductosBs"
              >
                <template v-slot:custom-foot>
                  <b-tr class="">
                    <b-th colspan="3"><span class="sr-only"></span></b-th>
                    <b-th variant="warning" colspan="1">
                      {{ inversionBs | formatNumber }}
                      
                    </b-th>
                    <b-th variant="primary" colspan="1">
                      {{ totalVentasBs  | formatNumber}} 
                    </b-th>
                    <b-th variant="primary" colspan="1">
                      {{ gananciasBs | formatNumber }} 
                    </b-th>
                  </b-tr>
                </template>
                <template #cell(numero)="row ">
                  <div :class="{'text-danger' : row.item.mayor}">
                  {{ row.index + 1 }}


                  </div>
                </template>
                <template #cell(nombre)="row ">
                  <div :class="{'text-danger' : row.item.mayo}">
                  {{ row.item.id_producto.nombre }}


                  </div>
                </template>
                
                <template #cell(entrada)="row">
                  {{ row.item.cantidad * row.item.entrada  | formatNumber}} 
                </template>
                <template #cell(salida)="row">
                  {{ row.item.cantidad * row.item.salida  | formatNumber}} 
                </template>
                <template #cell(ganancias)="row">
                  {{ (row.item.cantidad * row.item.salida) -(row.item.cantidad * row.item.entrada)  | formatNumber}} 
                </template>
              </b-table>
            </div>
          </div>
        </b-tab>
        <b-tab  @click="deleteInfo" title="productos vendidos en Dolares">
          <div class=" container fluid" ref="reporteCompletoDolar">
            <div class="container fluid">
              <b-table
               :tbody-tr-class="rowClass"

                :sticky-header="true"
                striped
                hover
                bordered
                outlined
                class=" card mt-3 list-scroll scrollbar-light-blue text-center h-65 "
                :fields="reportesField"
                :items="totalProductosDolar"
              >
                <template v-slot:custom-foot>
                  <b-tr class="">
                    <b-th colspan="3"><span class="sr-only"></span></b-th>
                    <b-th variant="warning" colspan="1">
                      {{ inversion$ }}
                      
                    </b-th>
                    <b-th variant="primary" colspan="1">
                      {{ totalVentas$ }}
                    </b-th>
                    <b-th variant="primary" colspan="1">
                      {{ganancias$ }} 
                    </b-th>
                  </b-tr>
                </template>
                <template #cell(numero)="row ">
                  <div >
                  {{ row.index + 1 }}


                  </div>
                </template>
               <template #cell(nombre)="row">
                {{row.item.id_producto.nombre}}
               </template>
                 <template #cell(entrada)="row">
                  {{ row.item.cantidad * row.item.entrada  | formatNumber}} 
                </template>
                <template #cell(salida)="row">
                  {{ row.item.cantidad * row.item.salida  | formatNumber}} 
                </template>
                <template #cell(ganancias)="row">
                  {{ (row.item.cantidad * row.item.salida) -(row.item.cantidad * row.item.entrada)  | formatNumber}} 
                </template>
                
              </b-table>
            </div>
          </div>
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
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY hh:mm a");
  }
});
Vue.filter("formatNumber", function(value) {
  return numeral(value).format("0,0.00"); // displaying other groupings/separators is possible, look at the docs
});
export default {
  components: {
    Err,
  },
  async created() {
    this.tiempo();
    this.dolar();
  },
  name: "Links",
  data() {
    return {
      totalProductosDolar: [],
      
      totalProductosBs: [],
      total: [],
      ventasDolar: [],
      ventasBs: [],
      fechaInicio: null,
      fechaFinal: null,
      fecha: null,
      reporte: [],
      infoVenta: [],
      reportesField: [
        { key: "numero", label: "#" },
        { key: "nombre", label: "Nombre" , sortable: true},
        "cantidad",
        { key: "entrada", label: "entrada" , sortable : true},
        "salida",
"ganancias", 
      ],
      fields: [
        { key: "createdAt", label: "creacion", sortable: true },
        "acciones",
      ],
      fieldsInfo: [
        { key: "id_producto.nombre", label: "producto" },
        "cantidad",
        { key: "precio", label: "precio" },
        { key: "total", label: "total" },
      ],
      time: null,
      ventas: [],
      visible: false,
      busqueda: "",
      validated: 1,

      productos: [],
      mayor: [],
    };
  },
  computed: {
    ...mapState([
      "options",
      "infoDolar",
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
      return this.ventasBs.reduce(
        (sum, item) => sum + parseFloat(item.total),
        0
      );
    },
    totalVentas$() {
      return this.ventasDolar.reduce(
        (sum, item) => sum + parseFloat(item.total),
        0
      );
    },
    ganancias$() {
const val =      this.totalProductosDolar.map(item=>{
        const entrada = item.cantidad * item.entrada
        const salida = item.cantidad * item.salida
        return salida- entrada
      })
        
      return val.reduce(
        (sum, item) => sum + parseFloat(item),
        0
      );
    },
    gananciasBs() {
const val =      this.totalProductosBs.map(item=>{
        const entrada = item.cantidad * item.entrada
        const salida = item.cantidad * item.salida
        return salida- entrada
      })
        
      return val.reduce(
        (sum, item) => sum + parseFloat(item),
        0
      );
    },
    inversion$() {
const val =      this.totalProductosDolar.map(item=>{
        const entrada = item.cantidad * item.entrada
        return  entrada
      })
        
      return val.reduce(
        (sum, item) => sum + parseFloat(item),
        0
      );
    },
    inversionBs() {
const val =      this.totalProductosBs.map(item=>{
        const entrada = item.cantidad * item.entrada
        return  entrada
      })
        
      return val.reduce(
        (sum, item) => sum + parseFloat(item),
        0
      );
    },
    totalProductos() {
       const valor =  this.productos.reduce(
        (sum, item) => sum + parseFloat(item.cantidad),
        0
      );
       const valorMayor =  this.mayor.reduce(
        (sum, item) => sum + parseFloat(item.cantidad),
        0
      );
      return valor + valorMayor
    },
    totalPrecio() {
      return this.productos.reduce(
        (sum, item) => sum + parseFloat(item.precio * item.cantidad),
        0
      );
    },
  },
  methods: {
      rowClass(item, type) {
        if (!item || type !== 'row') return
        if (item.status === 'awesome') return 'table-success'},
    tiempo() {
      setInterval(() => {
        this.fecha = new Date();
      }, 1000);
    },
    productosAll() {},
    pdfCompleto() {
      const info = this.$refs.info;
      const lista = this.$refs.reporteCompletoBs;
      const lista2 = this.$refs.reporteCompletoDolar;
      var ventana = window.open("", "PRINT", "height=400,width=600");
      ventana.document.write(
        '<link rel="stylesheet" href="/md/bootstrap.min.css" />'
      );
      ventana.document.write(info.innerHTML);
      ventana.document.write(lista.innerHTML);
      ventana.document.write(lista2.innerHTML);
      ventana.document.close();
      ventana.focus();
      setTimeout(function() {
        ventana.print();
      }, 2000);
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
      setTimeout(function() {
        ventana.print();
      }, 2000);
    },
    ventaInfo(data) {
      this.infoVenta = data;
      this.productos = data.productos;
      this.mayor = data.por_mayor;
    },
    deleteInfo() {
      this.infoVenta = [];
      this.productos = [];
      this.mayor = [];
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
    async getVentas() {
      if (this.fechaInicio == null) return;
      if (this.fechaFinal == null) return;
      const  {data}  = await axios.get(
        `${this.server}/ventas/get/${this.fechaInicio}/${this.fechaFinal}`
      );
      console.log(data);
      
      this.ventasBs = [];
      this.ventasDolar = [];
      this.ventasBs = data;
    
      
      
      
    },
    async getTotal() {
      this.totalProductosBs.splice(0)
      this.totalProductosDolar.splice(0)
     this.ventasDolar.map(item=>{
       item.productos.map(element=>{
         
         this.totalProductosDolar.push(element)
       })
       item.por_mayor.map(element=>{
element.status = 'awesome'         
         this.totalProductosDolar.push(element)
       })
     })
     this.ventasBs.map(item=>{
       item.productos.map(element=>{
         let dolar = null
         if (element.id_producto.aumento === true) {
         dolar = item.dolar * 10 / 100 + item.dolar
         }
         else{ dolar= item.dolar}
         element.entrada = element.entrada * dolar
         element.salida = element.salida * dolar
      this.totalProductosBs.push(element);
       })
       item.por_mayor.map(element=>{
         let dolar = null
         if (element.id_producto.aumento === true) {
         dolar = item.dolar * 10 / 100 + item.dolar
         }
         else{ dolar= item.dolar}
         element.entrada = element.entrada * dolar
         element.salida = element.salida * dolar
element.status = "awesome"
      this.totalProductosBs.push(element);
       })
     })
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
.h-65{
              max-height: 65vh
  
}
.h-80{
              max-height: 80vh
  
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
}
.btn {
  border-radius: 10rem;
}
</style>
