<template>
  <div>
    <v-btn @click="$emit('close_details')">
      <v-icon class="mr-2">mdi-arrow-left</v-icon>
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
        Detail View {{ pod_name }}
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
  props: ['pod_name'],
  data () {
    return {
      logs: ['log1', 'log2']
    }
  },
  methods: {
    close_details () {
      this.$emit('close_details')
    }
  }
}
</script>

<style scoped>
</style>
