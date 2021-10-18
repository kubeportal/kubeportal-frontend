<template>
  <div class="logs">
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
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    console.log('logs', this.logs)
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
