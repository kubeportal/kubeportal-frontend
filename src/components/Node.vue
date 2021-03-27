<template>
  <div class="node">
    <TopBar :title="tab.name"/>
    <div>
      <v-card-text> current namespace: {{ namespace }}</v-card-text>
      <component :is="tab.component"/>
    </div>
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
    }
  }
}
</script>

<style scoped>
.node {
  opacity: 1 !important;
}

</style>
