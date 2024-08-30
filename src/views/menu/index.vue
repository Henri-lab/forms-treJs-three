<template>
    <div class="menu" @click.right="lookReset">
        <HeaderTime></HeaderTime>
        <Galaxy class="galaxy-wrapper" ref="galaxy" v-if="isGalaxy" />
        <Tags class="tags-wrapper animate__animated animate__fadeInDown" v-if="isBtn" />
        <div class="theme">
            <el-switch v-model="themeLight" /> 切换背景
        </div>
        <el-button class="btn1 animate__animated animate__fadeInRight" color="green" v-if="isBtn" @click="lookPre">
            上一个
        </el-button>
        <el-button class="btn2 animate__animated animate__fadeInRight" color="green" v-if="isBtn" @click="lookNext">
            下一个
        </el-button>
        <div class="detailsPane-wrapper" v-if="isDtails">
            <div class="head"></div>
            <div class="detailsPane animate__animated animate__fadeInRight">
                <div class="navi">
                    <div class="detailsName">{{ country }}</div>
                    <div class="close" @click="closeDetails"><el-button type="danger">关闭</el-button></div>
                </div>
                <Description class="description-wrapper " :country="country" :targetType="checkType" :search="search" />
            </div>
        </div>
        <Search class="search-wrapper animate__animated animate__fadeInDown" v-if="isBtn" />
        <Card ref="card" class="card-wrapper animate__animated animate__fadeInUpBig" v-show="isCard"
            :countryName="country" />
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
import { lowerCaseCountryNameMap } from '@/dict/country.ts'
import HeaderTime from '~c/HeaderVue.vue';

const isBtn = ref(false)
const isCard = ref(true)//false 导致 echarts无法获取宽高！！
const galaxy = ref(null)
const card = ref(null)
const isDtails = ref(false)
const checkType = ref('')
const isGalaxy = ref(true)

onMounted(() => {
    setTimeout(() => {
        isBtn.value = true
    }, 3000);
})

// 背景开关
const themeLight = ref(false)
watch(() => themeLight.value, (newV) => {
    // isGalaxy.value = !isGalaxy.value
    galaxy.value && galaxy.value.changeSky()
})


let planets = []
let len = 6//%len 星球数量 循环遍历
onMounted(() => {
    planets = galaxy.value && galaxy.value.getPlanets()
    len = planets.length || 6
    // console.log(planets, 'planets in menu');
})

// 暂时硬编码(6个球)数组遍历 因为摄像头没有调好
let i_planets = 0
const country = ref('')//查看国家 --carry--> 卡片\详情表
// 上一个
const lookPre = () => {
    const { x, y, z, name } = planets[Math.abs(i_planets++ % len)]
    country.value = lowerCaseCountryNameMap[name.toLowerCase()]
    galaxy.value && galaxy.value.setPosOfCamera(x, y, z + 5)
    // console.log(name, '--country name watching');
    // bug
    // galaxy.value && galaxy.value.lookAt(index++ % 6)
}
// 下一个
const lookNext = () => {
    const { x, y, z, name } = planets[Math.abs(i_planets-- % 6)]
    country.value = lowerCaseCountryNameMap[name.toLowerCase()]
    galaxy.value && galaxy.value.setPosOfCamera(x, y, z + 5)
    // console.log(name, '--country name watching');
    // galaxy.value && galaxy.value.lookAt(index-- % 6)
}
// 摄像重置
const lookReset = (e) => {
    country.value = ''
    galaxy.value && galaxy.value.cameraReset()
}

// 关闭详情表
const closeDetails = () => {
    isDtails.value = false
    isCard.value = true
    galaxy.value && galaxy.value.reverse()
}

// 打开星球环
bus.on('openRing', () => {
    galaxy.value && galaxy.value.open()
})

// 查看详情
bus.on('detailsCheck', ({ countryCode, type }) => {
    console.log(countryCode, type, '查看详情~国家和类型');
    if (countryCode) {
        country.value = lowerCaseCountryNameMap[countryCode.toLowerCase()]
    }
    checkType.value = type
    galaxy.value && galaxy.value.open()
    isDtails.value = true;
    isCard.value = false
    // card.value.style.width = `100px`
    // card.value.style.height = `100px`
})

// 跳转国家
bus.on('goCountry', (name) => {
    console.log(name, 'goCountry');
    country.value = lowerCaseCountryNameMap[name.toLowerCase()]
})
// 搜索
const search = ref('')
bus.on('search', (para) => {
    console.log(para, 'search')
    search.value = para
    // bus.emit('searchRes', para)
})

bus.on('openDetails', () => {
    isDtails.value = true
})
bus.on('closeDetails', () => {
    isDtails.value = false
})
</script>

<style lang="scss" scoped>
@mixin pre-next($top) {
    width: 8rem;
    height: 5rem;
    position: absolute;
    top: $top;
    right: 5%;
    z-index: 1;
    --animate-duration: 2s;
}



.menu {
    @include layout100('%');
    // width: 2500px;
    // height: 1500px;
    position: relative;

    .galaxy-wrapper {
        @include layout100('v');
        position: absolute;
    }

    .detailsPane-wrapper {
        display: flex;
        flex-direction: column;
        width: 80%;
        height: 90%;
        top: 8%;
        right: 10%;
        opacity: 1;
        border: 1px solid whitesmoke;
        border-radius: 20%;
        background-color: white;
        position: absolute;
        z-index: 2;

        .head {
            width: 100%;
            height: 5%;
        }

        .detailsPane {
            width: 90%;
            height: 90%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            background-color: wheat;
            // border: 1px solid whitesmoke;
            box-shadow: 10px 10px 10px 10px rgb(18, 18, 18, 0.8);

            .navi {
                display: flex;
                justify-content: space-around;
                width: 100%;
                height: 5%;
                position: relative;

                .detailsName {
                    font-size: 30px;
                    font-weight: 900;
                }


                .close {
                    position: absolute;
                    right: 0;
                    opacity: 50%;
                }
            }

            .description-wrapper {
                width: 100%;
                background-color: black;
                opacity: 80%;
                height: 95%;
            }

        }

    }


    .search-wrapper {
        width: 40%;
        position: fixed;
        padding: 0;
        top: 3%;
        left: 25%;
        // background-color: red;
    }

    .card-wrapper {
        width: auto;
        height: auto;
        background-color: rgba(242, 240, 231, 0.1);
        position: absolute;
        padding: 1%;
        top: 20%;
        right: 10%;
        border-radius: 20%;
        box-shadow: 0 0 10px rgb(155, 235, 81);
        --animate-duration: 3s;
        overflow: visible
    }

    // 上一个
    .btn1 {
        @include pre-next(32%)
    }

    // 下一个
    .btn2 {
        @include pre-next(43%)
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
        color: antiquewhite;
    }
}
</style>