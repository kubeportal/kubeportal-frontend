<template>
  <b-card class="maincard">
    <b-card-header>
      Cluster Statistics
    </b-card-header>
    <RequestSpinner v-if="all_statistics.length === 0" />
    <div v-else>
      <v-simple-table fixed-header>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="first text-left">Name</th>
              <th class="second text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in all_statistics" :key="item.index">
              <td>{{ Object.keys(item)[0] }}</td>
              <td>{{ Object.values(item)[0] }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </b-card>
</template>

<script>
import RequestSpinner from '../components/RequestSpinner'
export default {
  name: 'Statistics',
  components: { RequestSpinner },
  computed: {
    all_statistics () {
      return this.$store.getters['statistics/get_cluster_info']
    }
  },
  methods: {
    request_cluster_infos () {
      let cluster_infos = this.$store.getters['statistics/get_cluster_request_info']
      this.$store.dispatch('statistics/request_cluster_infos', cluster_infos)
    }
  }
}
</script>

<style scoped lang="scss">
.first {
  width: 30rem;
}
.wrapper {
  height: 70vh !important;
}
</style>
