<template>
    <div class="headerCard">
        <div class="wrapInput">
            <input type="text" v-model="searchTown" class="inputTown" placeholder="Search City">
            <div class="citiesList" v-if="resultTown.length !== 0">
                <div v-for="(item, idx) in resultTown" :key="idx" class="citiesItem" @click="changeCity(item)">
                    {{ item.name }}, {{item.country}}
                </div>
            </div>
        </div>
        <button class="addFavorites" v-if="content.lat !== '' && content.lon !== ''" @click="addFavorites">Add to favorites</button>
    </div>
</template>

<script>
import cities from 'cities.json';

export default {
    components: { cities },
    props:['content'],
    data() {
        return {
            allCities: cities,
            apiKey: 'AIzaSyDZQua-18d8phUxfatSpFggcvH99UEcsj8',
            searchTown: '',
            resultTown: [],
        }
    },
    methods: {
        addFavorites() {
            this.$emit('addFavorites')
        },
        changeCity(item) {
            this.resultTown = []
            this.searchTown = ''
            this.$emit('changeCity', item)
        }
    },
    watch: {
        searchTown(newSearch, oldSearch) {
        if (newSearch.length > 2 ) {
            this.resultTown = this.allCities.filter(item => item.name.includes(newSearch))
            if(this.resultTown.length === 0) {
                this.resultTown.push({name: "Not Found"})
            }
        } else {
            this.resultTown = []
        }
        }
    }
}
</script>
<style scoped lang="scss">

.headerCard {
    display: flex;
    widows: 100%;
    justify-content: space-between;
}

.inputTown {
    height: desktop-vw(30);
    padding: desktop-vw(5);
}

.wrapInput {
    position: relative;
}

.citiesList {
    position: absolute;
    background: #fff;
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
    padding: desktop-vw(5);
    top: desktop-vw(30);
    z-index: 20;
}

.citiesItem {
    text-align: left;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        color: #0000ff;
    }
}

.addFavorites {
    padding: desktop-vw(10) desktop-vw(5);
    cursor: pointer;
}

</style>


