import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({

state:{
    server :'http://192.168.0.103:3000',
    dark : false,
    modalShow: true,
    token: null ,
    usuario:{
username : 'owen',
password : '1234'
    },
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
           
        } if (sessionStorage.token) {
        state.token = sessionStorage.token
    }
    },
   
    
    saveToken(datos){
        console.log(datos);
        //this.state.token = token
    },
    getLogin(state){
        if (!sessionStorage.modalShow) {
            state.modalShow = true
        }
        if (sessionStorage.modalShow) {
            if (sessionStorage.modalShow === 'true') {
                state.dark = true
                
                return
            }
if (sessionStorage.modalShow === 'false') {
    state.modalShow = false
                
                
}
           
        }
    },


cambiar(state){
    state.dark = !state.dark
    localStorage.dark = state.dark
     
},
cambiarLogin(state){
    state.modalShow = !state.modalShow
    sessionStorage.modalShow = state.modalShow
     
}
},
actions:{}
})