<template>
  <div class="text-left main">
    <b-row no-gutters>
      <b-col>
        <b-card-body class="card">
          <b-form>

            <b-form-group label="deployment name:">
              <b-form-input v-model="form.deploymentname" required></b-form-input>
            </b-form-group>

            <b-form-group label="image name:" description="schema: registry.datexis.com/<namespace>/<imagename>:<tag>">
              <b-form-input v-model="form.imagename" required></b-form-input>
            </b-form-group>

            <b-form-group label="namespace:">
              <b-form-input v-model="form.namespace" required></b-form-input>
            </b-form-group>

            <b-form-group label="container port:">
              <b-form-input v-model="form.containerport" required></b-form-input>
            </b-form-group>

            <b-form-group label="container name:">
              <b-form-input v-model="form.containername" required></b-form-input>
            </b-form-group>

            <b-form-group label="choose advanced settings:" class="annotations">
              <b-form-group label="CPU requests:">
                <b-form-select
                  :options="[{ text: 'Choose...', value: null }, '1', '2', '3', '4', '5', '6', '7', '8']"
                  :value="2"></b-form-select>
              </b-form-group>

              <b-form-group label="CPU limits:">
                <b-form-select
                  :options="[{ text: 'Choose...', value: null }, '1', '2', '3', '4', '5', '6', '7', '8']"
                  :value="4"></b-form-select>
              </b-form-group>

              <b-form-group id="input-group-5" label="memory requests:" label-for="input-5">
                <b-form-select
                  :options="[{ text: 'Choose...', value: null }, '2', '4', '8', '16', '32', '64', '128', '256']"
                  :value="8"
                ></b-form-select>
              </b-form-group>

              <b-form-group label="memory limits:">
                <b-form-select
                  :options="[{ text: 'Choose...', value: null }, '2', '4', '8', '16', '32', '64', '128', '256']"
                  :value="16"
                ></b-form-select>
              </b-form-group>

            </b-form-group>
          </b-form>
        </b-card-body>
      </b-col>
      <b-col>
        <YamlContainer :yamlfile="yamlfile"/>
      </b-col>
    </b-row>
  </div>

</template>

<script>
import YamlContainer from './YamlContainer'

export default {
  name: 'Deployment',
  components: { YamlContainer },

  data () {
    return {
      form: {
        imagename: this.$store.state.imagename,
        deploymentname: this.$store.state.deploymentname,
        containername: this.$store.state.containername,
        targetPort: this.$store.state.containerport,
        namespace: this.$store.state.namespace,
        containerport: this.$store.state.containerport
      },
      options: ['', 'restriction to beuth network', 'cors-allow-origin'],
      tooltip: 'dasdas'
    }
  },

  computed: {
    jsonfile () {
      return {
        'kind': 'Deployment',
        'apiVersion': 'extensions/v1beta1',
        'metadata': {
          'name': this.form.deploymentname,
          'namespace': this.form.namespace,
          'labels': {
            'app': this.form.deploymentname
          }
        },
        'spec': {
          'replicas': 1,
          'selector': {
            'matchLabels': {
              'app': this.form.deploymentname
            }
          },
          'template': {
            'metadata': {
              'labels': {
                'app': this.form.deploymentname
              }
            },
            'spec': {
              'containers': [
                {
                  'name': this.form.containername,
                  'image': this.form.imagename,
                  'ports': [
                    {
                      'name': 'client-port',
                      'containerPort': this.form.containerport,
                      'protocol': 'TCP'
                    }
                  ]
                }
              ],
              'imagePullSecrets': [
                {
                  'name': 'private-registry-auth'
                }
              ],
              'schedulerName': 'default-scheduler'
            }
          }
        }
      }
    },
    yamlfile () {
      let string
      string = 'kind: Deployment\napiVersion: extensions/v1beta1\nmetadata:\n  name: ' + this.form.deploymentname + '\n  namespace: ' + this.form.namespace + '\n  labels:\n    app: ' + this.form.deploymentname + '\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: ' + this.form.deploymentname + '\n  template:\n    metadata:\n      labels:\n        app: ' + this.form.deploymentname + '\n    spec:\n      containers:\n      - name: ' + this.form.containername + '\n        image: ' + this.form.imagename + '\n        ports:\n        - name: client-port\n          containerPort: ' + this.form.containerport + '\n          protocol: TCP\n      imagePullSecrets:\n      - name: private-registry-auth\n      schedulerName: default-scheduler\n'
      return string
    }
  },
  methods: {
    openService () {
      this.$store.commit('setAppName', this.form.deploymentname)
      this.$store.commit('setTargetPort', this.form.containerport)
      this.$store.commit('setContainerPort', this.form.containerport)
      this.$store.commit('setContainerName', this.form.containername)
      this.$store.commit('setNamespace', this.form.namespace)
      this.$store.commit('setImageName', this.form.imagename)
      this.$router.push({ name: 'Service' })
    }
  }
}
</script>

<style scoped>
  .main {
    padding: 0vw 3vw 0vw 3vw;
  }

</style>
