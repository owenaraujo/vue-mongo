import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({

state:{
    server :'http://localhost:3000',
    dark : false,
    alerts: []
},
mutations:{
    getStorage(state){
        if (localStorage.dark) {
            if (localStorage.dark === 'true') {
                state.dark = true
                
                return
            }
if (localStorage.dark === 'false') {
    state.dark = false
                
                
}
           
        }
    },


cambiar(state){
    state.dark = !state.dark
    localStorage.dark = state.dark
     
}
},
actions:{}
})