<template>
    <div class="main">
        <cartWeather v-for="(item, idx) in CARDWEATHER" :key="idx" :content="item" @changeCity="changeCity" @removeCard="removeCard" />
    </div>
    <button class="addCart" title="Add to card" @click="addFunction"></button>
</template>

<script>
// @ is an alias to /src
import cartWeather from '@/components/cartWeather.vue'
import {mapActions, mapGetters} from 'vuex'
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
    computed: {
      ...mapGetters([
        'CARDWEATHER',
      ]),
    },
    methods: {
        ...mapActions([
            'ADD_CARDWEATHER',
            'REMOVE_CARDWEATHER',
            'CHANGE_CARDWEATHER'
        ]),
        changeCity(data) {
            this.CHANGE_CARDWEATHER(data)
        },
        removeCard(data) {
            this.REMOVE_CARDWEATHER(data)
        },
        addFunction() {
            if(this.CARDWEATHER.length < 5) {
                this.ADD_CARDWEATHER()
            }
        }
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