<template>
  <b-card class="maincard">
    <v-tabs >
      <v-tab @click="openDeployment">
        <v-icon class="icon" left>mdi-hexagon-multiple-outline</v-icon>
          <div class="title"><small>Deployment</small></div>
      </v-tab>
      <v-tab @click="openService">
        <v-icon class="icon" left>mdi-transit-connection-horizontal</v-icon>
          <div class="title"><small>Service</small></div>
      </v-tab>
      <v-tab @click="openIngress">
        <v-icon class="icon" left>mdi-arrow-decision-outline</v-icon>
          <div class="title"><small>Ingress</small></div>
      </v-tab>

      <v-tab-item class="items">
        <v-card flat>
          <v-card-text>
            <Deployment />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item class="items">
        <v-card flat>
          <v-card-text>
            <Service />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item class="items">
        <v-card flat>
          <v-card-text>
            <Ingress ref="Ingress" />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </b-card>
</template>

<script>
import Deployment from './Deployment'
import Service from './Service'
import Ingress from './Ingress'

export default {
  name: 'Generator',
  components: { Deployment, Service, Ingress }

}
</script>

<style scoped lang="scss">

</style>
