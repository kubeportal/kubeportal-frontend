<template>
  <v-app >
    <v-main>
      <v-img class="background" src="./assets/mountain.jpg"
             gradient="to bottom left, rgba(18,18,18, .8), rgba(18, 18, 18, .3)">
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
    height: 100vh;
    width: auto;
    object-fit: cover;
  }
</style>
