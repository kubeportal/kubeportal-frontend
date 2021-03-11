<template>
  <v-card>
    <v-card-text>
        current namespace: {{ namespace }}
    </v-card-text>
    <div>
      <v-tabs fixed-tabs>
        <v-tab>
          <v-icon>mdi-transit-connection</v-icon>
          Services
        </v-tab>
        <v-tab>
          <v-icon>mdi-lan-pending</v-icon>
          Ingresses
        </v-tab>

        <v-tab-item>
          <div>
            <v-btn color="green" dark icon @click="overlay = true" x-large>
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
            <ServiceModal @close="overlay = false" :overlay="overlay" :namespace="namespace" />
          </div>
          <v-data-table
            :headers="services_headers"
            :items="services_data"
            :items-per-page="5"
            class="elevation-1"
            :search="search_services"
          >
            <template v-slot:top>
              <v-text-field
                v-model="search_services"
                label="Search"
                class="mx-4"
              ></v-text-field>
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item>
          <v-data-table
            :headers="ingresses_headers"
            :items="ingresses_data"
            :items-per-page="5"
            class="elevation-1"
            :search="search_ingresses"
          >
            <template v-slot:top>
              <v-text-field
                v-model="search_ingresses"
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
import ServiceModal from './ServiceModal'
import * as backend from '@/utils/backend'

export default {
  name: 'Network',
  components: { TopBar, ServiceModal },
  computed: {
    namespace () {
      return this.$store.getters['users/get_user']['k8s_namespace_names'].join(', ')
    }
  },
  data () {
    return {
      overlay: false,
      services_data: [],
      ingresses_data: [],
      search_services: '',
      search_ingresses: '',
      services_headers: [
        {
          text: 'Name',
          algin: 'start',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Type',
          value: 'type'
        },
        {
          text: 'Selector',
          value: 'selector'
        },
        {
          text: 'Ports',
          value: 'ports'
        }
      ],
      ingresses_headers: [
        {
          text: 'Name',
          algin: 'start',
          sortable: false,
          value: 'name'
        },
        {
          text: 'TLS',
          value: 'tls'
        },
        {
          text: 'Domain',
          value: 'domain'
        },
        {
          text: 'Routes',
          value: 'routes'
        }
      ]
    }
  },
  methods: {
    async get_services () {
      let response = await backend.get(`/services/${this.namespace}/`)
      console.log('GET SERVICES', response.data)
      let services = []
      for (const service of response.data) {
        let data = {}
        data['name'] = service.name
        data['type'] = service.type
        let selectors = []
        for (let key in service.selector) {
          selectors.push(`${key}:${service.selector[key]}`)
        }
        data['selector'] = selectors.join('\n')
        let ports = []
        for (const port_data of service.ports) {
          ports.push(`${port_data['protocol']}:${port_data['port']}`)
        }
        data['ports'] = ports.join('\n')
        services.push(data)
      }
      this.services_data = services
    },
    async get_ingresses () {
      let response = await backend.get(`/ingresses/${this.namespace}/`)
      console.log('GET INGRESSES', response.data)
      let ingresses = []
      for (const ingress of response.data) {
        let data = {}
        data['name'] = ingress.name
        data['tls'] = ingress.tls
        let domains = []
        let routes = []
        for (let key in ingress.rules) {
          domains.push(key)
          for (let rule_data in ingress.rules[key]) {
            let tmp = ingress.rules[key][rule_data]
            routes.push(
              `${rule_data}/${tmp['service_name']}:${tmp['service_port']}`
            )
          }
        }
        data['domains'] = domains.join('\n')
        data['routes'] = routes
        ingresses.push(data)
      }
      this.ingresses_data = ingresses
    }
  },
  mounted () {
    this.get_services()
    this.get_ingresses()
  }
}
</script>

<style scoped>
</style>
