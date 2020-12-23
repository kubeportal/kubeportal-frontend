<template>
  <v-card class="app">
    <!--TopBar class="topBar" title="welocem"/-->
    <v-tabs vertical class="sidenav" dark active-class="activeTab">
      <v-img src="../assets/mountain.jpeg" gradient="to bottom left, rgba(18,18,18, .8), rgba(18, 18, 18, .3)" width="13vw" height="100vh">
        <v-container class="logo">
            <v-icon class="icon">mdi-view-dashboard-variant</v-icon>
            <div class="title"><small>Data Science Cluster</small></div>

        </v-container>
        <v-container>
          <hr/>
        </v-container>
        <v-tab>
          <v-icon class="icon" left>mdi-home-heart</v-icon>
          <show-at breakpoint="mediumAndAbove">
            <div class="title"><small>Welcome</small></div>
          </show-at>
        </v-tab>
        <v-tab v-if="!has_access">
          <v-icon class="icon" left>mdi-key</v-icon>
          <show-at breakpoint="mediumAndAbove">
            <div class="title"><small>Request Access</small></div>
          </show-at>
        </v-tab>
        <v-tab v-if="has_access">
          <!-- package-variant-closed -->
          <v-icon class="icon" left>mdi-package</v-icon>
          <show-at breakpoint="mediumAndAbove">
            <div class="title"><small>Container</small></div>
          </show-at>
        </v-tab>
        <v-tab v-if="has_access">
          <v-icon class="icon" left>mdi-database</v-icon>
          <show-at breakpoint="mediumAndAbove">
            <div class="title"><small>Storage</small></div>
          </show-at>
        </v-tab>
        <v-tab v-if="has_access">
          <v-icon class="icon" left>mdi-lan</v-icon>
          <show-at breakpoint="mediumAndAbove">
            <div class="title"><small>Network</small></div>
          </show-at>
        </v-tab>
        <v-tab v-if="has_access">
          <v-icon class="icon" left>mdi-wizard-hat</v-icon>
          <show-at breakpoint="mediumAndAbove">
            <div class="title"><small>Wizard</small></div>
          </show-at>
        </v-tab>
        <v-tab v-if="userIsAdmin" @click="openAdmin">
          <v-icon class="icon" left>mdi-tools</v-icon>
          <show-at breakpoint="mediumAndAbove">
            <div class="title"><small>Admin</small></div>
          </show-at>
        </v-tab>
      </v-img>
      <!-- Begin Tab Items -->
      <v-tab-item class="items" >
        <v-card flat>
          <v-card-text>
            <Welcome />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item v-if="!has_access" class="items">
        <v-card flat>
          <v-card-text>
            <RequestAccess />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item class="items" v-if="has_access">
        <v-card flat>
          <v-card-text>
            <Container />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item class="items" v-if="has_access">
        <v-card flat>
          <v-card-text>
            <Storage />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item class="items" v-if="has_access">
        <v-card flat>
          <v-card-text>
            <Network />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item class="items" v-if="has_access">
        <v-card flat>
          <v-card-text>
            <Wizard />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import { showAt } from 'vue-breakpoints'
import Welcome from '@/views/Welcome'
import TopBar from '@/components/TopBar'
import Container from '@/views/Container'
import Storage from '@/views/Storage'
import Network from '@/views/Network'
import RequestAccess from '@/views/RequestAccess'
import Wizard from '@/views/Wizard'

export default {
  name: 'App',

  components: { Welcome, showAt, TopBar, Container, Storage, Network, RequestAccess, Wizard },
  // data () {
  //   return {
  //     tabs: [
  //       {
  //         icon: 'mdi-package',
  //         name: 'Container'
  //       },
  //       {
  //         icon: 'mdi-database',
  //         name: 'Storage'
  //       },
  //       {
  //         icon: 'mdi-lan',
  //         name: 'Network'
  //       },
  //       {
  //         icon: 'mdi-wizard-hat',
  //         name: 'Wizard'
  //       }
  //     ],
  //     tab_items: [ <Container/>, <Network/>, <Wizard/>]
  //   }
  // },
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
  async mounted () {
    if (this.$store.getters['users/get_is_authenticated'] === 'true') {
      const user_id = this.$store.getters['users/get_user_id']
    } else {
      await this.$router.push({ name: 'Home' })
    }
  },
  created () {
    this.$vuetify.theme.dark = this.$store.getters['users/get_dark_mode']
  }
}
</script>

<style scoped lang="scss">
.icon {
  position: absolute;
  left: 15px;
  color: floralwhite;
}
.sidenav {
  height: 100vh;
  position: absolute;
  left: -2px;
  top: -2px;
  min-width: 100px;
}
.activeTab{
  background-color: green;
}

.topBar{
  position: absolute;
  width: 80vw;
  right: 0vw;
  z-index: 1;
}

.logo {
  padding: 1.25em .75em 1em 1em;
  display: flex;
  justify-content: center;
  align-items: center;
}
hr{
  background-color: rgba(240, 240, 240, .5);
}

.title {
  padding: 0 1rem 0 3rem;
  color: floralwhite;
}
.items {
  margin-left: 1vw;
  //margin: 6.5vh;
}
</style>
