<template>
  <div class="cartWeather">
    <div class="wrapInput">
        <input type="text">
        <button>в избран.</button>
    </div>
    <div class="infoTown">
        <div class="infoTown_wrapBtn">
            <button>День</button>
            <button>5 дней</button>
        </div>
        <div class="infoTown_content">
            <div class="infoTown_tempriche">
                {{ infoWeather }}
            </div>
            <div class="infoTown_text">

            </div>

        </div>
    </div>
    <div class="infoTown_grafic">
        <Line
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
        />
    </div>
    
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, CategoryScale, LinearScale, LineElement } from 'chart.js'
import {mapActions, mapGetters} from 'vuex'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
export default {
    name: 'BarChart',
    components: { Line },
    data() {
        return {
            infoWeather: {},
            chartData: {
                label: 'Govno',
                labels: [ 'January', 'February', 'March' ],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [40, 20, 12]
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    computed: {
        temp() {
            return  Math.round(this.infoWeather.main.temp)
        },
        feelsLike() {
            return  Math.round(this.infoWeather.main.feels_like)
        },
        description() {
            return  Math.round(this.infoWeather.main.description)
        }
    },
    methods: {
        ...mapActions([
            'GET_DAYWEATHER_FROM_API'
        ]),
    },
    mounted() {
        this.GET_DAYWEATHER_FROM_API().then((response) => {
            if(response) {
                this.infoWeather = response
            }
        })
    }
}
</script>
<style scoped lang="scss">

.infoTown_grafic {
    height: desktop-vw(250);
}

.cartWeather {
    padding: desktop-vw(20);
    // border: 1px solid #000;
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
}

</style>


