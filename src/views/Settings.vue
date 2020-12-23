<template>
  <v-container>
    <TopBar title="Settings" />
    <v-card>
      <v-tabs fixed-tabs>
        <v-tab>
          <v-icon>mdi-account-details</v-icon>
          Details
        </v-tab>
        <v-tab>
          <v-icon>mdi-kubernetes</v-icon>
          Kubernetes
        </v-tab>

        <v-tab-item>
          <v-card class="p-5">
            <v-form @submit="user_form">
              <v-row>
                <v-col>First Name</v-col>
                <v-col>{{ current_user['firstname'] }}</v-col>
              </v-row>
              <v-row>
                <v-col>
                  Primary eMail
                  <!-- {{current_user}} -->
                  <!-- {{user_groups}} -->
                </v-col>
                <v-col>
                  <v-select
                    class="w-75"
                    dense
                    :items="current_user['all_emails']"
                    :label="current_user['primary_email']"
                    :v-model="selected_email"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  Namespaces shown
                </v-col>
                <v-col>
                  <!-- Instead use: -->
                  <!-- https://vuetifyjs.com/en/components/selects/#selection -->
                  <v-checkbox v-for="(namespace, i) in [current_user['k8s_namespace']]" color="green" :key=i :label="namespace" :value="namespace" v-model="selected_namespace"></v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-spacer/>
                <v-col sm=1> <v-btn class="btn" color="#9f3838" @click="cancel">cancel</v-btn></v-col>
                <v-col sm=1> <v-btn class="btn" color="#689F38" type="submit">save</v-btn></v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col lg=6>
              <v-card class="h-100">
                <v-card-title>
                  <v-row>
                    <v-col lg=3>
                      Config file
                    </v-col>
                    <v-spacer/>
                    <v-col lg=1 @click="download">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn type="button"
                            icon
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>
                              mdi-download
                            </v-icon>
                          </v-btn>
                        </template>
                        <span>download config.yml</span>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-text>
                  <v-hover v-slot="{ hover }">
                    <div>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn type="button"
                            class="clipboard-btn"
                            icon
                            :class="{ 'on-hover': !hover }"
                            v-clipboard:copy="config_file"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>
                              mdi-clipboard-multiple-outline
                            </v-icon>
                          </v-btn>
                        </template>
                        <span>Copy to clipboard</span>
                      </v-tooltip>
                      <pre>
                        {{ config_file }}
                      </pre>
                    </div>
                  </v-hover>
                  <div class="alerts">
                        <v-alert v-if="success"
                          dense
                          type="success"
                        >
                        Copied to clipboard!
                        </v-alert>
                        <v-alert v-if="error"
                          dense
                          type="error"
                        >
                        Something went wrong!
                        </v-alert>
                      </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col lg=6>
              <!-- {{current_user}} -->
              <KubeInstallation/>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import TopBar from '@/components/TopBar'
import KubeInstallation from '@/components/KubeConfig/KubeInstallation'

export default {
  name: 'Settings',
  components: { TopBar, KubeInstallation },
  data () {
    return {
      selected_namespace: [],
      selected_email: '',
      success: false,
      error: false
    }
  },
  computed: {
    current_user () { return this.$store.getters['users/get_user_details'] },
    user_groups () { return this.$store.getters['users/get_user_groups'] },
    config_file () {
      return `
apiVersion: v1
clusters:
- cluster:
    insecure-skip-tls-verify: true
    server: https://datexis-master2.beuth-hochschule.de:6443
  name: data_science_cluster
contexts:
- context:
    cluster: data_science_cluster
    namespace: ${this.current_user['k8s_namespace']}
    user: s80066
  name: s80066
current-context: s80066
kind: Config
preferences: {}
users:
- name: ${this.current_user['username']}
  user:
    token: ${this.current_user['k8s_token']}`
    }
  },
  methods: {
    download () {
      const element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.config_file))
      element.setAttribute('download', 'config.yml')
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    },
    cancel () {
      this.$router.push({ name: 'Kubeportal' })
    },
    user_form (e) {
      e.preventDefault()
      console.log(this.selected_namespace)
      console.log(this.selected_email)
      console.log(this.current_user['primary_email'])
    },
    onCopy () {
      this.success = true
      setTimeout(() => {
        this.success = false
      }, 1000)
    },
    onError () {
      console.log('error')
      this.error = true
      setTimeout(() => {
        this.error = false
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
  .alerts{
    position: absolute;
  }

  .clipboard-btn{
    position: absolute;
    right: 1%;
  }
  .on-hover{
    display: none;
  }
  .btn {
    color: floralwhite;
  }
  .icon {
    color: white;
  }

  .button {
    background-color: #689F38 !important;
    color: white;
  }

</style>
