<template>
  <div class="cartWeather">
    <div v-if="!firstElem" class="removeCard" @click="removeCard">
    </div>
    <h2 v-if="content.lat === '' && content.lon === '' && !favoriteList" >Enter your city</h2>
    <headerCWeather v-if="!favoriteList" @changeCity="changeCity" @addFavorites="addFavorites" :content="content" :favorites="favorites" />
    <div class="infoTown" v-if="content.lat !== '' && content.lon !== ''">
        <!-- <div class="infoTown_wrapBtn">
            <button>Day</button>
            <button>5 дней</button>
        </div> -->
        <infoCDay :content="objCard.info" />
    </div>
    <div class="infoTown_grafic" v-if="chartData.labels.length !== 0 && content.lat !== '' && content.lon !== ''">
        <Line
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
        />
    </div>
    
  </div>
</template>

<script >
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, CategoryScale, LinearScale, LineElement } from 'chart.js'
import infoCDay from '@/components/infoCDay.vue'
import headerCWeather from '@/components/headerCWeather.vue'
import moment from 'moment'
import {mapActions, mapGetters} from 'vuex'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)
export default {
    name: 'BarChart',
    components: { Line, infoCDay, headerCWeather },
    props:['content', 'firstElem', 'favoriteList'],
    data() {
        return {
            favorites: false,
            cord: {
                lat: '',
                lon: ''
            },
            objCard: {
                info: false,
                grafic: []
            },
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: 'temperature',
                        backgroundColor: '#0a69d4',
                        data: []
                    }
                ]
            },
            chartOptions: {
                // scales: {
                //     yAxes: [
                //         {
                //             ticks: {
                //                 callback: function (value, index, values) {
                //                     return value + " %";
                //                 }
                //             }
                //         }
                //     ]
                // },
                responsive: true,
                maintainAspectRatio: false,
            }
        }
    },
    computed: {
      ...mapGetters([
        'FAVORITES',
      ]),
    },
    methods: {
        addFavorites() {
            let obj = {
                lat: this.cord.lat,
                lon: this.cord.lon,
                idx: this.content.idx
            }
            if(this.FAVORITES.length < 5) {
                this.$message('Card added to favorites')
                this.ADD_FAVORITES(obj)
                this.favorites = true
            } else {
                this.$message('Remove city to add')
            }
        },
        removeCard() {
            // console.log(this.content.idx)
            this.$emit('removeCardModal', this.content.idx)
        },
        changeCity(data) {
            // console.log('data')
            // console.log(data)
            let obj = {
                name: data.name,
                country: data.country,
                idx: this.content.idx
            }

            // console.log('obj')
            // console.log(obj)
            // console.log('-----------')
            // this.apiWeather()
            this.$emit('changeCity', obj)
            // this.apiWeather()
        },
        ...mapActions([
            'GET_DAYWEATHER_FROM_API',
            'GET_FORECAST_FROM_API',
            'ADD_FAVORITES'
        ]),
        apiWeather() {
            // console.log('this.content.lat')
            // console.log(this.content.lat)
            // console.log(this.content.lon)
            // console.log('-----------')
            this.cord.lat = this.content.lat
            this.cord.lon = this.content.lon
            
            if(this.content.lat !== '' && this.content.lon !== "") {

                let tmpContent = this
                let tmpMas = this.FAVORITES.filter(function(item) {
                    if(item.lat == tmpContent.content.lat && item.lon == tmpContent.content.lon) {
                        return item
                    }
                })
                if(tmpMas.length !== 0) {
                    this.favorites = true
                } else {
                    this.favorites = false
                }

                this.GET_DAYWEATHER_FROM_API(this.cord).then((response) => {
                    if(response) {
                        this.objCard.info = response
                        this.GET_FORECAST_FROM_API(this.cord).then((response) => {
                            if(response) {
                                for(let i = 0; i < 5; i++) {
                                    this.objCard.grafic.push(response.list[i])
                                }

                                let mas = []
                                for(let i = 0; i < this.objCard.grafic.length; i++) { 
                                    let date = moment(this.objCard.grafic[i].dt_txt, "YYYY-MM-DD HH:mm:ss");
                                    this.chartData.labels.push(date.format('HH:mm'))
                                    mas.push(this.objCard.grafic[i].main.temp)
                                }
                                this.chartData.datasets[0].data = mas
                            }
                        })
                    }
                })  
            } else {
                this.favorites = false
            }
        }
    },
    mounted() {
        this.apiWeather()
    },
    watch: {
        content: {
            handler(val, oldVal) {
                this.apiWeather()
            },
            deep: true
        },
    }
}
</script>
<style scoped lang="scss">

.infoTown_grafic {
    height: desktop-vw(250);
}

.cartWeather {
    background: #fff;
    padding: desktop-vw(40);
    // border: 1px solid #000;
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
    position: relative;

    h2 {
        font-size: desktop-vw(20);
    }
}

.removeCard {
    position: absolute;
    z-index: 30;
    display: block;
    top: desktop-vw(20);
    right: desktop-vw(20);
    height: desktop-vw(20);
    width: desktop-vw(20);
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        transform: scale(1.1);
    }

    &:before {
        content: "";
        position: absolute;
        width: desktop-vw(20);
        height: desktop-vw(4);
        background: #3b3c40;
        transform: rotate(45deg);
        border-radius: 3px;
    }

    &:after {
        content: "";
        position: absolute;
        width: desktop-vw(20);
        height: desktop-vw(4);
        background: #3b3c40;
        transform: rotate(-45deg);
        border-radius: 3px;
    }
}

@media screen and (max-width: $mobile) {
    .infoTown_grafic {
        height: mobile-vw(250);
    }

    .cartWeather {
        padding: mobile-vw(50) mobile-vw(10) mobile-vw(10);
        h2 {
            font-size: mobile-vw(20);
            margin-bottom:  mobile-vw(10);
        }
    }

    .removeCard {
        top: mobile-vw(20);
        right: mobile-vw(20);
        height: mobile-vw(20);
        width: mobile-vw(20);

        &:before {
            width: mobile-vw(20);
            height: mobile-vw(4);
        }

        &:after {
            width: mobile-vw(20);
            height: mobile-vw(4);
        }
    }
}

</style>


