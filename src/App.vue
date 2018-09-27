<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Frame from '@/components/Frame'

export default {
  name: 'App',
  components: { Frame },
  template: '<Frame/>',
  created(){
    this.$store.dispatch("loadUser", this); //토큰이 있을경우 사용자정보를 불러온다
    this.$store.dispatch('loadAreas', this);
  }
}
</script>