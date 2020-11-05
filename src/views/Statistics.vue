<template>
  <b-card class="maincard">
    <b-card-header>
      Cluster Statistics
    </b-card-header>
    <div class="text-center" v-if="!is_loaded">
            <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
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

export default {
  name: 'Statistics',
  computed: {
    is_loaded () {
      return this.$store.getters['statistics/get_is_loaded']
    },
    all_statistics () {
      return this.$store.getters['statistics/get_cluster_info']
    }
  }/*,
  created () {
    console.log(this.is_loaded)
  },
  mounted () {
    console.log(this.is_loaded)
  }*/
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
