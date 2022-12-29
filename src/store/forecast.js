import axios from "axios";

export default {
    state: {
        forecast: {},
    },
    mutations: {
        SET_FORECAST(state, payload) {
            state.forecast = payload
        },  
    },
    actions: {
        SET_FORECAST ({commit}, payload) {
            commit('SET_FORECAST', payload)
        },
        GET_FORECAST_FROM_API({commit}, obj) {
            return axios(`https://api.openweathermap.org/data/2.5/forecast?lat=${obj.lat}&units=metric&lon=${obj.lon}&appid=04326dad12753de68c09cafdec856895`, {
                method: "GET"
            }).then((response) => {
                commit('SET_FORECAST', response.data)
                return response.data
            }).catch((error) => {
                console.log(error)
                return error
            })
        }
    },
    getters: {
        FORECAST (state) {
            return state.forecast
        },
    },
    modules: {
    }
}