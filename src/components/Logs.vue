<template>
  <div class="logs">
    <div
      v-for="(log, index) in logs"
      :key="index"
    >
      {{ log }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logs',
  props: ['logs'],
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.logs {
  width: 100%;
  height: 80vh;
  overflow-y: scroll;
  background-color: black;
  color: white;
}
</style>
