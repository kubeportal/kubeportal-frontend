<template>
  <div>
      <v-subheader>
        {{display_message()}}
      </v-subheader>
      <v-card class="my-4">
          <v-card-title>
              Supervisor
          </v-card-title>
          <v-form @submit="send_request">
            <RequestSpinner v-if="supervisors.length === 0"/>
            <v-container v-else>
              <v-checkbox v-for="(supervisor, i) in supervisors" color="green" :key=i :label="supervisor" :value="supervisor" v-model="selected"></v-checkbox>
              <v-row>
                <v-spacer/>
                <v-col sm="2">
                  <v-btn type="submit" class="btn" color="#689F38">send request</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
      </v-card>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import RequestSpinner from '@/components/RequestSpinner'
export default {
  name: 'RequestAccess',
  components: { TopBar, RequestSpinner },
  data () {
    return {
      selected: [],
      NEW: 'not requested',
      ACCESS_REQUESTED: 'requested',
      ACCESS_REJECTED: 'rejected',
      ACCESS_APPROVED: 'approved'
    }
  },
  computed: {

    supervisors () {
      return this.get_supervisors()
    },
    current_user () {
      return this.$store.getters['users/get_user']
    }
  },
  methods: {
    display_message () {
      switch (this.current_user['state']) {
        case this.NEW: return 'You can send an access request to an administrator of your choice:'
        case this.ACCESS_REQUESTED: return 'Your request for cluster access was already sent to the administrators.\nIf needed, you can re-send an access request to an administrator of your choice:'
        case this.ACCESS_REJECTED: return 'Sorry, you have no access to the cluster.'
      }
    },
    get_supervisors () {
      //TODO: read api
      return ['troeger', 'sachs', 'xyz']
    },
    send_request (e) {
      e.preventDefault()
      if (this.selected.length) {
        console.log(this.selected)
      }
    }
  },
  mounted () {
    this.$store.dispatch('users/request_user')
  }
}
</script>

<style lang="scss" scoped>
  .btn {
    color: floralwhite;
  }

</style>
