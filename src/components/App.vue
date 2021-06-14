<template>
    <el-container>
      <el-header class="header">
        <vheader />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <navmenu></navmenu>
        </el-aside>
        <el-main>
          <cmain></cmain>
        </el-main>
      </el-container>
      <el-footer class="footer">RCT_AI</el-footer>
    </el-container>
</template>
<script>
import NavMenu from '@/components/NavMenu'
import Header from '@/components/Header'
import Main from '@/components/Main'

export default {
  name: 'app',
  data () {
    return {

    }
  },
  components: {
    'navmenu': NavMenu,
    'vheader': Header,
    'cmain': Main
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
