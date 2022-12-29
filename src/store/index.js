import { createStore } from 'vuex'
import dayWeather from './dayWeather'
import forecast from './forecast'
import favorites from './favorites'
import main from './main'
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    dayWeather,
    forecast,
    favorites,
    main
  }
})
