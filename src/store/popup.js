
export default {
    state: {
        status: false
    },
    mutations: {
        CHANGE_POPUP(state, payload) {
            state.status = payload
        }
    },
    actions: {
        CHANGE_POPUP({commit}, payload) {
            commit('CHANGE_POPUP', payload)
        }
    },
    getters: {
        POPUP(state) {
            return state.status
        },
    },
    modules: {
    }
}