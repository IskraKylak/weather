<template>
    <div class="favorites">
        <cartWeather v-for="(item, idx) in FAVORITES" :key="idx" :favoriteList="true" :content="item" @removeCardModal="removeCardModal" />
    </div>
    <popup v-if="POPUP" @removeCard="removeCard" @closePopup="closePackage"/>
</template>

<script>
import cartWeather from '@/components/cartWeather.vue'
import popup from '@/components/v-popup.vue'
// @ is an alias to /src
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'Favorites',
    components: { cartWeather, popup },
    data() {
        return {
            objRemoveCart: {},
            cardWeather: [ 
            ],
        }
    },
    methods: {
        removeCardModal(data) {
            this.CHANGE_POPUP(true)
            this.objRemoveCart = data 
        },
        removeCard(data) {
          if(data) {
            this.CHANGE_POPUP(false)
            this.REMOVE_FAVORITES(this.objRemoveCart)
            this.$message('Card removed')
          } else {
            this.CHANGE_POPUP(false)
          }
        },
        ...mapActions([
            'REMOVE_FAVORITES',
            'CHANGE_POPUP'
        ]),
    },
    computed: {
      ...mapGetters([
        'FAVORITES',
        'POPUP'
      ]),
    },
}
</script>
<style scoped lang="scss">
.favorites {
    display: flex;
    flex-direction: column;
    grid-gap: desktop-vw(40);
    padding-bottom: desktop-vw(50);
}

@media screen and (max-width: $mobile) {
    .favorites {
        grid-gap: mobile-vw(40);
        padding-bottom: mobile-vw(50);
    }
}
</style>
