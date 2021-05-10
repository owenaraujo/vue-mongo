<template>
    <div class="d-flex mt-3">
        <div class="w-75 mr-5">

            precio dolar : <b-form-input type="number" class="w-25" v-model="precioDolar"></b-form-input>
       <div v-for="(item, key) in productos" v-bind:key="item.key" >
           {{key +1}}-{{item.nombre}} bs: {{item.precio * precioDolar| formatNumber}} dolares: {{item.precio}}
       </div>
        </div>
       <div class="w-25">
           <b-form-input class="mb-2" placeholder="nombre" v-model="nuevoproducto.nombre"></b-form-input>
       <b-form-input class="mb-2" placeholder="precio" v-model="nuevoproducto.precio"></b-form-input>
       <div @click="guardarNuevo" class="btn btn-block btn-danger">guardar</div>
       </div>
    </div>
</template>

<script>
import numeral from 'numeral'
import Vue from 'vue'
  Vue.filter("formatNumber", function (value) {
    return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
  });
export default {
    methods:{
        guardarNuevo(){
            this.productos.push(this.nuevoproducto)
            this.nuevoproducto = [
            

            ]
        }
    },
    data(){ return{
        nuevoproducto:
            {nombre: null,precio: null }
        ,
precioDolar: 2204000, 
        productos:[
            {nombre: 'mayonesa',precio: 2 },
            {nombre: 'mayonesa',precio: 3 },
            {nombre: 'mayonesa',precio: 4 },
            {nombre: 'mayonesa',precio: 5 },
            {nombre: 'mayonesa',precio: 7 },
            ]
    }}

    
}
</script>