<template>
  <v-card>
    <div>
      <v-tabs fixed-tabs>
        <v-tab>
          <v-icon>mdi-desktop-classic</v-icon>
          PVC
        </v-tab>
        <v-tab-item>
          <v-data-table
            :headers="pvc_headers"
            :items="pvc_data"
            :items-per-page="15"
            class="elevation-1"
            :search="search_pvc"
          >
            <template v-slot:top>
              <v-text-field
                v-model="search_pvc"
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

export default {
  name: 'Storage',
  components: { TopBar },
  data () {
    return {
      overlay: false,
      // pvc_data: [],
      search_pvc: '',
      pvc_headers: [
        {
          text: 'Name',
          algin: 'start',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Created at',
          value: 'status'
        },
        {
          text: 'Container',
          value: 'cpu_usage'
        }
      ]
    }
  },
  computed: {
    pvc_data () {
      return [
        {
          name: 'pvc1',
          status: 'running',
          cpu_usage: '99%'
        },
        {
          name: 'pvc2',
          status: 'sleeping',
          cpu_usage: '1%'
        },
        {
          name: 'not a pvc',
          status: 'not running',
          cpu_usage: '110%'
        }
      ]
    }
  }
}
</script>

<style>
</style>
