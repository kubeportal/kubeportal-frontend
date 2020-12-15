<template>
  <div>
    <RequestSpinner v-if="webapps.length === 0" />
    <div class="my-4" v-else>
      <v-row class="p-3">
        <v-hover v-for="app in webapps" :key="app.index" v-slot="{ hover }">
          <v-col lg="3">
            <div class="app" :class="{ 'on-hover': hover }" @click="open_link(app.link_url)">
              <v-card class="app-icon" :elevation="hover ? 12 : 2">
                <v-card-text class="app-icon-text">
                  <v-icon large >mdi-view-quilt</v-icon>
                </v-card-text>
              </v-card>

              <v-card class="app-text" :elevation="hover ? 12 : 2">
                <v-card-text class="text-md-h5">
                  {{ app.link_name }}
                  <!-- {{ app.link_url }} -->
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-hover>
      </v-row>
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
  },
  methods: {
    open_link (link) {
      window.open(link, '_blank')
    }
  }
}
</script>

<style scoped lang="scss">

.app {
  width: 20vw;
  height: 12vh;
  position: relative;
  text-align: center;
  margin-top: 2vh;
}

.app-icon {
  position: absolute;
  // background-color: green;
  z-index: 1;
  left: 5%;
  bottom: 70%;
}

.app-icon-text{
  padding: 5px;
}

.app-text{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1rem !important;
  color: black
}

.v-card.on-hover.theme--dark{
  background-color: rgba(#FFF, 0.8);
  .v-card__text{
    color: #000
  }
}
</style>
