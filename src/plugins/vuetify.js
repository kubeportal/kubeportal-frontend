import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import store from '../store'

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#424242',
        secondary: '#b0bec5',
        anchor: '#8c9eff',
        pre_color: '#000000'
      },
      dark: {
        primary: '#36392e',
        secondary: '#606357',
        pre_color: '#ffffff'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
Vue.use(Vuetify)

export default vuetify
