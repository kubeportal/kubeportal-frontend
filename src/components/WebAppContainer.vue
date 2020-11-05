<template>
  <div>
    <div class="text-center" v-if="!loaded">
        <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div class="my-4 container-sm" v-else>
      <b-button v-for="app in webapps" :key="app.index" class="app-button">
        {{ app.link_name }}
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WebAppContainer',
  data(){
    return{
      loaded: false,
      webapps: []
    }
  },
  methods: {
    get_webapps: function () {
      this.webapps = this.$store.getters['users/get_user_webapps']
      this.loaded = true
    }
  },
  created () {
    
  },
  mounted () {
    this.$store.dispatch('users/get_user_webapps')
    this.get_webapps()
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
