<template>
  <div>
  <div>
    <v-row justify="space-between">
      <v-col cols="2">
        <v-btn
          icon
          @click="show_menu = !show_menu"
          x-large
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-col>
      <v-col class="download" @click="download" cols="1">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn type="button" icon v-bind="attrs" x-large v-on="on">
              <v-icon> mdi-download </v-icon>
            </v-btn>
          </template>
          <span>download {{new Date().toISOString()}}-{{this.pod.name}}-logs.txt</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <div v-if="show_menu" class="menu">
      <v-row no-gutters>
        <v-col cols=8>
          <v-text-field
            v-model="search_logs"
            label="Search"
            append-outer-icon="mdi-close"
            @click:append-outer="search_logs = ''"
          ></v-text-field>
        </v-col>
        <v-col cols=2 v-if="search_logs !== ''">
          <v-btn
            icon
            @click="next_log('previous')"
            x-large
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn
            icon
            @click="next_log('next')"
            x-large
          >
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
        <v-col cols=2 v-if="search_logs !== ''">
          <div class="occurances">
            Found {{ search_indexe.length }} occurances.
            <span v-if="search_indexe.length > 0">
              Currently: {{ current_idx + 1 }}
            </span>
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="1">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn type="button" icon v-bind="attrs" x-large v-on="on" @click="jump('up')">
                <v-icon> mdi-chevron-double-up </v-icon>
              </v-btn>
            </template>
            <span>Jump to top</span>
          </v-tooltip>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn type="button" icon v-bind="attrs" x-large v-on="on" @click="jump('down')">
                <v-icon> mdi-chevron-double-down </v-icon>
              </v-btn>
            </template>
            <span>Jump to bottom</span>
          </v-tooltip>
        </v-col>
        <v-col cols="10">
          <v-switch
            v-model="live_refresh"
            label="live refresh"
          ></v-switch>
        </v-col>
      </v-row>
    </div>
  </div>
  <div @scroll="is_in_view" class="logs" ref="logs">

    <div ref="scrollblock" :class="is_loading ? 'invisible' : 'scrollblock'"> </div>
    <div class="endoflogs" v-if="end_of_logs" > ... </div>
    <RequestSpinner v-if="is_loading && !end_of_logs" />
    <div class="logfiller">
      <div v-for="(log, index) in logs"
        :key="index"
        :id="'log_entry_' + index"
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
      is_loading: false,
      end_of_logs: false,
      search_logs: '',
      search_indexe: [],
      current_idx: 0,
      prev_idx: undefined,
      show_menu: false,
      live_refresh: true,
      interval_id: undefined
    }
  },
  watch: {
    live_refresh (value) {
      console.log(value)
      if (value) {
        this.set_refresh()
      } else {
        clearInterval(this.interval_id)
      }
    },
    search_logs (value) {
      if (this.prev_idx) {
        let elem = document.getElementById('log_entry_' + this.prev_idx)
        elem.classList.remove('focused')
      }
      if (value !== '') {
        this.current_idx = 0
        let indexe = []
        let idx = 0
        for (const entry of this.logs) {
          if (entry.log.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
            indexe.push(idx)
          }
          idx++
        }
        console.log(indexe)
        this.search_indexe = indexe
      }
    },
    logs (new_value, old_value) {
      console.log(new_value.length, old_value ? old_value.length : 0)
      if (old_value && new_value.length === old_value.length) {
        this.end_of_logs = true
      } else {
        /*this.$refs.logs.scrollTop = 2200*/
        this.is_loading = false
      }
    }
  },
  computed: {
    logs () {
      return this.$store.getters['pods/get_pod_logs'][this.pod.name]
    }
  },
  methods: {
    set_refresh () {
      let self = this
      this.interval_id = setInterval(async function () {
        await self.$store.dispatch('pods/request_live_logs', {
          namespace: self.namespace,
          pod_name: self.pod.name,
          logs_url: self.pod.logs_url
        })
      }, 3000)
    },
    jump (direction) {
      if (direction === 'up') {
        this.$refs.logs.scrollTop = 2200
      } else {
        this.$refs.logs.scrollTop = this.$refs.logs.scrollHeight
      }
    },
    next_log (direction) {
      if (this.prev_idx) {
        let elem = document.getElementById('log_entry_' + this.prev_idx)
        elem.classList.remove('focused')
      }

      if (direction === 'next' && this.current_idx < this.search_indexe.length - 1) {
        this.current_idx = this.current_idx + 1
      } else if (direction === 'next') {
        this.current_idx = 0
      } else if (direction === 'previous' && this.current_idx > 0) {
        this.current_idx = this.current_idx - 1
      } else {
        this.current_idx = this.search_indexe.length - 1
      }

      console.log('in NEXT LOG', this.current_idx, direction)
      let idx = this.search_indexe[this.current_idx]
      let elem = document.getElementById('log_entry_' + idx)
      let elem_rect = elem.getBoundingClientRect()
      elem.classList.add('focused')
      console.log(elem_rect.top, this.$refs.logs.scrollTop)
      this.$refs.logs.scrollTop = this.$refs.logs.scrollTop + elem_rect.top - 300

      this.prev_idx = idx
    },
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
  opacity: 0.85;
}
.download {
  color: white;
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
.endoflogs {
  display: block;
  text-align: center;
  color: white;
}
.focused {
  background-color: rgba(255, 255, 255, .3);
  padding-bottom: 5px;
  padding-top: 5px;
}
.occurances {
  text-align: center;
  padding-top: 10%;
}
.menu {
  background-color: white;
  padding: 0 1em;
  position: absolute;
  z-index: 1000;
  width: 100%;
}
</style>
