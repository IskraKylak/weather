
export default {
    state: {
        cardWeather: [ 
            {
                lat: '',
                lon: '',
                idx: 0
            }
        ],
    },
    mutations: {
        ADD_CARDWEATHER(state) {
            state.cardWeather.push({
                lat: '',
                lon: '',
                idx: Math.random().toString(16).slice(2)
            })
        },
        REMOVE_CARDWEATHER(state, payload) {
            if(state.cardWeather.length !== 1) {
                console.log(payload)
                const index = state.cardWeather.findIndex(item => item.idx === payload);
                state.cardWeather.splice(index, 1);
            }
            
        },
        CHANGE_CARDWEATHER(state, payload) {
            const index = state.cardWeather.findIndex(item => item.idx === payload.idx);
            state.cardWeather[index].lat = payload.lat
            state.cardWeather[index].lon = payload.lon
            state.cardWeather[index].idx = Math.random().toString(16).slice(2)
        }
    },
    actions: {
        ADD_CARDWEATHER ({commit}) {
            commit('ADD_CARDWEATHER')
        },
        REMOVE_CARDWEATHER ({commit}, payload) {
            commit('REMOVE_CARDWEATHER', payload)
        },
        CHANGE_CARDWEATHER({commit}, payload) {
            commit('CHANGE_CARDWEATHER', payload)
        }
    },
    getters: {
        CARDWEATHER (state) {
            return state.cardWeather
        },
    },
    modules: {
    }
}