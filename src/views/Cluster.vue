<template>
    <v-card outlined>
      <v-card-title>Cluster</v-card-title>
      <v-card-text>
      </v-card-text>
    </v-card>
</template>

<script>

export default {
  name: 'Cluster',
  data () {
    return {
      current_user: this.$store.getters['users/get_user_details']
    }
  }
}
</script>

<style scoped lang="scss">
</style>
