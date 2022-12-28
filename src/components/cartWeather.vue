<template>
  <div class="cartWeather" v-if="objCard.info">
    <div class="removeCard">

    </div>
    <headerCWeather @openCity="openCity" />
    <div class="infoTown">
        <div class="infoTown_wrapBtn">
            <button>Day</button>
            <button>5 дней</button>
        </div>
        <infoCDay :content="objCard.info" />
    </div>
    <div class="infoTown_grafic" v-if="chartData.labels.length !== 0">
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
    props:['idx'],
    data() {
        return {
            cord: {
                lat: '51.5128',
                lon: '-0.0918'
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
                        backgroundColor: '#0000ff',
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
    methods: {
        openCity(data) {
            console.log(data)
            this.cord.lat = data.lat
            this.cord.lon = data.lng
            this.apiWeather()
        },
        ...mapActions([
            'GET_DAYWEATHER_FROM_API',
            'GET_FORECAST_FROM_API'
        ]),
        apiWeather() {
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
        }
    },
    mounted() {
        this.apiWeather()
    }
}
</script>
<style scoped lang="scss">

.infoTown_grafic {
    height: desktop-vw(250);
}

.cartWeather {
    padding: desktop-vw(40);
    // border: 1px solid #000;
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
    position: relative;
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

</style>


