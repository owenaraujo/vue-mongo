import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({

state:{
    infoDolar :{
        promedio : null,
        fecha:  null
    },
    server :process.env.VUE_APP_SERVER,
    server2 :'http://localhost:3000',
    dark : false,
    modalShow: true,
    token: 1234 ,
    id: 1234 ,
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
        timeOut: 2000
         
        
      },
},
mutations:{
   
    async editDolar(state) {
        let json = { dolar: state.infoEmpresa.dolar };
         await axios.put(
          `${state.server}/system/empresa/dolar/${state.infoEmpresa._id}`,
          json,
          { headers: { xtoken: this.token } }
        )
      },
   
    async dolar(state) {
        state.dolar ={}
        try {
            //let {data}   = await axios.get('https://s3.amazonaws.com/dolartoday/data.json') 
      
      state.infoDolar.promedio = state.infoEmpresa.dolar
      state.infoDolar.fecha = 'dolar sin conexion'
     
      if (state.infoDolar.promedio === state.infoEmpresa.dolar ) {
     
      return 
      }

      let json = { dolar: state.infoDolar.promedio };
      await axios.put(
       `${state.server}/system/empresa/dolar/${state.infoEmpresa._id}`,
       json,
       { headers: { xtoken: state.token } }
     )
     state.infoEmpresa.dolar= state.infoDolar.promedio

        } catch (error) {
          
      state.infoDolar.promedio = state.infoEmpresa.dolar
      state.infoDolar.fecha = 'dolar sin conexion'
        }
      },
    async getInfoEmpresa(state) {
        const {data} = await axios.get(`${state.server}/system/empresa`);
        state.infoEmpresa = data;
      },
   async getUser(state){
        let id = localStorage.id
        let token = localStorage.token
        state.token= token
        const {data} = await axios.get(`${state.server}/auth/getUser/${id}`)
        
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
         state.modalShow = true
         localStorage.modalShow = state.modalShow
         return 
        }
     if(data.value === false){
         state.modalShow = true
         localStorage.modalShow = state.modalShow
         return 
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
     return true
}
},
actions:{}
})