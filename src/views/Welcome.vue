<template>
      <b-card bg-variant="light" class="maincard">
        <b-card-header>
          Hello: {{ this.current_user_firstname }} !
        </b-card-header>
        <WebAppContainer />
      </b-card>
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
