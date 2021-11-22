<template>
  <div>
    <div class="download" @click="download">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="white" type="button" icon v-bind="attrs" v-on="on">
            <v-icon color="white"> mdi-download </v-icon>
          </v-btn>
        </template>
        <span>download {{new Date().toISOString()}}-{{this.pod.name}}-logs.txt</span>
      </v-tooltip>
    </div>
  <div @scroll="is_in_view" class="logs" ref="logs">

    <div ref="scrollblock" :class="is_loading ? 'invisible' : 'scrollblock'"> </div>
    <!--div ref="scrollblock" class="scrollblock" v-if="!is_loading"> </div-->
    <RequestSpinner v-if="is_loading" />
    <div class="logfiller">
      <div v-for="(log, index) in logs"
        :key="index"
      >
        <p v-if="log.stream == 'stderr'" class="stderr">
          {{ log.log }}
        </p>
        <p v-else class="stdout">
          {{ log.log }}
        </p>
      </div>
      </div>
    </div>
  </div>
</template>

<script>

import RequestSpinner from '@/components/RequestSpinner'
export default {
  name: 'Logs',
  components: { RequestSpinner },
  props: ['pod', 'namespace'],
  data () {
    return {
      is_loading: false
    }
  },
  watch: {
    logs () {
      console.log('logs changed')
      this.$refs.logs.scrollTop = 2200
      this.is_loading = false
    }
  },
  computed: {
    logs () {
      return this.$store.getters['pods/get_pod_logs'][this.pod.name]
    }
  },
  methods: {
    download () {
      if (!this.logs) return
      const combinded_logs = this.logs.map(log => log.log).join('\n')
      const element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(combinded_logs))
      element.setAttribute('download', `${new Date().toISOString()}-${this.pod.name}-logs.txt`)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    },
    is_in_view () {
      const rect = this.$refs.scrollblock.getBoundingClientRect()
      const elem_top = rect.top
      const elem_bottom = rect.bottom
      const is_visible = (elem_top >= 0) && (elem_bottom <= window.innerHeight)
      console.log('VISIBLE: ', !this.is_loading && is_visible)
      if (!this.is_loading && is_visible) {
        console.log(is_visible, 'is_visible')
        this.request_logs()
      }
    },
    async request_logs () {
      console.log('request')
      this.is_loading = true
      await this.$store.dispatch('pods/request_logs', {
        namespace: this.namespace,
        pod_name: this.pod.name,
        logs_url: this.pod.logs_url
      })
    }
  },
  mounted () {
    this.request_logs()
  }
}
</script>

<style scoped>
.scrollblock {
  opacity: 0;
  background-color: red;
  width: 100%;
  height: 10em;
}
.invisible {
  display: none;
}
.logs {
  width: 100%;
  height: 60vh;
  overflow-y: scroll;
  background-color: black;
  position: relative;
}
.download {
  color: white;
  position: absolute;
  top: 1%;
  right: 1%;
  z-index: 1000;
}
.stderr {
  color: red;
  margin: 0;
}
.stdout {
  color: white;
  margin: 0;
}
.logfiller {
 width: 100%;
 height: 100%;
}
</style>
