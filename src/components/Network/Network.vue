<template>
  <v-card>
    <div>
    <v-tabs
      fixed-tabs
      >
      <v-tab>
        <v-icon>mdi-transit-connection</v-icon>
        Services
      </v-tab>
      <v-tab>
        <v-icon>mdi-lan-pending</v-icon>
        Ingresses
      </v-tab>

      <v-tab-item>
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
  <!-- <v-card class="form">
      <v-card-title>
        Create Service
      </v-card-title>
      <v-form
        @submit="post_service"
        ref="form"
        lazy-validation
      >
        <v-text-field
          v-model="name"
          :rules="name_rules"
          label="Name"
          required
        ></v-text-field>

        <v-select
          v-model="type"
          :items="type_items"
          label="Type"
          required
        ></v-select>

        <v-text-field
          v-model="app"
          label="App"
          required
        ></v-text-field>

        <v-text-field
          v-model="port"
          type="number"
          required
          label="Port"
        ></v-text-field>
        <v-select

          v-model="protocol"
          :items="protocol_items"
          label="Protocol"
          required
        ></v-select>

        <v-btn
          color="success"
          type="submit"
        >
          Submit
        </v-btn>
      </v-form>
    </v-card> -->
</template>

<script>
import TopBar from '@/components/TopBar'
import DataHolder from '@/components/DataHolder'
import * as backend from '@/utils/backend'

export default {
  name: 'Network',
  components: { TopBar, DataHolder },
  data () {
    return {
      services_data: [],
      ingresses_data: [],
      search_services: '',
      search_ingresses: '',
      services_headers: [{
        text: 'Name', algin:'start', sortable: false, value:'name'
      },
      {
        text: 'Type', value: 'type'
      },
      {
        text: 'Selector', value: 'selector'
      },
      {
        text: 'Ports', value: 'ports'
      }],
      ingresses_headers: [{
        text: 'Name', algin:'start', sortable: false, value:'name'
      },
      {
        text: 'TLS', value: 'tls'
      },
      {
        text: 'Domain', value: 'domain'
      },
      {
        text: 'Routes', value: 'routes'
      }],
      name: '',
      name_rules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length <= 25) || 'Name must be less than 25 characters'
      ],
      type: '',
      type_items: ['NodePort', 'CluserIP', 'LoadBalancer'],
      app: '',
      protocol: '',
      protocol_items: ['TCP', 'UDP', 'SCTP'],
      port: null
    }
  },
  methods: {
    async post_service (e) {
      e.preventDefault()
      console.log(this.name, this.type, this.app, this.protocol, this.port)
      let response = await backend.post('services/default/', {
        name: this.name,
        type: this.type,
        selector: {
          app: this.app
        },
        ports: [
          {
            port: this.port,
            protocol: this.protocol
          }
        ]
      })
      console.log('POST SERVICE', response)
    },
    async get_services () {
      let response = await backend.get('services/default/')
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
      let response = await backend.get('ingresses/default/')
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
            routes.push(`${rule_data}/${tmp['service_name']}:${tmp['service_port']}`)
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
.form {
  width: 50%;
  margin: 1em auto;
  padding: 1em;
}
</style>
