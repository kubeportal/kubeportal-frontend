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
        <DeploymentModal
          @close="deployment_overlay = false"
          :overlay="deployment_overlay"
          :namespace="namespace"
        />
        <v-data-table
          :headers="deployment_headers"
          :items="deployments_data"
          :items-per-page="10"
          class="elevation-1"
          :search="search_deployments"
        >
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
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import DeploymentModal from './DeploymentModal'
import PodModal from './PodModal'
import PodTable from './PodTable'

export default {
  name: 'Container',
  components: { TopBar, DeploymentModal, PodModal, PodTable },
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
  data () {
    return {
      deployment_overlay: false,
      pod_overlay: false,
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
          text: 'Image',
          value: 'images'
        },
        {
          text: 'Container',
          value: 'containers'
        },
        {
          text: 'Volumes',
          value: 'volume_names'
        },
        {
          text: 'Created',
          value: 'creation_timestamp'
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
    refresh_pods () {
      this.$store.dispatch('pods/request_pods')
    },
    refresh_deployments () {
      this.$store.dispatch('deployments/request_deployments')
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
.v-tooltip__content p {
  font-size: 1.2rem !important;
}

.v-tooltip__content .tooltip {
  margin: 2rem 1rem 2rem 1rem;
}

.v-tooltip__content h3 {
  font-size: 1.2rem !important;
  font-weight: bolder;
}
.v-tooltip__content hr {
  width: 75%;
  margin: 1rem 0 1rem 0;
}
</style>
