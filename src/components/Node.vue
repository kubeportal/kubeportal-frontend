<template>
  <div>
    <TopBar :title="tab.name"/>
    <div class="m-8">
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
      return this.$store.getters['users/get_current_namespace']
    }
  }
}
</script>

<style scoped>

</style>
