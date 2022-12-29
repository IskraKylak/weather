<template>
    <div class="main">
        <cartWeather v-for="(item, idx) in CARDWEATHER" :key="idx" :content="item" @changeCity="changeCity" @removeCardModal="removeCardModal" />
    </div>
    <button class="addCart" title="Add to card" @click="addFunction"></button>
    <popup v-if="POPUP" @removeCard="removeCard" @closePopup="closePackage"/>
</template>

<script>
// @ is an alias to /src
import cartWeather from '@/components/cartWeather.vue'
import {mapActions, mapGetters} from 'vuex'
import popup from '@/components/v-popup.vue'
import axios from 'axios'

export default {
    name: 'Main',
    components: { cartWeather, popup },
    data() {
        return {
            removeCart: false,
            objRemoveCart: {},
            objChange: {
                name: '',
                country: '',
                lat: '',
                lon: '',
                idx: ''
            },
            cardWeather: [ 
                {
                    lat: '',
                    lon: '',
                    idx: 0
                }
            ],
        }
    },
    computed: {
      ...mapGetters([
        'CARDWEATHER',
        'POPUP'
      ]),
    },
    methods: {
        ...mapActions([
            'ADD_CARDWEATHER',
            'REMOVE_CARDWEATHER',
            'CHANGE_CARDWEATHER',
            'CHANGE_POPUP'
        ]),
        async changeCity(data) {
            this.objChange = data
            // console.log(data)
            await axios({
                url: `http://api.openweathermap.org/geo/1.0/direct?q=${data.name},${data.country}&limit=5&appid=04326dad12753de68c09cafdec856895`,
                method: 'GET',
            })
            .then(respons => {
                if(respons) {
                    // console.log(respons.data[0])
                    this.objChange.lat = respons.data[0].lat
                    this.objChange.lon = respons.data[0].lon
                }
            })
            .catch(error => {
                console.log(error)
                this.$message('Error')
            })
            this.CHANGE_CARDWEATHER(this.objChange)
            this.objChange = {
                name: '',
                country: '',
                lat: '',
                lon: '',
                idx: ''
            }
        },
        removeCardModal(data) {
            if(this.CARDWEATHER.length !== 1) {
                this.CHANGE_POPUP(true)
                this.objRemoveCart = data 
            } 
        },
        removeCard(data) {
            if(data) {
                this.CHANGE_POPUP(false)
                this.REMOVE_CARDWEATHER(this.objRemoveCart)
                this.$message('Card removed')
            } else {
                this.CHANGE_POPUP(false)
            }
        },
        addFunction() {
            if(this.CARDWEATHER.length < 5) {
                this.ADD_CARDWEATHER()
            } else {
                this.$message('Remove city to add')
            }
        }
    },
    mounted(){
    }

}
</script>
<style scoped lang="scss">

.main {
    display: flex;
    flex-direction: column;
    grid-gap: desktop-vw(40);
    padding-bottom: desktop-vw(50);
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
    background: #0a69d4;
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