<template>
  <v-img content-class="vertical-img" src="../assets/mountain.jpeg">
    <v-tabs
      :vertical="desktop"
      class="sidenav"
      background-color="rgba(0, 0, 0, .5)"
      dark
      active-class="activeTab"
      show-arrows
    >
    <div v-if="desktop">
      <div class="logo text-center" @click="go_to_dashboard">
        <div class="d-inline-flex flex-wrap justify-center mt-4">
          <v-icon class="vertical-icon mr-4">mdi-view-dashboard-variant</v-icon>
          <div class="title">
            <small>{{ cluster_branding }}</small>
          </div>
        </div>
      </div>
      <v-container>
        <hr />
      </v-container>
    </div>
      <v-tab v-for="tab in filtered_tabs" :key="tab.name" class="tab">
        <v-row>
          <v-col v-if="desktop" sm="4">
            <v-icon class="vertical-icon">{{ tab.icon }}</v-icon>
          </v-col>
          <v-col sm="6">
            <div class="title">
              <small>{{ tab.name }}</small>
            </div>
          </v-col>
        </v-row>
      </v-tab>
      <v-tab-item
        v-for="(tab, index) in filtered_tabs"
        :key="tab.name + index"
        class="items"
      >
        <Node :tab="tab" />
      </v-tab-item>
    </v-tabs>
  </v-img>
</template>

<script>
import Node from './Node'

export default {
  name: 'Dashboard',
  components: { Node },
  data () {
    return {
      width: window.outerWidth
    }
  },
  methods: {
    go_to_dashboard () {
      if (this.$route.name !== 'Kubeportal') {
        this.$router.push({ name: 'Kubeportal' })
      }
    },
    resize (e) {
      this.width = e.currentTarget.outerWidth
    }
  },
  props: ['tabs'],
  computed: {
    filtered_tabs () {
      return this.tabs.filter(tab => tab.has_access)
    },
    cluster_branding () {
      return this.$store.getters['api/get_branding']
    },
    desktop () {
      return this.width > 900
    }
  },
  created () {
    this.$vuetify.theme.dark = this.$store.getters['users/get_dark_mode']
    window.addEventListener('resize', this.resize)
  },
  destroyed () {
    window.removeEventListener('resize', this.resize)
  }
}
</script>

<style lang="scss">
.vertical-icon {
  color: floralwhite;
}
.top-icon {
  width: 14px;
}

.sidenav {
  height: 100vh;
  left: -2px;
  top: -2px;
}

.activeTab {
  background: linear-gradient(to top right, #b3b3b3, #4d4d4d);
}
.tab {
  width: 15em;
}
.logo {
  padding-top: 0.25em;
  width: 85%;
  margin: 0 auto;
  cursor: pointer;
}

hr {
  background-color: rgba(240, 240, 240, 0.5);
}

.title {
  color: floralwhite;
  text-align: center;
}
.items {
  max-height: 100vh;
}
.vertical-img {
  width: 100%;
  height: 100%;
}
.v-window.v-item-group.theme--light.v-tabs-items {
  background-color: rgba(0, 0, 0, 0);
}

</style>
