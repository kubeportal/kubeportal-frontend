<template>
  <div>
    <v-row>
      <v-col lg="3">
        <v-card class="profile">
          <v-card-title>
            <v-row>
              <v-col md="2">
                <EditModal/>
              </v-col>
              <v-col md=10>
                <v-icon class="icon">mdi-account</v-icon>Profile
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text class="profile_body">
            <v-card-subtitle>Firstname</v-card-subtitle>
            <v-card-text>{{ current_user['firstname'] }}</v-card-text>
            <v-card-subtitle>Last name</v-card-subtitle>
            <v-card-text>{{ current_user['name'] }}</v-card-text>
            <v-card-subtitle>Primary Email</v-card-subtitle>
            <v-card-text> {{ current_user['primary_email'] }}</v-card-text>
            <v-card-subtitle>User groups</v-card-subtitle>
            <v-card-text>{{ user_groups['name'] }}</v-card-text>
            <v-card-subtitle>Cluster access</v-card-subtitle>
            <v-card-text>{{ current_user['cluster_access'] }}</v-card-text>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="8">
        <KubeInstallation class="installation" />
      </v-col>
    </v-row>
  </div>
</template>

<script>

import ContentCardHeader from '@/components/ContentCardHeader'
import KubeConfig from '@/components/KubeConfig/KubeConfig'
import KubeInstallation from '@/components/KubeConfig/KubeInstallation'
import EditModal from '@/components/Profile/EditModal'

export default {
  name: 'Profile',
  components: { KubeInstallation, ContentCardHeader, KubeConfig, EditModal },
  data () {
    return {
      primary_email: this.$store.getters['users/get_user_details']['primary_email']
    }
  },
  computed: {
    current_user () { return this.$store.getters['users/get_user_details'] },
    user_groups () { return this.$store.getters['users/get_user_groups'] }
  },
  methods: {
    change_primary_email (email) {
      console.log('click')
      this.primary_email = email
    }
  }
}
</script>

<style>
  .profile {
    background: rgba(255, 255, 255, 1);
    min-width: 180px;
    height: 100%;
  }
  p, .v-card__subtitle {
    color: black !important;
  }
  .profile_body {
    margin-top: 3vh;
    min-width: 149px;
  }
  .installation {
    height: 100%
  }

  @media (max-device-width : 767px) {
    .row {
      max-width: 26rem;
    }
  }
  @media (max-device-width : 400px) {
    .row {
      max-width: 18rem;
    }
  }
</style>
