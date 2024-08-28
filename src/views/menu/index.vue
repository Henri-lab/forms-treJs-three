<template>
    <div class="menu" @click.right="lookReset">
        <Galaxy class="galaxy-wrapper" ref="galaxy" />
        <Tags class="tags-wrapper animate__animated animate__fadeInDown" v-if="isBtn" />
        <div class="theme">
            <el-switch v-model="themeLight" />开灯
        </div>
        <el-button class="btn1 animate__animated animate__fadeInRight" color="green" v-if="isBtn" @click="lookPre">
            pre
        </el-button>
        <el-button class="btn2 animate__animated animate__fadeInRight" color="green" v-if="isBtn" @click="lookNext">
            next
        </el-button>

        <div class="detailsPane animate__animated animate__fadeInRight" v-draggable v-if="isDtails">
            <div class="navi">
                <div class="details">{{ country }}</div>
                <div class="close" @click="closeDetails">关闭</div>
            </div>
            <Description class="description-wrapper" :country="country" :targetType="checkType" />
        </div>
        <Search class="search-wrapper" v-if="isCard" />
        <Card ref="card" :class="'card-wrapper', 'animate__animated', 'animate__fadeInRight', cardClass, zoomClass"
            v-show="isCard" :countryName="country" />


    </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import Galaxy from '~c/threeVue/galaxy/index.vue';
import Card from '~c/card.vue';
import Tags from '~c/tags.vue';
import Description from '~c/descriptions/index.vue';
import Search from '~c/search.vue'
import { onMounted, ref, watch } from 'vue';
import bus from '@/utils/bus';
import { lowerCaseCountryNameMap } from './dict'

const isBtn = ref(false)
const isCard = ref(true)
const isJbxxShip = ref(false)
const isJbxxAir = ref(false)
const galaxy = ref(null)
const card = ref(null)
const cardClass = ref('animate__fadeInRightBig')
const zoomClass = ref('')
const isDtails = ref(false)
const checkType = ref('')

onMounted(() => {
    setTimeout(() => {
        isBtn.value = true
    }, 5000);
})

const themeLight = ref(false)
watch(() => themeLight.value, (newV) => {
    galaxy.value && galaxy.value.changeTheme()
})


let planets = []
onMounted(() => {
    planets = galaxy.value && galaxy.value.getPlanets()
    console.log(planets, 'planets in menu');
})
let count = 0

const getDetails = (type) => {
    galaxy.value && galaxy.value.open()
    isCard.value = false
    cardClass.value = 'animate__fadeOutLeftBig'
    isCard.value = true

    if (type === 'jbxx_aircraft') {
        isJbxxAir.value = !isJbxxAir.value
    } else if (type === 'jbxx_ship') {
        isJbxxShip.value = !isJbxxShip
    }
}

// 暂时硬编码(6个球)数组遍历 因为摄像头没有调好
let countCN = 0
let countUSA = 0
let i_planets = 0
const country = ref('')

const lookPre = () => {
    const { x, y, z, name } = planets[Math.abs(i_planets++ % 6)]
    galaxy.value && galaxy.value.setPosOfCamera(x, y, z + 5)
    country.value = lowerCaseCountryNameMap[name.toLowerCase()]
    // console.log(name, '--country name watching');
    // bug
    // galaxy.value && galaxy.value.lookAt(index++ % 6)
}
const lookNext = () => {
    const { x, y, z, name } = planets[Math.abs(i_planets-- % 6)]
    galaxy.value && galaxy.value.setPosOfCamera(x, y, z + 5)
    country.value = lowerCaseCountryNameMap[name.toLowerCase()]
    // console.log(name, '--country name watching');
    // galaxy.value && galaxy.value.lookAt(index-- % 6)
}
const lookReset = (e) => {
    country.value = ''
    galaxy.value && galaxy.value.cameraReset()
}

const closeDetails = () => {
    isDtails.value = false
    isCard.value = true
    galaxy.value && galaxy.value.reverse()


}
bus.on('openRing', () => {
    galaxy.value && galaxy.value.open()
})

bus.on('detailsCheck', ({ country, type }) => {
    console.log(country, type, '查看详情~国家和类型');
    checkType.value = type
    galaxy.value && galaxy.value.open()
    isCard.value = false
    isDtails.value = true;
    // card.value.style.width = `100px`
    // card.value.style.height = `100px`
    zoomClass.value = 'zoom'
    
})
</script>

<style lang="scss" scoped>
.zoom {
    width: 100px !important;
    height: 100px !important;
}

.menu {
    width: 100%;
    height: 100%;
    position: relative;

    .galaxy-wrapper {
        width: 100vw;
        height: 100vh;
        position: absolute;
    }

    .detailsPane {
        width: 80%;
        height: 90%;
        position: absolute;
        top: 8%;
        right: 10%;
        background-color: transparent;
        opacity: 60%;
        z-index: 2;
        display: flex;
        flex-direction: column;
        border: 1px solid whitesmoke;

        .navi {
            display: flex;
            width: 100%;
            height: 5%;
            justify-content: space-around;
        }

        .description-wrapper {
            width: 100%;
            background-color: black;
            opacity: 80%;
            height: 95%;
        }

    }

    .search-wrapper {
        width: 40%;
        max-height: 10%;
        position: absolute;
        padding: 0;
        top: 10%;
        right: 10%;
        // background-color: red;
    }

    .card-wrapper {
        width: 40%;
        max-height: 55%;
        // background-color: rgba(236, 200, 17, 0.3);
        position: absolute;
        padding: 1%;
        top: 20%;
        right: 10%;
        // box-shadow: 0 0 10px rgba(0, 0, 0, 1);
        --animate-duration: 7s;
        overflow: visible;
    }

    .btn1 {
        width: 5%;
        height: 5%;
        position: absolute;
        top: 25%;
        right: 5%;
        z-index: 1;
        --animate-duration: 2s;
    }

    .btn2 {
        width: 5%;
        height: 5%;
        position: absolute;
        top: 35%;
        right: 5%;
        z-index: 1;
        --animate-duration: 2s;
    }

    .tags-wrapper {
        width: 23%;
        height: 5%;
        right: 10%;
        top: 2%;
        position: absolute;
    }

    .theme {
        width: 10%;
        height: 5%;
        right: -5%;
        top: 0%;
        position: absolute;
    }

    // .description-wrapper {
    //     width: 30%;
    //     height: auto;
    //     background-color: rgba(76, 250, 250, 0.3);
    //     position: absolute;
    //     padding: 1%;
    //     top: 20vh;
    //     right: 10vw;
    //     box-shadow: 0 0 10px rgba(0, 0, 0, 1);
    //     z-index: 1;
    // }

}
</style>