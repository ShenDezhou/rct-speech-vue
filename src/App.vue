<template>
  <div id="app">
    <backtop>
      <router-view />
    </backtop>
  </div>
</template>

<script>
import BackTop from '@/components/BackTop'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    'backtop': BackTop
  }
}
</script>

<style>
.header {
  background-color: #409EFF;
  color: #fff;
  line-height: 60px;
}
.footer {
  background-color: #409EFF;
  color: #fff;
  line-height: 60px;
}
</style>
