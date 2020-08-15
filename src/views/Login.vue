<template>
    <b-card bg-variant="light" class="w-25 mt-16 logincard">
      <b-card-header>
        <v-icon class="icon" left>mdi-login-variant</v-icon>
        Kubeportal
      </b-card-header>
      <b-card-body>
      <b-card-text>
        <v-text-field label="user name" v-model="username" required></v-text-field>
        <v-text-field type="password" v-model="password" label="password" requires></v-text-field>
      </b-card-text>
        <div class="row">
          <b-button class="signin" @click="login">
            <v-icon class="icon" left></v-icon>
            Sign In
          </b-button>
        </div>
        <div class="row"><p class="my-4 text">or</p></div>
        <div class="row">
        <b-button v-google-signin-button="clientId" class="signin google-signin-button">
          <v-icon class="icon" left>mdi-google</v-icon>
          Continue with Google
        </b-button>
        </div>
        <div v-if="!login_status">Login failed</div>
      </b-card-body>
    </b-card>
</template>

<script>
import GoogleSignInButton from 'vue-google-signin-button-directive'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login () {
      const request_body = { username: this.username, password: this.password }
      const response = await this.$store.dispatch('post_login_data', request_body)
      if(response === undefined) {
        this.$store.commit('set_login_status', false)
        this.$router.push({ name: 'Login' })
      } else {
        await this.set_user_data()
        this.$router.push({ name: 'Kubeportal' })
      }
    },
    async set_user_data () {
      await this.$store.dispatch('get_current_user', this.username)
    }
  },
  computed: {
    login_status () {
      return this.$store.getters['get_login_status']
    }
  }

}
</script>

<style scoped lang="scss">
  .logincard {
    margin: auto
  }
  .signin {
    width: 75%;
    color: floralwhite;
    background-color: #757575;
    margin: auto;
  }
  .text {
    margin: auto;
  }
  .card-header {
    margin-bottom: 1vh;
  }
</style>
