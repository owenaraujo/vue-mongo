<template>
    <div>
        <div>
            <b-row>
                <b-col>
                    <div class="d-flex">
                        <div v-if="usuario.roles.name !== 'usuario'"
                            class="text-center boton-cuadrado quinto c-hand text-white mt-3" data-toggle="modal"
                            data-target="#modalAdd">
                            <i class="fas fa-plus"></i> <br />
                            nuevo
                        </div>

                        <div class="text-center boton-cuadrado color-primary c-hand text-white mt-3 ml-3"
                            data-toggle="modal" data-target="#modalSearch">
                            {{ count }}
                            <br />
                            <div v-if="vidrios.length === 1">producto</div>
                            <div v-if="vidrios.length > 1">vidrios</div>
                            <div v-if="vidrios.length === 0">vidrios</div>
                        </div>

                        <div v-if="usuario.roles.name !== 'usuario'"
                            class="text-center boton-cuadrado red c-hand text-white mt-3 ml-3" data-toggle="modal"
                            data-target="#modalEdit">
                            <i class="fas fa-plus"></i> <br />
                            nuevo
                        </div>
                        <div class="d-flex align-items-center">
                            <b-form-input class="w-75 ml-3" id="filter-input" v-model="filter" type="search"
                                placeholder="Buscar"></b-form-input>
                        </div>
                        <div class="d-flex align-items-center">
                            <b-form-input v-on:keyup="searchmodelo"  class="w-75 ml-3" id="filter-input" v-model="modelosearch" type="search"
                                placeholder="Buscar modelo nuevo"></b-form-input>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="12">

                    <div class="text-center row">
                        <div class="col">
                            <b-table :busy="isBusy" class=" card mt-3 list-scroll scrollbar-light-blue"
                                :sticky-header="true" striped hover :filter="filter" :items="vidrios" :fields="fields">
                                <template #table-busy>
                                    <div class="text-center text-primary my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong> Cargando...</strong>
                                    </div>

                                </template>


                                <template #cell(funciones)="row" v-if="usuario.roles.name === 'administrador'">
                                    <!-- aqui se abre modal new model  -->
                                    <div @click="addidcategoria(row.item._id)"
                                        class="btn color-primary text-white mt-0 c-hand" size="sm" data-toggle="modal"
                                        data-target="#modalEdit">

                                        <span class="material-icons d-flex">
                                            add
                                        </span>
                                    </div>
                                    <div @click="searchmodels(row.item._id)" class="btn red text-white mt-0 c-hand"
                                        size="sm">

                                        <span class="material-icons d-flex">
                                            search
                                        </span>
                                    </div>


                                    <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
                                </template>
                            </b-table>
                        </div>
                        <div class="col">

                            <div class="col">
                                <b-table :busy="isBusy" class=" card mt-3 list-scroll scrollbar-light-blue"
                                    :sticky-header="true" striped hover :filter="filter" :items="listmodelos"
                                    :fields="fields2">
                                    <template #table-busy>
                                        <div class="text-center text-primary my-2">
                                            <b-spinner class="align-middle">

                                            </b-spinner>
                                            <strong> Cargando...</strong>
                                        </div>

                                    </template>

                                    <template #cell()="row" v-if="usuario.roles.name === 'administrador'">
                                        <!-- aqui se abre modal new model  -->
                                        <div @click="addidcategoria(row.item._id)"
                                           >
 {{ row.item.marca }} {{ row.item.modelo }} 
 <p v-show="row.item.marca == 'xiaomi'"> ({{ row.item.codename }})</p>
 <p v-show="row.item.marca != 'xiaomi'"> ({{ row.item.sku }})</p>
 <p v-show="row.item.categoria.color"> vidrio categoria : ({{ row.item.categoria.color }})</p>
                                           
                                        </div>
                                        


                                        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
                                    </template>

                                </b-table>


                            </div>
                        </div>

                    </div>
                </b-col>
            </b-row>

            <!-- pdf -->



            <!-- pdf -->
            <!-- modales  -->
            <!-- modal add  -->
            <div class="modal fade " id="modalAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-md" role="document">

                    <div class="modal-content" :class="{ 'dark-secondary': dark }">
                        <div class="modal-header text-center" :class="{ 'color-secondary text-white': dark }">
                            <!-- //modal agregar vidrio // -->
                            <h4 class="modal-title w-100 font-weight-bold">Agregar</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" :class="{ 'dark-secondary': dark }">
                            <form id="formAdd" class="mx-3">
                                <div class="form-group mb-2">




                                    <div class="">


                                        <b-form-input required type="text" v-model="nuevoVidrio.color"
                                            placeholder="color" class="form-control mt-3 ml-2" autocomplete="off" />
                                    </div>

                                </div>
                            </form>
                        </div>
                        <div class="modal-footer d-flex justify-content-center">
                            <div @click="sendvidrio()" id="btnPost"
                                class="text-white mt-3 btn btn-block color-primary mr-4 ml-4 c-hand">
                                guardar
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- modal add  -->

            <!-- modal edit -->

            <div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-md" role="document">
                    <div class="modal-content" :class="{ 'dark-secondary ': dark }">
                        <div class="modal-header text-center" :class="{ 'color-secondary text-white': dark }">
                            <h4 class="modal-title w-100 font-weight-bold">Editar</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body mx-3">
                            <form id="newmodel
               " class="mx-3 row">

                                <b-form-select class="mt-3" v-model="newmodel.marca" :options="modelos"></b-form-select>


                                <b-form-input required type="text" id="modelo" v-model="newmodel.modelo"
                                    placeholder="modelo" class="mt-3" autocomplete="off" />
                                <b-form-input required type="text" id="codename" style="text-transform: uppercase"
                                    v-model="newmodel.codename" placeholder="codename" class="form-control mt-3"
                                    autocomplete="off" />

                                <b-form-input required type="text" v-model="newmodel.sku" placeholder="sku"
                                    class="form-control  mt-3 col " autocomplete="off" id="cantidad" />


                                <b-form-input required type="text" v-model="newmodel.sku_2" placeholder="sku 2"
                                    class="form-control mt-3 ml-2 col" autocomplete="off" />



                            </form>
                            {{ newmodel }}
                        </div>
                        <div class="modal-footer d-flex justify-content-center mr-4 ml-4">
                            <b-button :disabled="botonEditar" @click="sendnewmodel(newmodel.categoria)"
                                class="text-white mt-3 btn btn-block color-primary mr-4 ml-4 c-hand">
                                guardar
                            </b-button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- modal edit -->

            <!-- modales  -->
        </div>
    </div>
</template>

<script>
import moment from "moment";
Vue.filter("formatDate", function (value) {
    if (value) {
        return moment(String(value)).format("DD/MM/YYYY hh:mm a");
    }
});
import numeral from "numeral";
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import Vue from "vue";
Vue.filter("formatNumber", function (value) {
    return numeral(value).format("0,0.00"); // displaying other groupings/separators is possible, look at the docs
});

export default {
    components: {

    },
    beforeMount() {
        this.dolar();
    },
    mounted() {
        this.tiempo();



        this.getVidrios();
    },
    methods: {
        ...mapMutations(["dolar"]),
        tiempo() {
            setInterval(() => {
                this.fecha = new Date();
            }, 1000);
        },
        pdfCompleto() {
            const lista = this.$refs.lista;
            var ventana = window.open("", "PRINT", "height=400,width=600");
            ventana.document.write(
                '<link rel="stylesheet" href="/md/bootstrap.min.css" />'
            );

            ventana.document.write(lista.innerHTML);
            ventana.focus();
            setTimeout(function () {
                ventana.print();
            }, 2000);
        },
        //solicitudes inmediatas

async searchmodelo(){
    
    const { data } = await axios.get(`${this.server}/modelos/search?name=${this.modelosearch}`);
    this.listmodelos= data
    
},
        async getVidrios() {
            const { data } = await axios.get(`${this.server}/vidrios/get`);


            if (data.length > 0) {
                this.vidrios = data;
                this.isBusy = false;
                this.getProductosCount();
            } else {
                this.isBusy = false;
            }
            this.vidrios = data;
            this.isBusy = false;
            this.getProductosCount();
        },
        async getProductosCount() {
            const { data } = await axios.get(`${this.server}/vidrios/get/count`);
            this.count = data;
        },
        //solicitudes inmediatas

        async sendnewmodel(id) {
            if (this.newmodel.categoria == null) {
                return
            }
            console.log(id);
            if (this.newmodel.marca != "xiaomi") this.newmodel.codename = null
            if (this.newmodel.marca == "xiaomi") this.newmodel.sku = null


            const { data } = await axios.put(
                `${this.server}/modelos/${id}`,
                this.newmodel,
                { headers: { xtoken: this.token } }
            );
            this.alert(data);
            if (data.value == true) return;
            if (data.value == false) return;

        },


        async addidcategoria(id) {


            this.newmodel.categoria = id

            // const { data } = await axios.delete(`${this.server}/vidrios/${id}`, {
            //   headers: { xtoken: this.token },
            // });
            // this.alert(data);
            // if (data.value == false) {
            //   return;
            // }
            // this.getVidrios();
        },
        async searchmodels(id) {
            const { data } = await axios.get(
                `${this.server}/modelos/${id}`,
                { headers: { xtoken: this.token } }
            );
            this.listmodelos = data

        },


        async sendvidrio() {

            const { data } = await axios.post(
                `${this.server}/vidrios/post/`,
                this.nuevoVidrio,
                { headers: { xtoken: this.token } }
            );
            this.alert(data);
            if (data.value == null) return;
            if (data.value == false) return;
            this.nuevoVidrio.color = null;

            this.getVidrios();
        },
        alert(data) {
            if (data.value === true) {
                this.$toastr.success(data.message, "vidrios", this.options);
            }
            if (data.value === false) {
                this.$toastr.error(data.message, "vidrios", this.options);
            }
            if (data.value === null) {
                this.$toastr.warning(data.message, "vidrios", this.options);
            }
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
            "dark",
            "options",
            "server",
            "infoEmpresa",
            "token",
            "usuario",
            "infoDolar",
        ]),
    },

    data() {
        return {
            botonEditar: false,
            cantidad: "",
            count: null,
            fecha: null,
            isBusy: true,
            proveedores: [],
            filter: "",
            modelosearch:"",
            filterOn: [],
            reportesField: [
                { key: "numero", label: "#" },
                { key: "nombre", label: "Nombre", sortable: true },
                "cantidad",
                { key: "entrada", label: "entrada", sortable: true },
                "salida",
                "ganancias",
            ],

            fields: [
                {
                    key: "color",
                    sortable: true,
                },

                "funciones",
            ],
            fields2: [
                {
                    key: "modelos compatibles",
                    sortable: true,
                },


            ],

            inputEditVisibilyty: true,
            inputSearchVisibilyty: true,
            formVisibilityEDit: false,
            infoVisibilityDelete: false,
            infoVisibilityEdit: false,
            inputDeleteVisibilyty: true,

            newmodel: {
                marca: null,
                modelo: null,
                codename: null,
                sku: null,
                sku_2: null,

                categoria: null

            },
            modeloEncontrado:{
                marca: null,
                modelo: null,
                codename: null,
                sku: null,
                sku_2: null,

                categoria: null
            },

            listmodelos: [

            ],
            modelos: [
                "xiaomi", "samsung", "motorola", "tecno", "infinix", "lenovo", "oppo", "realme", "vivo", "oneplus", "apple", "google"
            ],

            unidadesMedida: [],

            nuevoVidrio: {
                color: null

            },
            vidrios: [],
        };
    },
};
</script>