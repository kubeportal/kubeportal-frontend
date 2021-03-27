<template>
  <v-img content-class="vertical-img" src="../assets/mountain.jpg">
    <v-tabs vertical class="sidenav" background-color="rgba(0, 0, 0, .5)" dark active-class="activeTab">
      <div class="logo text-center" @click="go_to_dashboard">
        <div class="d-inline-flex flex-wrap justify-center mt-4">
          <v-icon class="vertical-icon mr-4">mdi-view-dashboard-variant</v-icon>
          <div class="title">
            <small>{{ cluster_branding }}</small>
          </div>
        </div>
      </div>
      <v-container>
        <hr />
      </v-container>
      <v-tab v-for="tab in filtered_tabs" :key="tab.name">
        <v-row>
          <v-col sm="4">
            <v-icon class="vertical-icon">{{ tab.icon }}</v-icon>
          </v-col>
          <v-col sm="6">
            <div class="title">
              <small>{{ tab.name }}</small>
            </div>
          </v-col>
        </v-row>
      </v-tab>
      <v-tab-item
        v-for="(tab, index) in filtered_tabs"
        :key="tab.name + index"
        class="items"
      >
        <Node :tab="tab" />
      </v-tab-item>
    </v-tabs>
  </v-img>
  <!-- <v-card>
    <hide-at :breakpoints="{small: 600, medium: 1000, large: 1700}"  breakpoint="small">
      <v-tabs vertical class="sidenav" dark active-class="activeTab">
        <v-img class="vertical-img" src="../assets/mountain.jpg"
               gradient="to bottom left, rgba(18,18,18, .8), rgba(18, 18, 18, .3)">
          <div class="logo text-center" @click="go_to_dashboard">
            <div class="d-inline-flex flex-wrap justify-center mt-4">
              <v-icon class="vertical-icon mr-4">mdi-view-dashboard-variant</v-icon>
              <div class="title"><small>{{cluster_branding}}</small></div>
            </div>
          </div>
          <v-container>
            <hr />
          </v-container>
          <v-tab v-for="tab in filtered_tabs" :key="tab.name">
            <v-row>
              <v-col sm="4">
                <v-icon class="vertical-icon">{{ tab.icon }}</v-icon>
              </v-col>
              <v-col sm="6">
                <div class="title">
                  <small>{{ tab.name }}</small>
                </div>
              </v-col>
            </v-row>
          </v-tab>
        </v-img>
          <v-tab-item v-for="(tab, index) in filtered_tabs" :key="tab.name + index" class="items">
            <Node :tab="tab" />
          </v-tab-item>
      </v-tabs>
    </hide-at>

    <show-at :breakpoints="{small: 600, medium: 1000, large: 1600}"  breakpoint="small">
        <v-tabs grow centered icons-and-text show-arrows dark active-class="activeTab">
          <v-img src="../assets/mountain.jpg" gradient="to bottom left, rgba(18,18,18, .8), rgba(18, 18, 18, .3)">
            <v-row>
              <v-tab @click="go_to_dashboard">
                <v-icon large class="mt-4 top-icon">mdi-view-dashboard-variant</v-icon>
              </v-tab>
              <v-tab v-for="tab in filtered_tabs" :key="tab.name" class="d-inline-block">
                <v-icon large class="mt-4 top-icon">{{ tab.icon }}</v-icon>
              </v-tab>
            </v-row>
          </v-img>
          <v-tab-item v-for="(tab, index) in filtered_tabs" :key="tab.name + index">
            <Node :tab="tab" />
          </v-tab-item>
        </v-tabs>
    </show-at>
  </v-card> -->
</template>

<script>
import { showAt, hideAt } from 'vue-breakpoints'
import Node from './Node'

export default {
  name: 'Dashboard',
  components: { showAt, hideAt, Node },
  methods: {
    go_to_dashboard () {
      if (this.$route.name !== 'Kubeportal') {
        this.$router.push({ name: 'Kubeportal' })
      }
    }
  },
  props: ['tabs'],
  computed: {
    filtered_tabs () {
      return this.tabs.filter((tab) => tab.has_access)
    },
    cluster_branding () {
      return this.$store.getters['api/get_branding']
    }
  },
  created () {
    this.$vuetify.theme.dark = this.$store.getters['users/get_dark_mode']
  }
}
</script>

<style scoped lang="scss">
.vertical-icon {
  color: floralwhite;
}
.top-icon {
  width: 14px;
}

.sidenav {
  height: 100vh;
  left: -2px;
  top: -2px;
}

.activeTab {
  background: linear-gradient(to top right, #b3b3b3, #4d4d4d);
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
  max-height: 100vh;
  background: rgba(0, 0, 0, .5) !important;
  // opacity: 0.6;
}
.vertical-img {
  width: 100vw;
  height: 100vh;
}
.theme--light {
  background: rgba(0, 0, 0, .5) !important;
}
</style>
