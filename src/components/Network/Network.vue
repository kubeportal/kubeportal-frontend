<template>
  <div>
    <v-card>
      <DataHolder :pods_data="pods_data" :deployment_data="deployment_data" />
    </v-card>
    <v-card class="form">
      <v-card-title>
        Create Service
      </v-card-title>
      <v-form
        @submit="post_service"
        ref="form"
        lazy-validation
      >
        <v-text-field
          v-model="name"
          :rules="name_rules"
          label="Name"
          required
        ></v-text-field>

        <v-select
          v-model="type"
          :items="type_items"
          label="Type"
          required
        ></v-select>

        <v-text-field
          v-model="app"
          label="App"
          required
        ></v-text-field>

        <v-text-field
          v-model="port"
          type="number"
          required
          label="Port"
        ></v-text-field>
        <v-select

          v-model="protocol"
          :items="protocol_items"
          label="Protocol"
          required
        ></v-select>

        <v-btn
          color="success"
          type="submit"
        >
          Submit
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import DataHolder from '@/components/DataHolder'
import * as backend from '@/utils/backend'

export default {
  name: 'Network',
  components: { TopBar, DataHolder },
  data () {
    return {
      name: '',
      name_rules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 25) || 'Name must be less than 25 characters'
      ],
      type: '',
      type_items: ['NodePort', 'CluserIP', 'LoadBalancer'],
      app: '',
      protocol: '',
      protocol_items: ['TCP', 'UDP', 'SCTP'],
      port: null
    }
  },
  computed: {
    pods_data () {
      return [{
        name: 'Pod1',
        status: 'running',
        cpu_usage: '99%'
      },
      {
        name: 'Pod2',
        status: 'sleeping',
        cpu_usage: '1%'
      },
      {
        name: 'not a pod',
        status: 'not running',
        cpu_usage: '110%'
      }]
    },
    deployment_data () {
      return [{
        name: 'deployment',
        status: 'running',
        cpu_usage: '99%'
      },
      {
        name: 'deployment2',
        status: 'sleeping',
        cpu_usage: '1%'
      },
      {
        name: 'not a deployment',
        status: 'not running',
        cpu_usage: '110%'
      }]
    }
  },
  methods: {
    async post_service (e) {
      e.preventDefault()
      console.log(this.name, this.type, this.app, this.protocol, this.port)
      let response = await backend.post('services/default/', {
        name: this.name,
        type: this.type,
        selector : {
          app: this.app
        },
        ports: [
          {
            port: this.port,
            protocol: this.protocol
          }
        ]
      })
      console.log('POST SERVICE', response)
    },
    async request_services () {
      let response = await backend.get('services/default/')
      console.log('GET SERVICES', response)
    }
  },
  mounted () {
    this.request_services()
  }
}
</script>

<style scoped>
  .form {
    width: 50%;
    margin: 1em auto;
    padding: 1em;
  }

</style>
