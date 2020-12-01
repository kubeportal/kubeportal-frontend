<template>
  <div class="text-left main">
    <v-row no-gutters>
      <v-col>
        <v-card>
          <v-form class="generator_form">
            <v-text-field v-model="form.servicename" required label="custom service name"></v-text-field>
            <v-text-field v-model="form.serviceport" required label="service port"></v-text-field>
            <v-text-field v-model="form.namespace" required label="namespace"></v-text-field>
            <v-text-field v-model="form.deploymentname" required label="deployment name"></v-text-field>
          </v-form>
        </v-card>
      </v-col>
      <v-col>
        <YamlContainer :yamlfile="yamlfile"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import YamlContainer from './YamlContainer'
import EventBus from '../../plugins/eventbus.js'

export default {
  name: 'Service',
  components: { YamlContainer },

  data () {
    return {
      form: {
        serviceport: this.$store.getters['generator/get_container_port'],
        servicename: this.$store.getters['generator/get_service_name'],
        namespace: this.$store.getters['generator/get_namespace'],
        deploymentname: this.$store.getters['generator/get_deployment_name']
      }
    }
  },

  computed: {
    jsonfile () {
      return {
        'kind': 'Service',
        'apiVersion': 'v1',
        'metadata': {
          'name': this.form.servicename,
          'namespace': this.form.namespace
        },
        'spec': {
          'ports': [
            {
              'protocol': 'TCP',
              'port': this.form.serviceport,
              'targetPort': this.form.targetport
            }
          ],
          'selector': {
            'app': this.form.deploymentname
          }
        }
      }
    },
    yamlfile () {
      let string =
             'kind: Service\napiVersion: v1\nmetadata:\n  name: ' + this.form.servicename + '\n  namespace: ' + this.form.namespace + '\nspec:\n  ports:\n  - protocol: TCP\n    port: ' + this.form.serviceport + '\nselector:\n    app: ' + this.form.deploymentname + '\n'
      return string
    }
  },
  created () {
    EventBus.$on('SaveServiceData', (() => {
      this.$store.commit('generator/set_service_name', this.form.servicename)
      this.$store.commit('generator/set_service_port', this.form.serviceport)
      this.$store.commit('generator/set_namespace', this.form.namespace)
      this.$store.commit('generator/set_deployment_name', this.form.deploymentname)
    }))
  }
}
</script>

<style scoped>
  .card {
    margin-top: 1vw;
  }
  .main {
    padding: 2vw 0vw 0vw 0vw;
  }

  .generator_form {
    width: 95%;
    margin: 0 1em;
  }
</style>
