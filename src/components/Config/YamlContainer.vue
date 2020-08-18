<template>
  <b-card class="yaml-card">
    <b-card-header>Config</b-card-header>
    <b-card-body class="yaml-body">
      <b-card-text class="ma-1">
        <pre>{{ yamlfile }}</pre>
      </b-card-text>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'YamlContainer',
  props: ['yamlfile']
}
</script>

<style scoped lang="scss">
  div.card {
    min-width: 300px;
    max-width: 100%
  }
  .yaml-card {
    width: 40vw;
  }
  .yaml-body {
    width: 37vw;
  }

  @media (max-device-width: 1719px) {

    .yaml-card {
      width: 86vw
    }
    .yaml-body {
      width: 60vw;
    }
  }

</style>
