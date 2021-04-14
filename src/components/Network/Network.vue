<template>
  <div>
    <v-tabs fixed-tabs>
      <v-tab>
        <v-icon class="mr-2">mdi-transit-connection</v-icon>
        Services
      </v-tab>
      <v-tab>
        <v-icon class="mr-2">mdi-lan-pending</v-icon>
        Ingresses
      </v-tab>

      <v-tab-item>
        <ServiceModal
          @close="service_overlay = false"
          :overlay="service_overlay"
          :namespace="namespace"
        />
        <v-data-table
          :headers="services_headers"
          :items="services_data"
          :items-per-page="10"
          class="elevation-1"
          :search="search_services"
        >
          <template v-slot:item="props">
            <tr>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.type }}</td>
              <td>{{ props.item.selector }}</td>
              <td><span v-html="props.item.formatted_ports" /></td>
              <td><span v-html="props.item.formatted_target_ports" /></td>
              <td>{{ props.item.creation_timestamp }}</td>
            </tr>
          </template>
          <template v-slot:top>
            <v-row>
              <v-col md="1">
                <v-btn
                  color="green"
                  icon
                  @click="service_overlay = true"
                  x-large
                >
                  <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
              </v-col>
              <v-col md="1">
                <v-btn
                  icon
                  @click="refresh_service"
                  x-large
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </v-col>
              <v-col md="10">
                <v-text-field
                  v-model="search_services"
                  label="Search"
                  class="mx-4"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </v-tab-item>
      <v-tab-item>

        <IngressModal
          @close="ingress_overlay = false"
          :overlay="ingress_overlay"
          :namespace="namespace"
        />
        <v-data-table
          :headers="ingresses_headers"
          :items="ingresses_data"
          :items-per-page="10"
          class="elevation-1"
          :search="search_ingresses"
        >
          <template v-slot:item="props">
            <tr>
              <td>
                <div class="d-inline-flex flex-nowrap">
                  <v-icon class="mr-2" v-if="props.item.tls"
                    >mdi-lock-check-outline</v-icon
                  >
                  <v-icon small class="mr-2" v-else
                    >mdi-lock-open-variant-outline</v-icon
                  >
                  <span
                    class="host mt-2"
                    v-html="props.item.formatted_host_links"
                  />
                </div>
              </td>
              <td>
                <v-icon
                  x-small
                  v-if="props.item.status === 200"
                  style="color: #689f38"
                  class="icon"
                  >mdi-checkbox-blank-circle</v-icon
                >
                <v-icon x-small v-else class="icon" style="color: #a10000"
                  >mdi-checkbox-blank-circle</v-icon
                >
              </td>
              <td>{{ props.item.name }}</td>
              <td><span v-html="props.item.formatted_annotations" /></td>
              <td><span v-html="props.item.formatted_services" /></td>
              <td>{{props.item.creation_timestamp}}</td>
            </tr>
          </template>
          <template v-slot:top>
            <v-row>
              <v-col md="1">
                <v-btn
                  color="green"
                  icon
                  @click="ingress_overlay = true"
                  x-large
                >
                  <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
              </v-col>
              <v-col md="1">
                <v-btn
                  icon
                  @click="refresh_ingress"
                  x-large
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </v-col>
              <v-col md="10">
                <v-text-field
                  v-model="search_ingresses"
                  label="Search"
                  class="mx-4"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import ServiceModal from './ServiceModal'
import IngressModal from './IngressModal'

export default {
  name: 'Network',
  components: { TopBar, ServiceModal, IngressModal },
  computed: {
    services_data () {
      let tmp = this.$store.getters['services/get_services']

      console.log('TMP', tmp)
      return tmp
    },
    ingresses_data () {
      return this.$store.getters['ingresses/get_ingresses']
    },
    namespace () {
      return this.$store.getters['wizard/get_namespace']
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
          sortable: true,
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
        },
        {
          text: 'Targetports',
          value: 'target_ports'
        },
        {
          text: 'Created',
          value: 'creation_timestamp'
        }
      ],
      ingresses_headers: [
        {
          text: 'Hosts',
          value: 'formatted_host_links',
          algin: 'start',
          sortable: true
        },
        {
          text: 'Status',
          value: 'status'
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Annotations',
          value: 'formatted_annotations'
        },
        {
          text: 'Service',
          value: 'formatted_services'
        },
        {
          text: 'Created',
          value: 'creation_timestamp'
        }
      ]
    }
  },
  methods: {
    refresh_service () {
      this.$store.dispatch('services/request_services')
    },
    refresh_ingress () {
      this.$store.dispatch('ingresses/request_ingresses')
    }
  },
  mounted () {
    if (this.services_data.length === 0) {
      this.$store.dispatch('services/request_services')
    }
    if (this.ingresses_data.length === 0) {
      this.$store.dispatch('ingresses/request_ingresses')
    } else {
      this.$store.dispatch('ingresses/check_availablity')
    }
  }
}
</script>

<style scoped>
.host {
  font-size: 1rem;
}
</style>
