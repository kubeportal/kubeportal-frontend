<template>
  <v-card>
    <v-tabs :vertical="desktop" class="sidenav" dark active-class="activeTab">
      <v-img
        src="../assets/mountain.jpeg"
        gradient="to bottom left, rgba(18,18,18, .8), rgba(18, 18, 18, .3)"
        width="25em"
        height="100vh"
        :class="!desktop ? 'mobileImage' : ''"
      >
      <div v-if="desktop">
        <div class="logo text-center" @click="go_to_dashboard">
          <v-row align="center" >
            <v-col sm="2">
              <v-icon class="icon">mdi-view-dashboard-variant</v-icon>
            </v-col>
            <v-col sm="10">
              <div class="title"><small>{{cluster_name}}</small></div>
            </v-col>
          </v-row>
        </div>
        <v-container>
          <hr />
        </v-container>
      </div>
       <v-tab v-for="tab in filtered_tabs" :key="tab.name">
          <v-row align="center">
            <v-col sm="2">
              <v-icon class="icon">{{ tab.icon }}</v-icon>
            </v-col>
            <v-col sm="10" v-if="desktop">
              <div class="title">
                <small>{{ tab.name }}</small>
              </div>
            </v-col>
          </v-row>
        </v-tab>
      </v-img>
        <v-tab-item
          v-for="(tab, index) in filtered_tabs"
          :key="tab.name + index"
          class="items"
        >
          <Node :tab="tab" />
        </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import { showAt } from 'vue-breakpoints'
import Node from './Node'

export default {
  name: 'Dashboard',
  components: { showAt, Node },
  props: ['tabs'],
  data () {
    return {
      width: window.outerWidth
    }
  },
  methods: {
    go_to_dashboard () {
      if (this.$route.name !== 'Kubeportal') {
        this.$router.push({ name: 'Kubeportal' })
      }
    },
    request_cluster_name () {
      this.$store.dispatch('infos/request_cluster_name')
    },
    resize (e) {
      this.width = e.currentTarget.outerWidth
    }
  },
  computed: {
    filtered_tabs () {
      return this.tabs.filter((tab) => tab.has_access)
    },
    cluster_name () {
      return this.$store.getters['infos/get_cluster_name']
    },
    desktop () {
      return this.width > 900
    }
  },
  created () {
    this.$vuetify.theme.dark = this.$store.getters['users/get_dark_mode']
    if (this.cluster_name === '') this.request_cluster_name()
    window.addEventListener('resize', this.resize)
  },
  destroyed () {
    window.removeEventListener('resize', this.resize)
  }
}
</script>

<style scoped lang="scss">
.icon {
  color: floralwhite;
}
.sidenav {
  height: 100vh;
  position: absolute;
  left: -2px;
  top: -2px;
  min-width: 100px;
}
.mobileImage {
  // display: none;
  // opacity: 0;
  img {
    opacity: 0 !important;
  }
}

.activeTab {
  background-color: green;
}

.logo {
  padding-top: 0.25em;
  width: 85%;
  margin: 0 auto;
  cursor: pointer;
}

hr {
  background-color: rgba(240, 240, 240, 0.5);
}

.title {
  color: floralwhite;
  text-align: center;
}
.items {
  margin-left: 1vw;
  max-height: 100vh;
}
</style>
