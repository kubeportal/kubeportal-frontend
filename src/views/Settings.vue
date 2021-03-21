<template>
  <v-card>
    <Dashboard :tabs="tabs" />
  </v-card>
</template>

<script>
import Dashboard from '@/components/Dashboard'
import Info from '@/components/Settings/Info/Info'
import KubernetesSettings from '@/components/Settings/KubernetesSettings/KubernetesSettings'
import Profile from '@/components/Settings/Profile/Profile'

export default {
  name: 'Settings',
  components: { Dashboard },
  computed: {
    tabs () {
      return [
        {
          icon: 'mdi-account-details',
          name: 'User',
          has_access: true,
          component: Profile
        }, {
          icon: 'mdi-kubernetes',
          name: 'Kubernetes',
          has_access: true,
          component: KubernetesSettings
        }, {
          icon: 'mdi-information-outline',
          name: 'Infos',
          has_access: true,
          component: Info
        }
      ]
    }
  }
}
</script>
