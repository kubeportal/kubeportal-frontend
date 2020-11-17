<template>
  <div>
    <RequestSpinner v-if="webapps.length === 0"/>
    <div class="my-4 container" v-else>
      <v-btn v-for="app in webapps" :key="app.index" color="#689F38" x-large class="app-button">
        {{ app.link_name }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import RequestSpinner from './RequestSpinner'

export default {
  name: 'WebAppContainer',
  components: { RequestSpinner },
  computed: {
    webapps () {
      return this.$store.getters['users/get_user_webapps']
    }
  }
}
</script>

<style scoped lang="scss">
  .app-button {
    margin: 2vw 2vw 0vw 0vw;
    width: 30%;
    color: white;
    transition: 0.3s ease;
    opacity: 0.8;
  }
  .app-button:hover {
    opacity: 1;
    transform: scale(1.04);
  }
</style>
