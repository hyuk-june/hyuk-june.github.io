<template>
  <div id="frame">

    <header class="header">
      <h1 class="title"><i class="fa fa-map-marker-alt"></i> 부산광역시 남구 용호로 232번길</h1>
    </header>
    
    <div class="frame-content">
      <transition name="slide"
        v-on:before-enter="beforeEnter"
        v-on:after-enter="afterEnter">
        <router-view/>
      </transition>
    </div>
    
    <footer class="footer">
      <ul>
        <li><router-link to="/frame/main"><i class="fa fa-home"></i><span>홈</span></router-link></li>
        <li><router-link to="/frame/near"><i class="fa fa-compass"></i><span>내근처</span></router-link></li>
        <li><router-link to="/frame/area"><i class="fa fa-map-marker-alt"></i><span>지역</span></router-link></li>
        <li><router-link to="/frame/coupon"><i class="fa fa-ticket-alt"></i><span>쿠폰</span></router-link></li>
        <li><router-link to="/frame/mypage"><i class="fa fa-user"></i><span>내정보</span></router-link></li>
      </ul>
    </footer>
  </div>
</template>

<script>
import Vue from 'vue'
import { Carousel } from 'bootstrap-vue/es/components'
import Main from '@/components/Main'

Vue.use(Carousel)

export default {
  name: 'Frame',
  methods:{
    beforeEnter: function(){
      console.log('전환시작');
    },
    afterEnter: function(){
      console.log('전환완료');
    }
  },
  components: { Main },
  template: '<Main/>'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.frame-content {
  position: absolute;
  top:44px;
  bottom:50px;
  width:100%;
  overflow-y:auto;
  overflow-x:hidden;
}

.content {
  position: absolute;
  top:44px;
  bottom:0;
  width:100%;
  overflow-y:auto;
  overflow-x:hidden;
}

.slide-enter-active, .slide-leave-active{
  transition: transform .5s;
}

.slide-leave-to{
  transform: translateX(-200%)
}

.slide-leave-active{
  position: absolute;
  top:0;
}

.slide-leave{
  position: absolute;
  top:0;
}

.slide-enter{
  position: relative;
  transform: translateX(200%)
}

@keyframes slide-out {
  0% {transform: translateX(0); }
  100% {transform: translateX(-200%); }
} 
@keyframes slide-in {
  0% {transform: translateX(-200%); }
  100% {transform: translateX(0); }
}

</style>
