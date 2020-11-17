<template>
  <v-card>
    <v-card-text>
      <pre>{{ yamlfile }}</pre>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'YamlContainer',

  props: ['yamlfile']
}
</script>

<style scoped>

</style>
