<template>
  <div class="logs" id="logDiv" ref="logs">
    <div
      v-for="(log, index) in logs"
      :key="index"
    >
      {{ log.log }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logs',
  props: ['logs'],
  mounted () {
    this.$refs.logs.scrollTop = this.$refs.logs.scrollHeight
  }
}
</script>

<style scoped>
.logs {
  width: 100%;
  height: 60vh;
  overflow-y: scroll;
  background-color: black;
  color: white;
}
</style>
