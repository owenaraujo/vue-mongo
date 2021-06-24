import Vue from "vue"
import Router from 'vue-router'
    
Vue.use(Router)

export default new Router({
mode: 'history',
base: process.env.BASE_URL,
routes:[

{path:'/informacion',
name:'index',
component: ()=> import('@/views/index.vue')
},
{path:'/',
name:'principal',
component: ()=> import('@/views/productos.vue')
},
{path:'/ventas',
name:'ventas',
component: ()=> import('@/views/ventas.vue')
},
{path:'/proveedores',
name:'proveedores',
component: ()=> import('@/views/proveedores.vue')
},
{path:'/categorias',
name:'categorias',
component: ()=> import('@/views/categorias.vue')
},
{path:'/reportes',
name:'reportes',
component: ()=> import('@/views/reportes.vue')
},
{path:'/pedidos',
name:'pedidos',
component: ()=> import('@/views/pedidos.vue')
},
{path:'/favoritos',
name:'favoritos',
component: ()=> import('@/views/favoritos.vue')
},

{path:'/productos',
name:'productos',
component: ()=> import('@/views/productos.vue')
},
{path:'/configuracion',
name:'configuracion',
component: ()=> import('@/views/configuracion.vue')
},
]

})
