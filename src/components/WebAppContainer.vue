<template>
  <div>
    <RequestSpinner v-if="!loaded"/>
    <div class="my-4 container-sm" v-else>
      <b-button v-for="app in webapps" :key="app.index" class="app-button">
        {{ app.link_name }}
      </b-button>
    </div>
  </div>
</template>

<script>
import RequestSpinner from './RequestSpinner'

export default {
  name: 'WebAppContainer',
  components: { RequestSpinner },
  computed: {
    loaded () {
      return this.$store.getters['users/get_webapps_loaded']
    },
    webapps () {
      return this.$store.getters['users/get_user_webapps']
    }
  }
}
</script>

<style scoped lang="scss">
  .app-button {
    margin: 2vw 2vw 0vw 0vw;
    width: 20%;
    min-width: 110px;
    height: 8vh;
    color: white;
    transition: 0.3s ease;
    opacity: 0.8;
    transform: translate(0, 0);
    -ms-transform: translate(0, 0%);
    background-color: #689F38;
    border-color: #689F38;
  }
  .app-button:hover {
    opacity: 1;
    transform: scale(1.04);
  }
</style>
