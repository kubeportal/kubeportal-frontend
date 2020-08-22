<template>
  <b-card-body>
    <b-card-text>
      <b-card>
          <pre>{{ yamlfile }}</pre>
      </b-card>
    </b-card-text>
  </b-card-body>
</template>

<script>
export default {
  name: 'YamlContainer',

  props: ['yamlfile']
}
</script>

<style scoped>
  .btn {
    color: white;
    width: 120px;
    margin-bottom: 2vw;
  }
  .btn:hover {
    color: white;
    text-decoration: none;
    background-color: #343a40;
  }
  .mr-2 {
    height: 17px;
  }
</style>
