import axios from "axios";

export default {
    state: {
        dayWeather: {},
    },
    mutations: {
        SET_DAYWEATHER(state, payload) {
            state.dayWeather = payload
        },
        
    },
    actions: {
        SET_DAYWEATHER ({commit}, payload) {
            commit('SET_DAYWEATHER', payload)
        },
        GET_DAYWEATHER_FROM_API({commit}, obj) {
            return axios(`https://api.openweathermap.org/data/2.5/weather?lat=${obj.lat}&lon=${obj.lon}&units=metric&appid=04326dad12753de68c09cafdec856895`, {
                method: "GET"
            }).then((response) => {
                commit('SET_DAYWEATHER', response.data)
                return response.data
            }).catch((error) => {
                console.log(error)
                return error
            })
        }
    },
    getters: {
        DAYWEATHER (state) {
            return state.dayWeather
        },
    },
    modules: {
    }
}