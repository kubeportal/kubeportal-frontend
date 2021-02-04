<template>
  <v-card>
    <div>
      <v-tabs fixed-tabs>
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
            :items-per-page="15"
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
            :items-per-page="15"
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
  </v-card>
</template>

<script>
import TopBar from '@/components/TopBar'
import DataHolder from '@/components/DataHolder'
import * as backend from '@/utils/backend'
import moment from 'moment'

export default {
  name: 'Container',
  components: { TopBar, DataHolder },
  data () {
    return {
      pods_data: [],
      deployment_data: [],
      search_pods: '',
      search_deployments: '',
      pods_headers: [
        {
          text: 'Name',
          algin: 'start',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Created at',
          value: 'creation_timestamp'
        },
        {
          text: 'Container',
          value: 'containers'
        }
      ],
      deployment_headers: [
        {
          text: 'Name',
          algin: 'start',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Created at',
          value: 'creation_timestamp'
        },
        {
          text: 'Replicas',
          value: 'replicas'
        }
      ]
    }
  },
  methods: {
    async get_pods () {
      let response = await backend.get('pods/default/')
      console.log('PODS', response)
      let pods = []
      for (const pod of response.data) {
        let data = {}
        data['name'] = pod.name
        data['creation_timestamp'] = moment(pod.creation_timestamp).format(
          'MMM DD hh:mm:ss'
        )
        data['containers'] = pod.containers.map((container) => container.name)
        pods.push(data)
      }
      this.pods_data = pods
    },
    async get_deployments () {
      let response = await backend.get('deployments/default/')
      console.log('DEPLOYMENTS', response)
      let deployments = []
      for (const deployment of response.data) {
        let data = {}
        data['name'] = deployment.name
        data['creation_timestamp'] = moment(deployment.creation_timestamp).format('MMM DD hh:mm:ss')
        data['replicas'] = deployment.replicas
        deployments.push(data)
      }
      this.deployment_data = deployments
    }
  },
  mounted () {
    this.get_pods()
    this.get_deployments()
  }
}
</script>

<style>
</style>
