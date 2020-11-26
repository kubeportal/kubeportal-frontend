<template>
      <v-card>
        <v-card-title>
          <v-row>
            <v-col lg="8">
                Hello: {{ this.current_user_firstname }} !
              </v-col>
              <v-spacer></v-spacer>
              <v-col lg=1>
                <v-icon class="icon" @click="switch_dark_mode">mdi-brightness-6 </v-icon>
              </v-col>
          </v-row>
        </v-card-title>
        <WebAppContainer />
      </v-card>
</template>

<script>
import WebAppContainer from '../components/WebAppContainer'

export default {
  name: 'Welcome',
  components: { WebAppContainer },
  data () {
    return {
      current_user_firstname: this.$store.getters['users/get_user_firstname']
    }
  },
  methods: {

    async request_cluster_infos () {
      let cluster_info = this.$store.getters['statistics/get_cluster_info']
      if(cluster_info.length === 0) {
        let cluster_infos = this.$store.getters['statistics/get_cluster_request_info']
        this.$store.dispatch('statistics/request_cluster_infos', cluster_infos)
      }
    },
    async request_webapps () {
      let apps = this.$store.getters['users/get_user_webapps']

      if (apps.length === 0) {
        this.$store.dispatch('users/request_user_webapps')
      }
    },
    async switch_dark_mode () {
      let tmp = await this.$store.dispatch('users/switch_dark_mode')
      console.log(tmp)
      this.$vuetify.theme.dark = tmp
    }
  },
  mounted () {
    this.request_cluster_infos()
    this.request_webapps()
  }
}
</script>

<style scoped lang="scss">
  p {
    color: black !important
  }
  .wrapper {
    height: auto !important;
  }

</style>
