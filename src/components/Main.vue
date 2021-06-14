<template>
  <div class="content">
    <el-row>
      <el-col :span='24'>
        <el-input
          type='textarea'
          autosize
          placeholder='请输入内容'
          v-model='prompt'
          maxlength='200'
          show-word-limit
        >
        </el-input>

      </el-col>
    </el-row>
    <el-row :gutter='20'>
      <el-col :span='18'>
        <el-collapse v-model='activeNames' @change='handleChange'>
          <el-collapse-item title='请求参数' name='1'>
            <el-card :body-style='{ padding: "0px" }' :span='4'>
            <div style='padding: 14px;'>
              <span>TTS引擎</span>
              <div class='bottom clearfix'>
                <el-dropdown split-button type='primary' @click='handleClick' @command="handleCommand">
                  <span>{{engine}}</span>
                  <el-dropdown-menu slot='dropdown'>
                    <el-dropdown-item command="a">TTS</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            </el-card>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col :span='6'>
        <el-button type='primary' icon='el-icon-search'
          v-on:click="request">请求</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='8'>
        <div class='grid-content bg-purple'></div>
      </el-col>
      <el-col :span='8'>
        <div class='grid-content bg-purple-light'></div>
      </el-col>
      <el-col :span='8'>
        <div class='grid-content bg-purple'></div>
      </el-col>
    </el-row>
    <el-row :gutter='20'>
      <el-col :span='8'>
        TTS输入
        <el-input
          type='textarea'
          autosize
          placeholder=''
          v-model='prompt'
          maxlength='200'
          show-word-limit
        >
        </el-input>
      </el-col>
      <el-col :span='14'>
         <audio ref="audio"
            @pause="onPause"
            @play="onPlay"
            src="" controls="controls"></audio>
        <!-- 音频播放控件 -->
        <div>
          <el-button type="text" @click="startPlayOrPause">Playing:{{audio.playing | transPlayPause}}</el-button>
        </div>
      </el-col>
<!--      <el-col :span='2'>-->
<!--        <el-button type='primary' icon='el-icon-download'-->
<!--          v-on:click="downloadCSVData"></el-button>-->
<!--      </el-col>-->
    </el-row>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import axios from 'axios'

export default {
  name: 'Main',
  comments: {},
  data () {
    console.log('url--info', this.$route.path)
    var engine = this.$route.path.toUpperCase().replace('/', '')
    if (engine.length === 0) {
      engine = 'TTS'
    }
    return {
      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: false
      },
      backends: {
        'TTS': 'http://121.89.245.64:8080/z'
      },
      prompt: 'The campus of Tsinghua University is situated in northwest Beijing on the site of the former imperial gardens of the Qing Dynasty, and surrounded by a number of historical sites.',
      activeNames: ['1'],
      engine: engine,
      number: 1,
      response_l: 200,
      top_p: 0,
      temperature: 0.8,
      tableData: [{
        lines: '张三...'
      },
      {
        lines: '李四\n...'
      }]
    }
  },
  methods: {
    // 控制音频的播放与暂停
    startPlayOrPause () {
      return this.audio.playing ? this.pause() : this.play()
    },
    // 播放音频
    play () {
      this.$refs.audio.play()
    },
    // 暂停音频
    pause () {
      this.$refs.audio.pause()
    },
    // 当音频播放
    onPlay () {
      this.audio.playing = true
    },
    // 当音频暂停
    onPause () {
      this.audio.playing = false
    },
    downloadCSVData () {
      let audio = this.audio.src
      const anchor = document.createElement('a')
      anchor.style.visibility = 'hidden'
      anchor.href = audio
      anchor.target = '_blank'
      anchor.download = this.engine + '.wav'
      anchor.click()
    },
    handleChange (val) {
      this.$message(val)
    },
    handleClick () {
      this.$message('click on item ' + this.engine)
    },
    handleCommand (command) {
      this.$message('click on item ' + command)
      switch (command) {
        case 'a': this.engine = 'TTS'; break
      }
    },
    request () {
      let loadingInstance = Loading.service({'text': '请求中..'})
      let data = {
        'text': this.prompt
      }
      this.$message('click on item ' + JSON.stringify(data))
      axios({
        url: this.backends[this.engine],
        method: 'post',
        responseType: 'arraybuffer',
        data
      }).then(res => {
        const blob = new Blob([res.data], {
          type: 'application/wav'
        })
        const objectUrl = window.URL.createObjectURL(blob)
        // 设置初始化的状态
        console.log(objectUrl)
        this.$refs.audio.src = objectUrl
      })
        .catch(function (error) {
          console.log(error)
          this.tableData = []
        })
        .then(function () {
          loadingInstance.close()
        })
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
