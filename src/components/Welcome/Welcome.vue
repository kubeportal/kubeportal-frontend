<template>
  <div>
    <v-card>
      <WebAppContainer />
    </v-card>
    <v-card class="mt-7">
      <v-card-title> NEWS </v-card-title>
      <v-list>
        <v-list-item v-for="(item, index) in news" :key="index">
          <v-list-item-content>
            <v-row>
              <v-col sm=8>
                <v-icon v-if="item.importance > 0" color="red">mdi-alert-box-outline</v-icon>
                {{ item.content }}
              </v-col>
              <v-spacer></v-spacer>
              <v-col sm=2>
                {{item.by}}
                {{item.date}}
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import WebAppContainer from './WebAppContainer'
import TopBar from '@/components/TopBar'

export default {
  name: 'Welcome',
  components: { WebAppContainer, TopBar },
  computed: {
    news () {
      return [{
        by: 'troeger',
        content: 'I like frontend',
        importance: 1, //0, 1, 2?,
        date: '15.12.2020'
      }, {
        by: 'xyz',
        content: 'update on 20.12',
        importance: 0,
        date: '15.12.2020'
      }]
    }
  },
  methods: {
    async request_webapps () {
      let apps = this.$store.getters['users/get_user_webapps']

      if (apps.length === 0) {
        this.$store.dispatch('users/request_user_webapps')
      }
    }
  },
  mounted () {
    this.request_webapps()
  }
}
</script>

<style scoped lang="scss">

p {
  color: black !important;
}
.wrapper {
  height: auto !important;
}
</style>
