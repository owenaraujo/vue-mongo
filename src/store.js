import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({

state:{
    server :'http://192.168.0.100:3000',
    dark : false,
    modalShow: true,
    token: 1234 ,
    id: null ,
    infoEmpresa: {},

    usuario:{
username : null,
roles:{name: null}

    },
    options:{
        showMethod : 'slideDown',
        closeButton: true,
        newestOnTop: true,
        closeMethod : 'fadeOut',
        timeOut: 1000
         
        
      },
    alerts: []
},
mutations:{
    async getInfoEmpresa(state) {
        const {data} = await axios.get(`${state.server}/system/empresa`);
        state.infoEmpresa = data;
      },
   async getUser(state){
        let id = localStorage.id
        let token = localStorage.token
        state.token= token
        const {data} = await axios.get(`${state.server}/auth/getUser/${id}`)
        state.usuario= null
        state.usuario = data
    },
    
    async getStorage(state){
        
        if (localStorage.dark) {
            if (localStorage.dark === 'true') {
                state.dark = true
                
                return
            }
if (localStorage.dark === 'false') {
    state.dark = false
                
                
}
           
        } if (localStorage.token) {
        state.token = localStorage.token
    }
    const {data} = await axios.get(`${state.server}/auth/authToken/`,{headers:{xtoken: state.token}})
    
     if(data.value === null){
         state.alerts.push(data)
         state.modalShow = true
         localStorage.modalShow = state.modalShow
         return 
        }
     if(data.value === false){
         state.alerts.push(data)
         state.modalShow = true
         localStorage.modalShow = state.modalShow
         return 
        }
      if (!sessionStorage.usuario) {
        state.alerts.push(data) 
      }  
         if (localStorage.id) {
        state.id = localStorage.id
    }
    
    },
   
    
    
    getLogin(state){
        if (!localStorage.modalShow) {
            state.modalShow = true
        }
        if (localStorage.modalShow) {
            if (localStorage.modalShow === 'true') {
                state.modalShow = true
                
                return
            }
if (localStorage.modalShow === 'false') {
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
    localStorage.modalShow = state.modalShow
     
}
},
actions:{}
})