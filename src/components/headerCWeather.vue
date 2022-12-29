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
        <button class="addFavorites" v-if="content.lat !== '' && content.lon !== '' && !favorites" @click="addFavorites">Add to favorites</button>
        <div v-if="favorites" class="favorite" title="Added to favorites">
            <svg
                xmlns:dc="http://purl.org/dc/elements/1.1/"
                xmlns:cc="http://creativecommons.org/ns#"
                xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                xmlns:svg="http://www.w3.org/2000/svg"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
                viewBox="0 0 48 48"
                version="1.1"
                id="svg4646"
                sodipodi:docname="check green circle.svg"
                inkscape:version="0.92.3 (2405546, 2018-03-11)">
                <metadata
                    id="metadata4650">
                    <rdf:RDF>
                    <cc:Work
                        rdf:about="">
                        <dc:format>image/svg+xml</dc:format>
                        <dc:type
                        rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
                        <dc:title></dc:title>
                    </cc:Work>
                    </rdf:RDF>
                </metadata>
                <sodipodi:namedview
                    pagecolor="#ffffff"
                    bordercolor="#666666"
                    borderopacity="1"
                    objecttolerance="10"
                    gridtolerance="10"
                    guidetolerance="10"
                    inkscape:pageopacity="0"
                    inkscape:pageshadow="2"
                    inkscape:window-width="1920"
                    inkscape:window-height="1027"
                    id="namedview4648"
                    showgrid="false"
                    inkscape:zoom="4.9166667"
                    inkscape:cx="24"
                    inkscape:cy="24"
                    inkscape:window-x="-8"
                    inkscape:window-y="-8"
                    inkscape:window-maximized="1"
                    inkscape:current-layer="g4644" />
                <defs
                    id="defs4638">
                    <linearGradient
                    id="0"
                    gradientUnits="userSpaceOnUse"
                    y1="47.85"
                    x2="0"
                    y2="-2.292">
                    <stop
                        stop-color="#4da70e"
                        id="stop4633" />
                    <stop
                        offset="1"
                        stop-color="#9ded46"
                        id="stop4635" />
                    </linearGradient>
                </defs>
                <g
                    transform="matrix(.92307 0 0 .92307-24.891 2.712)"
                    enable-background="new"
                    id="g4644"
                    style="fill-opacity:1;opacity:1;fill-rule:nonzero">
                    <circle
                    r="26"
                    cy="23.07"
                    cx="52.97"
                    fill="url(#0)"
                    id="circle4640"
                    style="fill-opacity:1;fill-rule:nonzero;fill:#55d400" />
                    <path
                    d="m66.804 16.712l-2.518-2.518c-.345-.346-.766-.518-1.259-.518-.494 0-.914.173-1.259.518l-12.148 12.167-5.444-5.463c-.346-.346-.766-.518-1.259-.518-.494 0-.914.173-1.259.518l-2.518 2.518c-.346.346-.518.766-.518 1.259 0 .494.173.914.518 1.259l6.704 6.704 2.519 2.518c.345.346.765.518 1.259.518.494 0 .914-.173 1.259-.518l2.519-2.518 13.407-13.407c.345-.346.518-.766.518-1.259 0-.494-.173-.914-.518-1.259"
                    fill="#fff"
                    fill-opacity=".851"
                    id="path4642"
                    style="fill-opacity:1;fill-rule:nonzero" />
                </g>
            </svg>
        </div>
    </div>
</template>

<script>
import cities from 'cities.json';

export default {
    components: { cities },
    props:['content', 'favorites'],
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
            // console.log('item')
            // console.log(item)
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
    margin-bottom: desktop-vw(10);
}

.inputTown {
    height: desktop-vw(40);
    padding: 0 desktop-vw(10);
    font-size: desktop-vw(14);
    border-radius: 5px;
    border: 1px solid #000;
}

.wrapInput {
    position: relative;
}

.citiesList {
    position: absolute;
    background: #fff;
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
    padding: desktop-vw(5);
    top: desktop-vw(40);
    z-index: 20;
}

.citiesItem {
    text-align: left;
    transition: all 0.3s ease;
    font-size: desktop-vw(14);
    cursor: pointer;

    &:hover {
        color: #0a69d4;
    }
}

.addFavorites {
    padding: 0 desktop-vw(10);
    height: desktop-vw(40);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: desktop-vw(14);
    background: #0a69d4;
    color: #fff;
    border: 0;
    border-radius: 3px;
    font-weight: bold;
}

.favorite {
    width: desktop-vw(30);
    height: desktop-vw(30);
}

@media screen and (max-width: $mobile) {
    .headerCard {
        margin-bottom: mobile-vw(10);
    }

    .inputTown {
        height: mobile-vw(30);
        padding: 0 mobile-vw(5);
        font-size: mobile-vw(14);
        box-sizing: border-box;
    }

    .citiesItem {
        font-size: mobile-vw(14);
    }

    .citiesList {
        padding: mobile-vw(5);
        top: mobile-vw(30);
    }

    .addFavorites {
        padding: 0 mobile-vw(5);
        height: mobile-vw(30);
        font-size: mobile-vw(14);
        box-sizing: border-box;
    }

    .favorite {
        width: mobile-vw(30);
        height: mobile-vw(30);
    }
}

</style>


