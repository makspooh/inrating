import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Surname', value: 'surname' },
          { text: 'Phone', value: 'phone' },
          { text: 'Email', value: 'email' }
        ]
    }
})