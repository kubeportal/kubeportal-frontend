<template>
  <v-overlay :value="overlay">
    <v-card class="modal" light>
      <v-card-title> Create Pod </v-card-title>
      <v-card-text>
        <v-form @submit="post_pod">
          <v-text-field v-model="name" label="Pod Name" required> </v-text-field>
          <v-row v-for="(container, index) in containers" :key="index">
            <v-col md="5">
              <v-text-field v-model="container.name" label="Container Name" />
            </v-col>
            <v-col md="5">
              <v-text-field v-model="container.image" label="Container Image" />
            </v-col>
            <v-col md="2">
              <v-btn
                icon
                large
                @click="containers.push({name:'', image:''})"
              >
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
            </v-col>
          </v-row>
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
      containers: [{ image:'', name:'' }]
    }
  },
  methods: {
    async post_pod (e) {
      e.preventDefault()
      // let response = await backend.post(`/pods/${this.namespace}/`, {
      //   name: this.name,
      //   replicas: this.replicas
      // })
      console.log('POD MODAL DATA', this.name, this.containers)
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
  width: 50vw;
  /* background-color: var(--v-primary) !important; */
}
</style>
