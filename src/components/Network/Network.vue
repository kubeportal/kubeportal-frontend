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
            <v-btn color="green" icon @click="service_overlay = true" x-large disabled>
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
            <ServiceModal @close="service_overlay = false" :overlay="service_overlay" :namespace="namespace" />
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
          <div>
            <v-btn color="green" icon @click="ingress_overlay = true" x-large disabled>
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </div>
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
import IngressModal from './IngressModal'

export default {
  name: 'Network',
  components: { TopBar, ServiceModal, IngressModal },
  computed: {
    namespace () {
      return this.$store.getters['users/get_user']['namespace_names'].join(', ')
    },
    services_data () {
      return this.$store.getters['services/get_services']
    },
    ingresses_data () {
      return this.$store.getters['ingresses/get_ingresses']
    }
  },
  data () {
    return {
      service_overlay: false,
      ingress_overlay: false,
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
          text: 'Hosts',
          value: 'hosts'
        },
        {
          text: 'Paths',
          value: 'path'
        },
        {
          text: 'Service',
          value: 'services'
        }
      ]
    }
  },
  mounted () {
    if (this.services_data.length === 0) {
      this.$store.dispatch('services/request_services')
    }
    if (this.ingresses_data.length === 0) {
      this.$store.dispatch('ingresses/request_ingresses')
    }
  }
}
</script>

<style scoped>
</style>
