<template>
  <div>
    <div class="download" @click="download">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="white" type="button" icon v-bind="attrs" v-on="on">
            <v-icon color="white"> mdi-download </v-icon>
          </v-btn>
        </template>
        <span>download {{new Date().toISOString()}}-{{this.identifier}}-logs.txt</span>
      </v-tooltip>
    </div>
  <div @scroll="is_in_view" class="logs" ref="logs">
    <div ref="scrollblock" class="scrollblock"> </div>
    <div
      v-for="(log, index) in logs"
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
</template>

<script>
export default {
  name: 'Logs',
  props: ['logs', 'identifier'],
  methods: {
    download () {
      const combinded_logs = this.logs.map(log => log.log).join('\n')
      const element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(combinded_logs))
      element.setAttribute('download', `${new Date().toISOString()}-${this.identifier}-logs.txt`)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    },
    is_in_view () {
      const rect = this.$refs.scrollblock.getBoundingClientRect()
      const elemTop = rect.top
      const elemBottom = rect.bottom
      const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight)
      console.log(isVisible, 'plsssssssssssss')
    }
  },
  mounted () {
    this.$refs.logs.scrollTop = this.$refs.logs.scrollHeight
  }
}
</script>

<style scoped>
.scrollblock {
  background-color: red;
  width: 50px;
  height: 50px;
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
</style>
