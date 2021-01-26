<template>
  <v-card class="p-4">
    <v-form @submit="user_form">
      <v-row>
        <v-col>First Name</v-col>
        <v-col>{{ current_user["firstname"] }}</v-col>
      </v-row>
      <v-row>
        <v-col>Last Name</v-col>
        <v-col>{{ current_user["name"] }}</v-col>
      </v-row>
      <v-row>
        <v-col>User Groups</v-col>
        <v-col>
          <span v-for="group in user_groups" :key="group.name">
            {{ group.name }} |
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          Primary eMail
          <!-- {{ current_user }} -->
          <!-- {{ user_groups }} -->
        </v-col>
        <v-col>
          <v-select
            class="w-75"
            dense
            solo
            :items="current_user['all_emails']"
            :label="current_user['primary_email']"
            v-model="selected_email"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col> Namespaces shown </v-col>
        <v-col>
          <!-- <v-checkbox v-for="(namespace, i) in [current_user['k8s_namespace']]" color="green" :key=i :label="namespace" :value="namespace" v-model="selected_namespace"></v-checkbox> -->
          <!-- TODO -->
          <!-- Instead use: -->
          <!-- https://vuetifyjs.com/en/components/selects/#selection -->
          <v-select
            v-model="selected_namespace"
            :items="[current_user['k8s_namespace']]"
            :menu-props="{ maxHeight: '400' }"
            multiple
            persistent-hint
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer />
        <v-col sm="1">
          <v-btn class="btn" color="#9f3838" @click="cancel"
            >cancel</v-btn
          ></v-col
        >
        <v-col sm="1">
          <v-btn class="btn" color="#689F38" type="submit">save</v-btn></v-col
        >
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      selected_namespace: [],
      selected_email: ''
    }
  },
  computed: {
    current_user () { return this.$store.getters['users/get_user_details'] },
    user_groups () { return this.$store.getters['users/get_user_groups'] }
  },
  methods: {
    cancel () {
      this.$router.push({ name: 'Kubeportal' })
    },
    user_form (e) {
      e.preventDefault()
      console.log(this.selected_namespace)
      console.log(this.selected_email)
    }
  }
}
</script>

<style>
</style>
