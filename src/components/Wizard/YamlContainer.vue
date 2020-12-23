<template>
  <v-card class="wizard_card">
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
.wizard_card {
  height: 100%;
  margin-left: 2em;
}
</style>
