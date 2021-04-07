<template>
  <v-app >
    <v-main>
      <v-img class="background" src="./assets/mountain.jpg">
        <router-view />
      </v-img>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style scoped lang="scss">
  .icon, .v-icon.icon {
    position: absolute;
    left: 15px;
    color: floralwhite;
  }
  .toolbar {
    color: floralwhite;
  }
  .title {
    padding: 0 1rem 0 3rem;
    color: floralwhite;
  }
  .background {
    height: auto;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
