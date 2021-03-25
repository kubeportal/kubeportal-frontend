<template>
  <div>
    <TopBar :title="tab.name"/>
    <v-card>
      <v-card-text> current namespace: {{ namespace }}</v-card-text>
      <component :is="tab.component"/>
    </v-card>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
export default {
  name: 'Node',
  props: ['tab'],
  components: { TopBar },
  computed: {
  namespace () {
    return this.$store.getters['users/get_user']['namespace_names'].join(', ')
  },
}
}
</script>

<style>

</style>
