<template>
  <div class="parent">
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
          <div >
            <div class="text-center NotificationIndex"  style="position: absolute ; z-index:1080" >
              <div v-for="alert of alerts" v-bind:key="alert.id">
<div   role="alert" class="alert" :class="{'alert_success': alert.value , 'alert_danger': !alert.value, 'alert_warning': alert.value === null}" >
    <div class="alert--icon">
    <i class="fas fa-bell"></i>
    </div>
    <div class="alert--content text-center">
    {{alert.message}}
    </div>
    <div data-dismiss="alert"
    aria-label="Close" class="alert--close">
    <i class="far fa-times-circle"></i>
    </div>
    </div>

              </div>



            </div>
          </div>
          <b-container fluid='true' class="mx-3">
            <router-view></router-view>
           
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


export default {
  name: "App",
  data() {
    return {
    
    };
  },
  computed: {
    ...mapState(["dark", 'alerts']),
  },
  components: {
    Nav,
    Links,
  },
  created() {
    this.getStorage()
  },
   methods: {
    ...mapMutations(['getStorage'])
  },
}
</script>
