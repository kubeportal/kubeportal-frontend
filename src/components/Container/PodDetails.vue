<template>
  <div>
    <v-btn class="backBtn" @click="$emit('close_details')">
      <v-icon >mdi-arrow-left</v-icon>
      Back
    </v-btn>
    <v-tabs fixed-tabs >
      <v-tab>
        <v-icon class="mr-2">mdi-desktop-classic</v-icon>
        Details
      </v-tab>
      <v-tab>
        <v-icon class="mr-2">mdi-hexagon-multiple-outline</v-icon>
        Logs
      </v-tab>

      <v-tab-item>
        <div>
          <v-card class="details">

            <v-card-title>Timestamps</v-card-title>
            <v-row class="detailRow">
              <v-col>
                created
                {{ pod.creation_timestamp }}
              </v-col>

              <v-col>
                started
                {{ pod.start_timestamp }}
             </v-col>
            </v-row>

            <v-card-title>phase</v-card-title>
            <v-row class="detailRow">
              <v-col>{{ pod.phase }}</v-col>
            </v-row>

            <v-card-title>Meta</v-card-title>
            <v-row class="detailRow">
              <v-col>
                  Name:
                  {{ pod.name }}
              </v-col>

              <v-col>
                  puid:
                  {{ pod.puid }}
               </v-col>
            </v-row>
            <v-row class="detailRow">
             <v-col>
              host ip:
              {{ pod.host_ip }}
             </v-col>
            </v-row>

            <v-card-title>Container</v-card-title>
            <v-row class="detailRow">
             <v-col
                v-for="container in pod.containers"
                :key="container"
              >
                {{ container }}
              </v-col>
            </v-row>

            <v-card-title>Images</v-card-title>
            <v-row class="detailRow">
             <v-col
                v-for="image in pod.images"
                :key="image"
              >
                {{ image }}
              </v-col>
            </v-row>

            <v-card-title>Volumes</v-card-title>
            <v-row class="detailRow"
              v-for="(volume, i) in pod.volumes"
                :key="volume.name"
              >
                <v-col>name: {{ pod.volumes[i].volume.name }}</v-col>
                <v-col>type: {{ pod.volumes[i].volume.type }}</v-col>
                <v-col>mountpath: {{ pod.volumes[i].mount_path }}</v-col>
            </v-row>
          </v-card>
        </div>
      </v-tab-item>
      <v-tab-item>
        <Logs :logs="logs" />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import Logs from '@/components/Logs'

export default {
  name: 'PodDetails',
  components: { Logs },
  props: ['pod', 'namespace'],
  methods: {
    close_details () {
      this.$emit('close_details')
    }
  },
  computed: {
    logs () {
      let tmo = this.$store.getters['pods/get_pod_logs']
      console.log('logs, in pod detail', tmo)
      return tmo[this.pod.name]
    }
  },
  async mounted () {
    this.$store.dispatch('pods/request_test_logs', {
      namespace: this.namespace,
      pod_name: this.pod.name
    })
  }
}
</script>

<style scoped>
.details {
  width: 100%;
  height: 60vh;
  overflow-y: scroll;
}
.detailRow {
  padding: 0 1em;
}
.backBtn {
  margin-bottom: 1em;
}
</style>
