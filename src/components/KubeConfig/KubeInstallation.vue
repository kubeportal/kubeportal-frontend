<template>
  <v-card>
    <v-card-title>Using Kubectl</v-card-title>
      <v-card-text>
        <Download />
        <v-divider></v-divider>
        <div>
          <v-expansion-panels>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-icon left>mdi-apple</v-icon>
                <v-icon left>mdi-linux</v-icon>
                MacOS/ Linux
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <OSInstallation :instructions="macUnix" />
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-icon>mdi-microsoft-windows</v-icon>
                Windows
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <OSInstallation :instructions="windows" />
              </v-expansion-panel-content>
            </v-expansion-panel>

          </v-expansion-panels>
        </div>
      </v-card-text>
  </v-card>
</template>

<script>
import OSInstallation from './OSInstallation'
import KubeConfig from '@/components/KubeConfig/KubeConfig'
import Download from '@/components/Profile/Download'
import { showAt } from 'vue-breakpoints'

export default {
  name: 'KubeInstallation',
  components: { OSInstallation, KubeConfig, Download, showAt },

  data () {
    return {
      windows: ['Install kubectl for Windows', 'Navigate to your home directory: cd %USERPROFILE%', 'Create the .kube directory: mkdir .kube', 'Store the config file as .kube/config'],
      macUnix: ['Install kubectl with your package manager', 'Navigate to your home directory: cd ~', 'Create the .kube directory: mkdir .kube', 'Store the config file as .kube/config']
    }
  }
}

</script>

<style scoped lang="scss">
  .accordion{
    width: 60vw;
    margin: 0 auto;
    //$expansion-panel-border-radius: 0px !important
    //https://vuetifyjs.com/en/api/v-expansion-panel/#sass-variables
  }

</style>
