import axios from "axios";

export default {
    state: {
        favorites: [],
    },
    mutations: {
        SET_FAVORITES(state, payload) {
            state.favorites.push(payload)
        },  
    },
    actions: {
        SET_FAVORITES ({commit}, payload) {
            commit('SET_FAVORITES', payload)
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