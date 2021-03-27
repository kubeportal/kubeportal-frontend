<template>
  <div>
    <v-tabs fixed-tabs>
      <v-tab>
        <v-icon class="mr-2">mdi-desktop-classic</v-icon>
        PVC
      </v-tab>
      <v-tab-item>
        <v-data-table
          :headers="pvc_headers"
          :items="pvcs_data"
          :items-per-page="15"
          class="elevation-1"
          :search="search_pvc"
        >
          <template v-slot:top>
            <v-row>
              <v-col md="1">
                <v-btn color="green" icon x-large disabled>
                  <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
              </v-col>
              <v-col md="10">
                <v-text-field
                  v-model="search_pvc"
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

export default {
  name: 'Storage',
  components: { TopBar },
  data () {
    return {
      overlay: false,
      search_pvc: '',
      pvc_headers: [
        {
          text: 'Name',
          algin: 'start',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Access Mode',
          value: 'access_mode'
        },
        {
          text: 'Phase',
          value: 'phase'
        },
        {
          text: 'Size',
          value: 'size'
        },
        {
          text: 'Created at',
          value: 'creation_timestamp'
        }
      ]
    }
  },
  computed: {
    namespace () {
      return this.$store.getters['users/get_user']['namespace_names'].join(
        ', '
      )
    },
    pvcs_data () {
      return this.$store.getters['pvcs/get_persistentvolumeclaims']
    }
  },
  mounted () {
    if (this.pvcs_data.length === 0) {
      this.$store.dispatch('pvcs/request_persistentvolumeclaims')
    }
  }
}
</script>

<style>
</style>
