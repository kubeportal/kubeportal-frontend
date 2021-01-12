<template>
  <v-card>
    <v-tabs vertical class="sidenav" dark active-class="activeTab">
      <v-img
        src="../assets/mountain.jpeg"
        gradient="to bottom left, rgba(18,18,18, .8), rgba(18, 18, 18, .3)"
        width="25vh"
        height="100vh"
      >
        <div>
          <v-row class="logo">
            <v-col sm="2">
              <v-icon class="icon" >mdi-view-dashboard-variant</v-icon>
            </v-col>
            <v-col sm="10">
              <div class="title"><small>Data Science Cluster</small></div>
            </v-col>
          </v-row>
        </div>
        <v-container>
          <hr />
        </v-container>
        <v-tab v-for="tab in tabs" :key="tab.name">
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

      <v-tab-item v-for="(tab, index) in tabs" :key="tab + index" class="items">
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
  methods: {
    openAdmin () {
      window.open('https://cluster.datexis.com/admin/', '_blank')
    }
  },
  computed: {
    userIsAdmin () {
      let current_user = this.$store.getters['users/get_user_details']
      console.log('current user')
      console.log(current_user)
      return current_user['admin']
    },
    has_access () {
      return true
    }
  },
  created () {
    this.$vuetify.theme.dark = this.$store.getters['users/get_dark_mode']
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
  padding-top: .25em;
  width: 75%;
  margin: 0 auto;
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
  //margin: 6.5vh;
}
</style>
