<template>
  <div>
    <PodModal
      @close="pod_overlay = false"
      :overlay="pod_overlay"
      :namespace="namespace"
    />
    <ServiceModal
      @close="service_overlay = false"
      :overlay="service_overlay"
      :namespace="namespace"
    />
    <v-data-table
      :headers="pods_headers"
      :items="pods_data"
      :items-per-page="10"
      class="elevation-1"
      :search="search_pods"
    >
      <template v-slot:item="props">
        <tr>
          <td>{{ props.item.name }}</td>
          <td>
            <div v-for="image in props.item.images" :key="image">
              {{ image }}
            </div>
          </td>
          <td>
            <div
              v-for="container in props.item.containers"
              :key="container"
            >
              {{ container }}
            </div>
          </td>
          <td>
            {{props.item.phase}}
          </td>
          <v-tooltip color="#2e2e2e" nudge-left="10" left>
            <template v-slot:activator="{ on, attrs }">
              <td>
                <div
                  v-bind="attrs"
                  v-on="on"
                  v-for="volume in props.item.volume_names"
                  :key="volume"
                >
                  {{ volume }}
                </div>
              </td>
            </template>
            <span>
              <div
                class="tooltip"
                v-for="volume_mount in props.item.volumes"
                :key="volume_mount.volume.name"
              >
                <h3>{{ volume_mount.volume.name }}</h3>
                <hr />
                <p>type: {{ volume_mount.volume.type }}</p>
                <p>mountpath: {{ volume_mount.mount_path }}</p>
              </div>
            </span>
          </v-tooltip>
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
                <v-list-item @click="service_overlay = true">
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
              @click="pod_overlay = true"
              x-large
            >
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </v-col>
          <v-col md="1">
            <v-btn
              icon
              @click="refresh_pods"
              x-large
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-col>
          <v-col md="10">
            <v-text-field
              v-model="search_pods"
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
import PodModal from './PodModal'
import ServiceModal from '../Network/ServiceModal'

export default {
  name: 'PodTable',
  props: ['pods_data', 'namespace'],
  components: { PodModal, ServiceModal },
  data () {
    return {
      pod_overlay: false,
      service_overlay: false,
      search_pods: '',
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
          text: 'Phase',
          value: 'phase'
        },
        {
          text: 'Volumes',
          value: 'volume_names'
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
    }
  }
}
</script>

<style>

</style>
