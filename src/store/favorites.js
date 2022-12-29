
export default {
    state: {
        favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    },
    mutations: {
        SET_FAVORITES(state, payload) {
            state.favorites.push(payload)

            localStorage.setItem('favorites', JSON.stringify(state.favorites))
        },
        REMOVE_FAVORITES (state, payload) {
            const index = state.favorites.findIndex(item => item.idx === payload);
            state.favorites.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(state.favorites))
        }  
    },
    actions: {
        SET_FAVORITES ({commit}, payload) {
            commit('SET_FAVORITES', payload)
        },
        REMOVE_FAVORITES ({commit}, payload) {
            commit('REMOVE_FAVORITES', payload)
        }
    },
    getters: {
        FAVORITES (state) {
            return state.favorites
        },
    },
    modules: {
    }
}