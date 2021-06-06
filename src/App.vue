<template>
  <div class="parent">
    <!-- calculadora -->
<div
        style="position: fixed; z-index: 1500; right: 15px; bottom: 10px"
        @click="visible = !visible"
        class="c-hand"
        :class="visible ? null : 'collapsed'"
        :aria-expanded="visible ? 'true' : 'false'"
        aria-controls="collapse-4"
      >
        <div style="border-radius: 15rem;width: 38.75px; height: 33.5px" class="btn color-primary text-white">
         <i class="fas fa-calculator"></i>
        </div>
        <div class=" iconC red-alert text-white"></div>
      </div>
      <div
        style="position: fixed; z-index: 1000; right: 10px ; bottom: 65px; width: 300px"
      >
        <b-collapse id="collapse-4" v-model="visible" class="mt-2">
          <div id="app" style="z-index: 1500">
      <div class="container " style="position:relative">
        <div class="calculator list-scroll scrollbar-light-blue">
          <div class="answer scrollbar-light-blue" style="overflow-x:auto" >{{ answer }}</div>
          <div class="display">{{ logList + current }}</div>
          <div @click="clear" id="clear" class="btn operator">C</div>
          <div @click="sign" id="sign" class="btn operator">+/-</div>
          <div @click="percent" id="percent" class="btn operator">
            %
          </div>
          <div @click="divide" id="divide" class="btn operator">
            /
          </div>
          <div @click="append('7')" id="n7" class="btn">7</div>
          <div @click="append('8')" id="n8" class="btn">8</div>
          <div @click="append('9')" id="n9" class="btn">9</div>
          <div @click="times" id="times" class="btn operator">*</div>
          <div @click="append('4')" id="n4" class="btn">4</div>
          <div @click="append('5')" id="n5" class="btn">5</div>
          <div @click="append('6')" id="n6" class="btn">6</div>
          <div @click="minus" id="minus" class="btn operator">-</div>
          <div @click="append('1')" id="n1" class="btn">1</div>
          <div @click="append('2')" id="n2" class="btn">2</div>
          <div @click="append('3')" id="n3" class="btn">3</div>
          <div @click="plus" id="plus" class="btn operator">+</div>
          <div @click="append('0')" id="n0" class="zero">0</div>
          <div @click="dot" id="dot" class="btn">.</div>
          <div @click="equal" id="equal" class="btn operator">=</div>
        </div>
      </div>
    </div>
    
        </b-collapse>
      </div>


    
    <!-- calculadora -->

    <div id="scroll" class="child scroll">
      <div id="load" class="loading-box d-none">
        <div class="loading-animate">
          <div class="body"></div>
        </div>
      </div>

      <div
        class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header"
      >
        <header
          class="demo-header mdl-layout__header"
          :class="{ 'dark-secondary text-white': dark, 'tercero': !dark }"
        >
          <Nav></Nav>
        </header>
        <Links />

        <main
          class="mdl-layout__content"
          :class="{
            'dark-primary text-white': dark,
            'bg-white': !dark,
          }"
        >
          <div>
           
           
          </div>
          <b-container fluid='true' class="mx-3">
            <router-view></router-view>
           <div>
    <!-- Button trigger modal -->

<div :class="{'modal-backdrop fade show': modalShow, 'dark-primary': !dark}"></div>
<!-- Modal -->
<div :class="{ 'show' : modalShow}" class="modal text-center" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">inicio de sesion</h5>
        
      </div>
      <div class="modal-body">
        <div>
          <b-form-input placeholder="nombre de usuario" class="mt-3"  v-model="user.username"></b-form-input>
          <b-form-input placeholder="contraseña" class="mt-3" v-model="user.password"></b-form-input>
        </div>
      </div>
      <div class="modal-footer">
        <button @click="sigin()" :disabled="btnSignin === true" type="button" class="btn color-primary c-hand text-white" data-dismiss="modal">iniciar</button>
      </div>
    </div>
  </div>
</div>
  </div>
          </b-container>
        </main>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState,mapMutations } from "vuex";
import Nav from "./components/nav.vue";
import Links from "./components/links.vue";
import anime from 'animejs'
import axios from 'axios'

export default {
  name: "App",
  data() {
    return {
        logList: "",
        visible: false,
        btnSignin: false,
            current: "",
            answer: "",
            operatorClicked: true,
      user:{username: null, password: null}
    
    };
  },
  computed: {
    ...mapState(["dark", 'options', 'modalShow', 'server',"token", 'id']),
  },
  components: {
    Nav,
    Links,
  },
  created() {
    this.getStorage()
    this.getLogin()
    this.getInfoEmpresa()
  },
   methods: {

     //calculadora
      append(number) {
            if (this.operatorClicked) {
              this.current = "";
              this.operatorClicked = false;
            }
            this.animateNumber(`n${number}`);
            this.current = `${this.current}${number}`;
          },
          addtoLog(operator) {
            if (this.operatorClicked == false) {
              this.logList += `${this.current} ${operator} `;
              this.current = "";
              this.operatorClicked = true;
            }
          },
          animateNumber(number) {
            let tl = anime.timeline({
              targets: `#${number}`,
              duration: 250,
              easing: "easeInOutCubic"
            });
            tl.add({ backgroundColor: "#c1e3ff" });
            tl.add({ backgroundColor: "#f4faff" });
          },
          animateOperator(operator) {
            let tl = anime.timeline({
              targets: `#${operator}`,
              duration: 250,
              easing: "easeInOutCubic"
            });
            tl.add({ backgroundColor: "#a6daff" });
            tl.add({ backgroundColor: "#d9efff" });
          },
          clear() {
            this.animateOperator("clear");
            this.current = "";
            this.answer = "";
            this.logList = "";
            this.operatorClicked = false;
          },
          sign() {
            this.animateOperator("sign");
            if (this.current != "") {
              this.current =
                this.current.charAt(0) === "-"
                  ? this.current.slice(1)
                  : `-${this.current}`;
            }
          },
          percent() {
            this.animateOperator("percent");
            if (this.current != "") {
              this.current = `${parseFloat(this.current) / 100}`;
            }
          },
          dot() {
            this.animateNumber("dot");
            if (this.current.indexOf(".") === -1) {
              this.append(".");
            }
          },
          divide() {
            this.animateOperator("divide");
            this.addtoLog("/");
          },
          times() {
            this.animateOperator("times");
            this.addtoLog("*");
          },
          minus() {
            this.animateOperator("minus");
            this.addtoLog("-");
          },
          plus() {
            this.animateOperator("plus");
            this.addtoLog("+");
          },
          equal() {
            this.animateOperator("equal");
            if (this.operatorClicked == false) {
              this.answer = eval(this.logList + this.current);
            } else {
              this.answer = "ERROR!!";
            }
          },
     
     
     //calculadora
      alert(data) {
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
     async sigin(){
       const {data} = await axios.post(`${this.server}/auth/signin`, this.user)
      this.btnSignin = true
       this.alert(data)
       if(data.value == null ) {
this.user.username = null
      this.btnSignin = false

return
       }
       if(data.value == false )  {
this.user.password = null
      this.btnSignin = false

return
       }
      
       localStorage.token = data.token
      
       localStorage.id = data.id
       sessionStorage.usuario= true
      
       
       this.getUser()
      this.user.username= null
      this.user.password= null
       this.cambiarLogin()
      this.btnSignin = false

       },
    ...mapMutations(['getStorage', 'getLogin', 'cambiarLogin', 'saveToken', 'getUser','getInfoEmpresa'])
  },
}
</script>
<style scoped>
.modal-backdrop.show {
    opacity: 1;
}


 

.calculator {
  display: grid;
  grid-template-rows: repeat(7, minmax(60px, auto));
  grid-gap: 5px;
  padding: 5px;
  font-weight: 300;
  font-size: 18px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 3px 80px -30px rgba(13, 81, 134, 1);
}

.btn,
.zero {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #484848;
  background-color: #f4faff;
  border-radius: 5px;
}

.display,
.answer {
  grid-column: 1 / 5;
  display: flex;
  align-items: center;
}

.display {
  color: #a3a3a3;
  border-bottom: 1px solid #e1e1e1;
  margin-bottom: 15px;
  overflow: hidden;
  text-overflow: clip;
}

.answer {
  font-weight: 500;
  color: #146080;
  font-size: 40px;
  height: 85px;
}

.zero {
  grid-column: 1 / 3;
}

.operator {
  background-color: #d9efff;
  color: #3fa9fc;
}

.card {
  max-height: 90vh;
}
</style>
<style >
  .toast-sucess{
    background: rgb(128, 188, 0);
  }
  .toast-error{

    background: rgb(243, 79, 29);

  }
  .toast-warning{

    background: rgb(255, 187, 0);

  }
</style>