<template>
  <v-card>
    <v-tabs vertical class="sidenav" dark active-class="activeTab">
      <v-img
        src="../assets/mountain.jpeg"
        gradient="to bottom left, rgba(18,18,18, .8), rgba(18, 18, 18, .3)"
        width="25vh"
        height="100vh"
      >
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
        <v-tab v-for="tab in filtered_tabs" :key="tab.name">
          <v-row>
            <v-col sm="2">
              <v-icon class="icon">{{ tab.icon }}</v-icon>
            </v-col>
            <v-col sm="10">
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
  methods: {
    go_to_dashboard () {
      if (this.$route.name !== 'Kubeportal') {
        this.$router.push({ name: 'Kubeportal' })
      }
    },
    request_cluster_name () {
      this.$store.dispatch('infos/request_cluster_name')
    }
  },
  components: { showAt, Node },
  props: ['tabs'],
  computed: {
    filtered_tabs () {
      return this.tabs.filter((tab) => tab.has_access)
    },
    cluster_name () {
      return this.$store.getters['infos/get_cluster_name']
    }
  },
  created () {
    this.$vuetify.theme.dark = this.$store.getters['users/get_dark_mode']
    if (this.cluster_name === '') this.request_cluster_name()
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
