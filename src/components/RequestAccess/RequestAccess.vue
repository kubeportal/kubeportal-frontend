<template>
  <div>
      <v-subheader>
        You can send an access request to an administrator of your choice:
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
      selected: []
    }
  },
  computed: {
    supervisors () {
      return this.get_supervisors()
    }
  },
  methods: {
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
  }
}
</script>

<style lang="scss" scoped>
  .btn {
    color: floralwhite;
  }

</style>
