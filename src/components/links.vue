<template>
 <div
            class="demo-drawer mdl-layout__drawer "
            :class="{'dark-complement' : dark, 'cuarto': !dark}"
          >
            <header class="demo-drawer-header">
                 <Popper
    trigger="hover"
    
    :options="{
      placement: 'right',
      modifiers: { offset: { offset: '0,10px' } }
    }">
    <div class="popper">
              hola
    
    </div>
 
    
 
              <div slot="reference" style="border-radius: 5px" @click="salir()" class="demo-avatar mx-auto quinto c-hand btn text-white d-flex align-items-center" :class="{'color-primary' : dark, 'quinto': !dark}">
               <span class="material-icons">
exit_to_app
</span>
                 </div>
                 </Popper> 
                 
              <div class="demo-avatar-dropdown">
                <span class="mx-auto text-white mt-4">
                  {{usuario.username || null}}
                </span>
              </div>
              <div class="demo-avatar-dropdown">
                <div class="mdl-layout-spacer"></div>
                <div class="mdl-layout-spacer"></div>

                <div class="mdl-layout-spacer"></div>
                <div class="mdl-layout-spacer"></div>
                
                <button
                  id="accbtn"
                  class="d-none mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon text-white"
                >
                  <i class="material-icons" role="presentation"
                    >arrow_drop_down</i
                  >
                  <span class="visuallyhidden">Accounts</span>
                </button>
                <ul
                  :class="{'color-primary ': dark}"
                  class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                  for="accbtn"
                >
                 
                  <router-link to="" 
                    
                      class="mdl-menu__item"
                      :class="{'text-white': dark, 'text-dark' : !dark}"

                    >
                      iniciar sesion
                    </router-link
                  >
                  <hr>

                  <router-link to=""
                   
                      class="mdl-menu__item"
                      :class="{'text-white': dark , 'text-dark' : !dark}"

                    >
                      resumen
                    </router-link
                 
                  > <hr>
                  <router-link to="configuracion"
                   
                      class="mdl-menu__item"
                      :class="{'text-white': dark , 'text-dark' : !dark}"

                    >
                      Configuración
                   </router-link
                  >
                  <router-link to=""
                    
                      class="mdl-menu__item"
                      :class="{'text-white': dark , 'text-dark' : !dark}"

                    >
                      social
                    </router-link
                  >

                
                  <router-link to="configuracion"
                   
                      class="mdl-menu__item"
                      :class="{'text-white': dark , 'text-dark' : !dark}"

                    >
                      Configuración de sistema
                    </router-link
                  >

                 
                  <router-link to=""
                   
                      class="mdl-menu__item"
                      :class="{'text-white': dark , 'text-dark' : !dark}"

                    >
                      Salir
                    </router-link
                  >

              
                </ul>
              </div>
            </header>
            
            <nav
              class="demo-navigation mdl-navigation"
              :class="{'dark-secondary' : dark, 'bg-white text-dark': !dark}"
            >
              <router-link v-if="usuario.roles.name !== 'usuario'"
                class="mdl-navigation__link"
                :class="{'text-white' : dark, 'text-dark': !dark}"
                to="ventas"
                ><i
                  class="material-icons"
                  :class="{'text-white' : dark, ' text-dark': !dark}"
                  role="presentation"
                  >local_mall</i
                >Ventas</router-link
              >
              <router-link v-if="usuario.roles.name !== 'usuario'"
                class="mdl-navigation__link"
                :class="{'text-white' : dark, 'text-dark': !dark}"
                to="vidrios"
                ><i
                  class="material-icons"
                  :class="{'text-white' : dark, ' text-dark': !dark}"
                  role="presentation"
                  >local_mall</i
                >vidrios</router-link
              >
              
              <router-link
                class="mdl-navigation__link"
                :class="{'text-white' : dark, 'text-dark': !dark}"
                to="productos"
                ><i
                  class="material-icons"
                  :class="{'text-white' : dark, ' text-dark': !dark}"
                  role="presentation"
                  >inventory_2</i
                >Productos</router-link
              >
              <router-link
                class="mdl-navigation__link"
                :class="{'text-white' : dark, ' text-dark': !dark}"
                to="Proveedores"
              >
                <i
                  class="material-icons"
                  :class="{'text-white' : dark, ' text-dark': !dark}"
                  role="presentation"
                  >local_shipping</i
                >proveedores</router-link
              >
              
              <router-link v-if="usuario.roles.name === 'administrador'"
                class="mdl-navigation__link"
                :class="{'text-white' : dark, ' text-dark': !dark}"
                to="reportes"
              >
                <i
                  class="material-icons"
                  :class="{'text-white' : dark, ' text-dark': !dark}"
                  role="presentation"
                  >report</i
                >Reportes de ventas</router-link
              >
              <router-link v-if="usuario.roles.name === 'administrador'"
                class="mdl-navigation__link"
                :class="{'text-white' : dark, ' text-dark': !dark}"
                to="configuracion"
              >
                <i
                  class="material-icons"
                  :class="{'text-white' : dark, ' text-dark': !dark}"
                  role="presentation"
                  >settings</i
                >configuracion</router-link
              >
              
              
              <div class="d-none">
                <router-link
                class="mdl-navigation__link d-none"
                :class="{'text-white' : dark, ' text-dark': !dark}"
                to="maquinas"
              >
                <i
                  class="text-white material-icons"
                  :class="{'text-white' : dark, 'text-dark': !dark}"
                  role="presentation"
                  >room_preferences</i
                >equipos</router-link
              >
              <router-link
                class="mdl-navigation__link d-none"
                :class="{'text-white' : dark, 'text-dark': !dark}"
                to="mantenimiento"
                ><i
                  class="material-icons "
                  :class="{' text-white ' : dark, '  text-dark': !dark}"
                  role="presentation"
                  >engineering</i
                >Mantenimiento</router-link
              >
              <router-link
                class="mdl-navigation__link"
                :class="{'text-white' : dark, ' text-dark': !dark}"
                to=""
                ><i
                  class="material-icons"
                  :class="{'text-white' : dark, ' text-dark': !dark}"
                  role="presentation"
                  >build</i
                >herramientas</router-link
              >
              
              <router-link
                class="mdl-navigation__link"
                :class="{'text-white' : dark, ' text-dark': !dark}"
                to=""
              >
                <i
                  class="material-icons"
                  :class="{'text-white' : dark, ' text-dark': !dark}"
                  role="presentation"
                  >create</i
                >edicion de equipos</router-link
              >
              
              <router-link
                class="mdl-navigation__link"
                :class="{'text-white' : dark, ' text-dark': !dark}"
                to=""
                ><i
                  class="material-icons"
                  :class="{'text-white' : dark, ' text-dark': !dark}"
                  role="presentation"
                  >shopping_cart</i
                >Purchases</router-link
              >
              </div>

              <div class="mdl-layout-spacer"></div>
              <div class="pb-1" style="position:absolute; bottom:0; width: 100%;">
                <router-link
                class="mb-0"
                :class="{'mdl-navigation__link text-white' : dark, 'mdl-navigation__link text-dark': !dark}"
                to="informacion"
                ><i
                  class="material-icons"
                  :class="{'text-white' : dark, ' text-dark': !dark}"
                  role="presentation"
                  >help_outline</i
                >informacion
              </router-link>
              </div>
            </nav>
          </div>
</template>
<script>
import{mapState, mapMutations} from 'vuex'
import Popper from 'vue-popperjs'
export default {
  components: {Popper},
    name: 'Links',
    data() {
      return {
       
      }
    },
    mounted(){this.getUser()},
    methods:{
    ...mapMutations(['getStorage', 'getLogin', 'cambiarLogin', 'saveToken', 'getUser','cambiar']),

salir(){
  sessionStorage.clear()
  this.alert({value: true, message:'hasta pronto !!!'})
  localStorage.removeItem('token')
  localStorage.removeItem('id')
  this.cambiarLogin()
}, alert(data) {
if (data.value === true) {
      this.$toastr.success(data.message,'inicio', this.options);
  
}      
if (data.value === false) {
      this.$toastr.error(data.message,'inicio', this.options);
  
}      
if (data.value === null) {
      this.$toastr.warning(data.message,'inicio', this.options);
  
}      
    },
    },
    computed:{
    ...mapState(['dark', 'usuario', 'modalShow','options'])
  },
}

</script>
<style>


.text-dark {
  color: #000000 !important;
  text-decoration: none
} .hijo{
   position: absolute;
    top: 0;
    
    left: 0;
    right: 0;
    
    
    margin: auto;
    color: white;
}
.text-dark:hover {
  color: #636262 !important;
  text-decoration: none
}
.text-white:hover {
  /* color: #a0a0a0 !important; */
  text-decoration: none;
  /* background:red ; */
  
}


</style>