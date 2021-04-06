<template>
  <v-overlay :value="overlay">
    <v-card class="modal" light>
      <v-card-title> Create Pod </v-card-title>
      <v-card-text>
        <v-form @submit="post_pvc">
          <v-text-field v-model="name" label="PVC Name" :rules="[rules.required]"> </v-text-field>
          <v-row v-for="(access_mode, index) in access_modes" :key="'acces_modes'+index">
            <v-col md="10">
              <v-text-field v-model="access_mode.value" label="Access Mode" :rules="[rules.required]"> </v-text-field>
            </v-col>
            <v-col md="2" v-if="index === 0">
              <v-btn
                icon
                large
                @click="access_modes.push({value:''})"
              >
              <v-icon>mdi-plus-circle</v-icon>
              </v-btn>
            </v-col>
            <v-col md="2" v-else>
              <v-btn
                icon
                color="red"
                large
                @click="access_modes.splice(index, 1)"
              >
              <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-text-field v-model="storage_class_name" label="Storage Class Name" :rules="[rules.required]"> </v-text-field>
          <v-text-field v-model="size" label="Size" :rules="[rules.required]"> </v-text-field>
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
export default {
  name: 'PVCModal',
  props: { overlay: Boolean, namespace: String },
  data () {
    return {
      name: '',
      access_modes: [{ value:'' }],
      storage_class_name: '',
      size: '',
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  methods: {
    async post_pvc (e) {
      e.preventDefault()
      let data = {
        name: this.name,
        access_modes: this.access_modes.map(mode => mode.value),
        storage_class_name: this.storage_class_name,
        size: this.size
      }
      console.log('PVC MODAL DATA', data)
      this.$store.dispatch('pvcs/create_pvc', data)
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
}
</style>
