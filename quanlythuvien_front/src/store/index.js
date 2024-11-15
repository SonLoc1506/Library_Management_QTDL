import { createStore } from 'vuex'
// Create a new store instance.
import createPersistedState from 'vuex-persistedstate';
const store = createStore({
  state() {
    return {
      // session_user: null,
      session_admin: null
    }
  },
  mutations: {
    // setSessionUser(state, user) {
    //   state.session_user = user;
    // },
    // setSessionAdmin(state, admin) {
    //   state.session_admin = admin;
    // },
    setSessionAdmin(state, token) {

      state.session_admin = token; // Lưu token vào state
    }
  },
  plugins: [createPersistedState()],
})

export default store;
