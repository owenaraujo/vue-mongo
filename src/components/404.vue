<template>
<div v-if="usuario.roles.name ==='usuario'">
    <div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="error-template">
                <h1>
                    Oops!</h1>
                <h2>
                    403 no tienes los permisos para acceder</h2>
                <div class="error-details">
                    lo sentimos, no puedes acceder a esta pagina
                </div>
                <div class="error-actions">
                    <router-link to="/" class="btn btn-primary btn-lg"><span class="glyphicon glyphicon-home"></span>
                        ir al inicio</router-link>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
import{mapState, mapMutations} from 'vuex'

export default {
  name: 'Err',
 data() {
   return {
    
   }
 },computed:{
    ...mapState(['usuario','dark', 'infoEmpresa'])
  },
  methods: {
    ...mapMutations(['cambiar'])
  },
}




</script>
<style scoped>
.error-template {padding: 40px 15px;text-align: center;}
.error-actions {margin-top:15px;margin-bottom:15px;}
.error-actions .btn { margin-right:10px; }
</style>
