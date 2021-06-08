<template>
 <div class="mdl-layout__header-row d-flex">
                 <Popper
    trigger="hover"
    
    :options="{
      placement: 'top-end',
      modifiers: { offset: { offset: '0,10px' } }
    }">
    <div class="popper">
                {{ infoDolar.promedio | formatNumber }} -
                {{ infoDolar.fecha}}
    
    </div>
 
    <div slot="reference">
              <span class="mdl-layout-title">{{infoEmpresa.nombre}}</span>
     
    </div>
  </Popper>
              <div class="mdl-layout-spacer"></div>

              <div v-if="!dark"
               style="position: absolute; right: 10px;width:50px; height:50px"
                :class="{'text-white' : !dark}"
                class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"
               
                @click="cambiar" 
              >
               <span class="material-icons">
dark_mode
</span>
              </div>
              <div v-if="dark"
               style="position: absolute; right: 10px;width:50px; height:50px"
                :class="{' text-white' : dark, 'bg-white text-dark': !dark}"
                class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"
               
                @click="cambiar" 
              >
               <span class="material-icons">
light_mode
</span>
              </div>
            </div>
</template>

<script>
import numeral from 'numeral'
import Vue from 'vue'
Vue.filter("formatNumber", function (value) {
  return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
});
import{mapState, mapMutations} from 'vuex'
import Popper from 'vue-popperjs'
export default {
  components:{Popper},
  name: 'Nav',
 data() {
   return {
    
   }
 },computed:{
    ...mapState(['dark', 'infoEmpresa','infoDolar'])
  },
  methods: {
    ...mapMutations(['cambiar'])
  },
}




</script>
