<template>
  <v-toolbar flat>
    <v-toolbar-title>{{title}}</v-toolbar-title>
    <v-spacer/>
    <div class="text-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            icon
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list flat>
          <v-subheader>Signed in as: {{user_firstname}}</v-subheader>

          <v-list-item @click="push_route('Kubeportal')">
              <v-list-item-icon>
                <v-icon>mdi-view-dashboard-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <!-- <v-switch></v-switch> -->
                <v-list-item-title>Dashboard</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          <v-list-item-group>
            <v-list-item @click="push_route('Settings')">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item @click="switch_dark_mode">
              <v-list-item-icon>
                <v-icon>mdi-brightness-6</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <!-- <v-switch></v-switch> -->
                <v-list-item-title>Darkmode</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item @click="push_route('Info')">
              <v-list-item-icon>
                <v-icon>mdi-information-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Info</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </v-list-item-group>
        </v-list>
      </v-menu>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  name: 'TopBar',
  props: ['title'],
  data () {
    return {
      user_firstname: this.$store.getters['users/get_user_firstname']
    }
  },
  methods: {
    async switch_dark_mode () {
      this.$vuetify.theme.dark = await this.$store.dispatch('users/switch_dark_mode')
    },
    logout () {
      this.$store.commit('users/set_user_id', null)
      this.$store.commit('users/set_user_firstname', '')
      this.$store.commit('users/set_is_authenticated', '')
      this.$store.commit('users/set_user_details', {})
      this.$store.commit('users/set_user_webapps', [])
      this.$store.commit('infos/set_cluster_info', [])
      this.$store.commit('api/set_csrf_token', '')
      this.$store.commit('api/set_access_token', '')

      this.$router.push({ name: 'Home' })
    },
    push_route (name) {
      if (this.$route.name !== name) {
        this.$router.push({ name: name })
      }
    }
  }
}
</script>

<style>

</style>