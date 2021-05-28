<template>
  <div>
    <v-tabs fixed-tabs>
      <v-tab>
        <v-icon class="mr-2">mdi-desktop-classic</v-icon>
        Pods
      </v-tab>
      <v-tab>
        <v-icon class="mr-2">mdi-hexagon-multiple-outline</v-icon>
        Deployments
      </v-tab>

      <v-tab-item>
        <PodTable :pods_data="pods_data" :namespace="namespace"/>
      </v-tab-item>
      <v-tab-item>
        <DeploymentTable :deployments_data="deployments_data" :namespace="namespace" />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import DeploymentModal from './DeploymentModal'
import DeploymentTable from './DeploymentTable'
import PodModal from './PodModal'
import PodTable from './PodTable'

export default {
  name: 'Container',
  components: { TopBar, DeploymentModal, DeploymentTable, PodModal, PodTable },
  computed: {
    namespace () {
      return this.$store.getters['users/get_current_namespace']
    },
    pods_data () {
      return this.$store.getters['pods/get_pods']
    },
    deployments_data () {
      return this.$store.getters['deployments/get_deployments']
    }
  },
  mounted () {
    if (this.pods_data.length === 0) {
      this.$store.dispatch('pods/request_pods')
    }
    if (this.deployments_data.length === 0) {
      this.$store.dispatch('deployments/request_deployments')
    }
  }
}
</script>

<style scoped>
</style>
