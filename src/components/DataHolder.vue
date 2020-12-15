<template>
  <div>
    <v-tabs
      fixed-tabs
      >
      <v-tab>
        Pods
        <v-icon>mdi-desktop-classic</v-icon>
      </v-tab>
      <v-tab>
        Deployments
        <v-icon>mdi-hexagon-multiple-outline</v-icon>
      </v-tab>

      <v-tab-item>
        <v-data-table
          :headers="pods_headers"
          :items="pods_data"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </v-tab-item>
      <v-tab-item>
        <v-data-table
          :headers="deployment_headers"
          :items="deployment_data"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
export default {
  name: 'DataHolder',
  props: ['pods_data', 'deployment_data'],
  data () {
    return {
      pods_headers: [{
        text: 'Name', algin:'start', sortable: false, value:'name'
      },
      {
        text: 'Status', value: 'status'
      },
      {
        text: 'CPU Usage', value: 'cpu_usage'
      }],
      deployment_headers: [{
        text: 'Name', algin:'start', sortable: false, value:'name'
      },
      {
        text: 'Status', value: 'status'
      },
      {
        text: 'CPU Usage', value: 'cpu_usage'
      }]
    }
  }
  // computed: {
  //   pods_data () {
  //     return [{
  //       name: 'Pod1',
  //       status: 'running',
  //       cpu_usage: '99%'
  //     },
  //     {
  //       name: 'Pod2',
  //       status: 'sleeping',
  //       cpu_usage: '1%'
  //     },
  //     {
  //       name: 'not a pod',
  //       status: 'not running',
  //       cpu_usage: '110%'
  //     }]
  //   },
  //   deployment_data () {
  //     return [{
  //       name: 'deployment',
  //       status: 'running',
  //       cpu_usage: '99%'
  //     },
  //     {
  //       name: 'deployment2',
  //       status: 'sleeping',
  //       cpu_usage: '1%'
  //     },
  //     {
  //       name: 'not a deployment',
  //       status: 'not running',
  //       cpu_usage: '110%'
  //     }]
  //   }
  // }

}
</script>

<style>

</style>
