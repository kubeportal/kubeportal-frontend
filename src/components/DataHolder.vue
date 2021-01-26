<template>
  <div>
    <v-tabs
      fixed-tabs
      >
      <v-tab>
        <v-icon>mdi-desktop-classic</v-icon>
        Pods
      </v-tab>
      <v-tab>
        <v-icon>mdi-hexagon-multiple-outline</v-icon>
        Deployments
      </v-tab>

      <v-tab-item>
        <v-data-table
          :headers="pods_headers"
          :items="pods_data"
          :items-per-page="5"
          class="elevation-1"
          :search="search_pods"
        >
          <template v-slot:top>
            <v-text-field
              v-model="search_pods"
              label="Search"
              class="mx-4"
            ></v-text-field>
          </template>
        </v-data-table>
      </v-tab-item>
      <v-tab-item>
        <v-data-table
          :headers="deployment_headers"
          :items="deployment_data"
          :items-per-page="5"
          class="elevation-1"
          :search="search_deployments"
        >
          <template v-slot:top>
            <v-text-field
              v-model="search_deployments"
              label="Search"
              class="mx-4"
            ></v-text-field>
          </template>
        </v-data-table>
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
      search_pods: '',
      search_deployments: '',
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

}
</script>

<style>

</style>
