<template>
    <div class="main">
        <cartWeather v-for="(item, idx) in cardWeather" :key="idx" :content="item" @changeCity="changeCity" @removeCard="removeCard" />
    </div>
    <button class="addCart" title="Add to card" @click="addFunction"></button>
</template>

<script>
// @ is an alias to /src
import cartWeather from '@/components/cartWeather.vue'

export default {
    name: 'Main',
    components: { cartWeather },
    data() {
        return {
            cardWeather: [ 
                {
                    lat: '',
                    lon: '',
                    idx: 0
                }
            ],
        }
    },
    methods: {
        changeCity(data) {
            // console.log('changeCity')
            // console.log(data)
            const index = this.cardWeather.findIndex(item => item.idx === data.idx);
            this.cardWeather[index].lat = data.lat
            this.cardWeather[index].lon = data.lon
            let mas = []
            for(let i = 0; i < this.cardWeather.length; i++) {
                mas.push(this.cardWeather[i])
            }
            this.cardWeather = []
            for(let i = 0; i < mas.length; i++) {
                this.cardWeather.push(mas[i])
            }
            // console.log(this.cardWeather)
            // console.log('-----------')
        },
        removeCard(data) {
            // console.log(data)
            const index = this.cardWeather.findIndex(item => item.idx === data);
            // console.log(index)
            this.cardWeather.splice(index, 1);
            let mas = []
            for(let i = 0; i < this.cardWeather.length; i++) {
                mas.push(this.cardWeather[i])
            }
            this.cardWeather = []
            for(let i = 0; i < mas.length; i++) {
                this.cardWeather.push(mas[i])
            }
            // console.log('removeCard')
            // console.log(this.cardWeather)
            // console.log('--------')
        },
        addFunction() {
            // console.log('addFunction')
            
            this.cardWeather.push({
                lat: '',
                lon: '',
                idx: this.cardWeather[this.cardWeather.length - 1].idx + 1
            })
            // console.log(this.cardWeather)
            // console.log('--------')
        }
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
<style scoped lang="scss">

.main {
    display: flex;
    flex-direction: column;
    grid-gap: desktop-vw(40);
}

.addCart {
    position: fixed;
    z-index: 30;
    display: block;
    bottom: desktop-vw(50);
    right: desktop-vw(50);
    height: desktop-vw(50);
    width: desktop-vw(50);
    cursor: pointer;
    transition: all 0.3s ease;
    background: #00f;
    border-radius: 50%;
    border: 0;
    
    &:hover {
        transform: scale(1.1);
    }

    &:before {
        content: "";
        position: absolute;
        top: calc(50% - desktop-vw(2));
        left: calc(50% - desktop-vw(15));
        width: desktop-vw(30);
        height: desktop-vw(4);
        background: #fff;

        border-radius: 3px;
    }

    &:after {
        content: "";
        top: calc(50% - desktop-vw(2));
        left: calc(50% - desktop-vw(15));
        position: absolute;
        width: desktop-vw(30);
        height: desktop-vw(4);
        background: #fff;
        transform: rotate(90deg);
        border-radius: 3px;
    }
}

</style>