<template>
  <v-overlay :value="overlay">
    <v-card class="modal" light>
      <v-card-title> Create Pod </v-card-title>
      <v-card-text>
        <v-form @submit="post_pod">
          <v-text-field v-model="name" label="Name" required> </v-text-field>
          <v-row align="center">
            <v-col>
              <v-btn color="success" type="submit"> Submit </v-btn>
            </v-col>
            <v-col>
              <v-btn @click="emit_event" color="error" type="button">
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-overlay>
</template>

<script>
import * as backend from '@/utils/backend'
export default {
  name: 'PodModal',
  props: { overlay: Boolean, namespace: String },
  data () {
    return {
      name: '',
      container: []
    }
  },
  methods: {
    async post_pod (e) {
      e.preventDefault()
      let response = await backend.post(`/pods/${this.namespace}/`, {
        name: this.name,
        replicas: this.replicas
      })
      this.emit_event()
    },
    emit_event () {
      this.$emit('close', false)
    }
  }
}
</script>

<style scoped>
.modal {
  width: 20vw;
  /* background-color: var(--v-primary) !important; */
}
</style>
