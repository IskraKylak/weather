<template>
    <div class="favorites">
        <cartWeatherFavorites v-for="(item, idx) in FAVORITES" :key="idx" :content="item" @removeCard="removeCard" />
    </div>
</template>

<script>
import cartWeatherFavorites from '@/components/cartWeatherFavorites.vue'

// @ is an alias to /src
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'Favorites',
    components: { cartWeatherFavorites },
    data() {
        return {
            cardWeather: [ 
            ],
        }
    },
    methods: {
        removeCard(data) {
        },
    },
    computed: {
      ...mapGetters([
        'FAVORITES',
      ]),
    },
}
</script>
<style scoped lang="scss">

</style>
