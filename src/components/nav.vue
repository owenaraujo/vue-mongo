<template>
 <div class="mdl-layout__header-row d-flex">
              <span class="mdl-layout-title">S.A.R.M.</span>
              <div class="mdl-layout-spacer"></div>
              
              <button
               style="position: absolute; right: 5px;"
                :class="{'bg-dark text-white' : !dark, 'bg-white text-dark': dark}"
                class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"
               
                @click="cambiar" 
              >
                <i class="material-icons"> brightness_4 </i>
              </button>
            </div>
</template>

<script>
import{mapState, mapMutations} from 'vuex'

export default {
  name: 'Nav',
 data() {
   return {
    
   }
 },computed:{
    ...mapState(['dark'])
  },
  methods: {
    ...mapMutations(['cambiar'])
  },
}




</script>
