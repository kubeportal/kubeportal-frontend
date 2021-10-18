<template>
  <div>
    <v-btn @click="$emit('close_details')">
      <v-icon class="mr-2">mdi-arrow-left</v-icon>
      Back
    </v-btn>
    <v-subheader>
      Detail View {{ pod.name}}
    </v-subheader>
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

            <v-row>
              <v-col>
               <v-card-title>

                created at
               </v-card-title>
               <v-card-text>
                {{ pod.creation_timestamp }}
               </v-card-text>
              </v-col>

              <v-col>
               <v-card-title>
                started at
               </v-card-title>
               <v-card-text>
                {{ pod.start_timestamp }}
               </v-card-text>
             </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-card-title>
                  Name
                </v-card-title>
                <v-card-text>
                  {{ pod.name }}
                </v-card-text>
              </v-col>

              <v-col>
                <v-card-title>
                  puid
                </v-card-title>
                  {{ pod.puid }}
               </v-col>
            </v-row>

             <v-card-title>
              container
             </v-card-title>
             <v-card-text>
              <div
                v-for="container in pod.containers"
                :key="container"
              >
                {{ container }}
              </div>
             </v-card-text>

             <v-card-title>
              phase
             </v-card-title>
             <v-card-text>
              {{ pod.phase }}
             </v-card-text>

             <v-card-title>
              host ip
             </v-card-title>
             <v-card-text>
              {{ pod.host_ip }}
             </v-card-text>

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
      let tmo = this.$store.getters['pods/get_pod_logs'][this.pod.name]
      console.log(tmo)
      return tmo
    }
  },
  async mounted () {
    this.$store.dispatch('pods/request_logs', {
      namespace: this.namespace,
      pod_name: this.pod.name
    })
  }
}
</script>

<style scoped>
.details {
  width: 100%;
  height: 80vh;
  overflow-y: scroll;
}
</style>
