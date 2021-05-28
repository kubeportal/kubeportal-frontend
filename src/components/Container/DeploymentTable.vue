<template>
  <div>
    <DeploymentModal
      @close="deployment_overlay = false"
      :overlay="deployment_overlay"
      :namespace="namespace"
    />
    <ServiceModal
      @close="service_overlay = false"
      :overlay="service_overlay"
      :namespace="namespace"
      :service_selectors="service_selectors"
    />
    <v-data-table
      :headers="deployment_headers"
      :items="deployments_data"
      :items-per-page="10"
      class="elevation-1"
      :search="search_deployments"
    >
      <template v-slot:item="props">
        <tr>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.replicas }}</td>
          <td>{{ props.item.creation_timestamp }}</td>
          <td>
            <v-menu offset-y left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  icon
                >
                  <v-icon>mdi-cog</v-icon>
                </v-btn>
              </template>
              <v-list flat>
                <v-list-item @click="service_modal(props.item.match_labels)">
                  <v-list-item-icon>
                    <v-icon>mdi-transit-connection</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Create Service</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-desktop-classic</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Create PVC</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Delete</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </template>
      <template v-slot:top>
        <v-row>
          <v-col md="1">
            <v-btn
              color="green"
              icon
              @click="deployment_overlay = true"
              x-large
            >
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </v-col>
          <v-col md="1">
            <v-btn
              icon
              @click="refresh_deployments"
              x-large
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-col>
          <v-col md="10">
            <v-text-field
              v-model="search_deployments"
              label="Search"
              class="mx-4"
            ></v-text-field>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import DeploymentModal from './DeploymentModal'
import ServiceModal from '../Network/ServiceModal'

export default {
  name: 'DeploymentTable',
  components: { DeploymentModal, ServiceModal },
  props: ['deployments_data', 'namespace'],
  data () {
    return {
      deployment_overlay: false,
      search_deployments: '',
      service_overlay: false,
      service_selectors: [],
      deployment_headers: [
        {
          text: 'Name',
          algin: 'start',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Replicas',
          value: 'replicas'
        },
        {
          text: 'Created',
          value: 'creation_timestamp'
        }
      ]
    }
  },
  methods: {
    refresh_deployments () {
      this.$store.dispatch('deployments/request_deployments')
    },
    service_modal (selectors) {
      this.service_overlay = true
      this.service_selectors = selectors
    }
  }
}

</script>

<style>

</style>
