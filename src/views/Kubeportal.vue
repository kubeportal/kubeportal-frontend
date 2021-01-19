<template>
  <v-card>
   <Dashboard :tabs="tabs"/>
  </v-card>
</template>

<script>
import { showAt } from 'vue-breakpoints'
import Welcome from '@/components/Welcome/Welcome'
import TopBar from '@/components/TopBar'
import Container from '@/components/Container/Container'
import Storage from '@/components/Storage/Storage'
import Network from '@/components/Network/Network'
import RequestAccess from '@/components/RequestAccess/RequestAccess'
import Wizard from '@/components/Wizard/Wizard'
import Dashboard from '@/components/Dashboard'

export default {
  name: 'App',

  components: { Welcome, Container, Storage, Network, RequestAccess, Wizard, Dashboard },
  computed: {
    has_access () {
      return true
    },
    tabs () {
      return [
        {
          icon: 'mdi-home-heart',
          name: 'Welcome',
          has_access: this.has_access,
          component: Welcome
        }, {
          icon: 'mdi-key',
          name: 'Request Access',
          has_access: !this.has_access,
          component: RequestAccess
        }, {
          icon: 'mdi-package',
          name: 'Container',
          has_access: this.has_access,
          component: Container
        }, {
          icon: 'mdi-database',
          name: 'Storage',
          has_access: this.has_access,
          component: Storage
        }, {
          icon: 'mdi-lan',
          name: 'Network',
          has_access: this.has_access,
          component: Network
        }, {
          icon: 'mdi-wizard-hat',
          name: 'Wizard',
          has_access: this.has_access,
          component: Wizard
        }
      ]
    }
  },
  created () {
    this.$vuetify.theme.dark = this.$store.getters['users/get_dark_mode']
  }
}
</script>
