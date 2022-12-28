<template>
    <div class="main">
        <cartWeather v-for="(item, idx) in cardWeather" :key="idx" :content="idx" @openCity="openCity" />
    </div>
</template>

<script>
// @ is an alias to /src
import cartWeather from '@/components/cartWeather.vue'

export default {
    name: 'Main',
    components: { cartWeather },
    data() {
        return {
            cardWeather: [0],
        }
    },
    methods: {
        
        // openCity(data) {
        //     this.GET_DAYWEATHER_FROM_API(data).then((response) => {
        //         if(response) {
        //             card.info = response
        //             this.GET_FORECAST_FROM_API(data).then((response) => {
        //                 if(response) {
        //                     for(let i = 0; i < 5; i++) {
        //                         card.grafic.push(response.list[i])
        //                     }
        //                     this.cardWeather.push(card)
        //                 }
        //             })
        //         }
        //     }) 
        // }
    },
}
</script>
