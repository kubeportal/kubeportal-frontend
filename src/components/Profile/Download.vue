<template>
  <div>
    <v-row>
      <v-col md="3">
        <div>
          <v-icon class="icon" left>mdi-download</v-icon>
          <a><b>kubectl config</b></a>
        </div>
      </v-col>
      <v-col md="7">
        <p class="content">{{ download_info }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="3">
        <v-icon class="icon" left>mdi-download-outline</v-icon>
        <a><b>test installation</b></a>
      </v-col>
      <v-col md=7>
        <p class="content">{{ test_installation }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'Download',
  data () {
    return {
      download_info: 'this configuration file is needed for Kubernetes client tools on your computer.\n' +
        'It contains your personal access token.',
      test_installation: 'You can test your installation by calling kubectl cluster-info.'
    }
  }
}

</script>

<style scoped lang="scss">
  .content {
    max-width: 80%;
  }
  .btn {
    background-color: darkgray;
    padding-right: 1vw
  }
  .btn:hover{
     color: whitesmoke;
  }
  .icon {
    margin-right: 1vw;
  }

</style>
