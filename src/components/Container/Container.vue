<template>
  <div>
    <v-card>
      <DataHolder :pods_data="pods_data" :deployment_data="deployment_data" />
    </v-card>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import DataHolder from '@/components/DataHolder'
import * as backend from '@/utils/backend'

export default {
  name: 'Container',
  components: { TopBar, DataHolder },
  computed: {
    pods_data () {
      return [{
        name: 'Pod1',
        status: 'running',
        cpu_usage: '99%'
      },
      {
        name: 'Pod2',
        status: 'sleeping',
        cpu_usage: '1%'
      },
      {
        name: 'not a pod',
        status: 'not running',
        cpu_usage: '110%'
      }]
    },
    deployment_data () {
      return [{
        name: 'deployment',
        status: 'running',
        cpu_usage: '99%'
      },
      {
        name: 'deployment2',
        status: 'sleeping',
        cpu_usage: '1%'
      },
      {
        name: 'not a deployment',
        status: 'not running',
        cpu_usage: '110%'
      }]
    }
  },
  methods: {
    async get_pods () {
      let response = await backend.read('pods/default/')
      console.log(response)
    }
  },
  mounted () {
    this.get_pods()
  }
}
</script>

<style>

</style>
