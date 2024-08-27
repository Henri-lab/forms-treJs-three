<template>
    <div class="menu">
        <Galaxy class="galaxy-wrapper" ref="galaxy" />
        <Tags class="tags-wrapper animate__animated animate__fadeInDown" v-if="isBtn" />
        <el-button class="btn1 animate__animated animate__fadeInRight" color="#626aef" v-if="isBtn" @click="lookPre">
            pre
        </el-button>
        <el-button class="btn2 animate__animated animate__fadeInRight" color="#626aef" v-if="isBtn" @click="lookNext">
            next
        </el-button>
        <div class="details" @click="getDetails">详情1</div>
        <Card ref="card" :class="'card-wrapper', 'animate__animated', cardClass" v-show="isCard" />
        <Description class="description-wrapper" tableType='jbxx_ship' v-draggable v-if="isDesc1" />
        <Description class="description-wrapper" tableType='jbxx_aircraft' v-draggable v-if="isDesc2" />
    </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import Galaxy from '~c/threeVue/galaxy/index.vue';
import Card from '~c/card.vue';
import Tags from '~c/tags.vue';
import Description from '~c/descriptions/index.vue';
import { onMounted, ref } from 'vue';
import mitt from 'mitt'
import Context from '~c/threeVue/galaxy/Context.vue'

const bus = mitt()
const isBtn = ref(false)
const isCard = ref(true)
const isDesc1 = ref(false)
const isDesc2 = ref(false)
const galaxy = ref(null)
const card = ref(null)
const cardClass = ref('animate__fadeInRightBig')

onMounted(() => {
    setTimeout(() => {
        isBtn.value = true
    }, 5000);
})


let planets = []
onMounted(() => {
    planets = galaxy.value && galaxy.value.getPlanets()
    console.log(planets, 'planets in menu');
})
let count = 0
const getDetails = () => {
    // if (count++ % 2 == 0) {
    //     galaxy.value && galaxy.value.reverse()
    // } else {
    //     galaxy.value && galaxy.value.open()
    // }
    isCard.value = false
    cardClass.value = 'animate__fadeOutLeftBig'
    isCard.value = true
    isDesc2.value = !isDesc2.value
    // bus.emit('galaxy')
}

// 暂时硬编码(6个球)数组遍历 因为摄像头没有调好
let countCN = 0
let countUSA = 0
let i_planets = 0
const lookPre = () => {
    const { x, y, z, name } = planets[Math.abs(i_planets++ % 6)]
    galaxy.value && galaxy.value.setPosOfCamera(x, y, z + 5)
    console.log(name, '--country name watching');
    // bug
    // galaxy.value && galaxy.value.lookAt(index++ % 6)
}
const lookNext = () => {
    const { x, y, z, name } = planets[Math.abs(i_planets-- % 6)]
    galaxy.value && galaxy.value.setPosOfCamera(x, y, z + 5)
    console.log(name, '--country name watching');
    // galaxy.value && galaxy.value.lookAt(index-- % 6)
}
</script>

<style lang="scss" scoped>
.menu {
    width: 100%;
    height: 100%;
    position: relative;

    .galaxy-wrapper {
        width: 100vw;
        height: 100vh;
        position: absolute;
    }

    .details {
        width: 7%;
        height: 5%;
        position: absolute;
        top: 13%;
        right: 10%;
    }

    .card-wrapper {
        width: 30%;
        max-height: 45%;
        background-color: rgba(236, 200, 17, 0.3);
        position: absolute;
        padding: 1%;
        top: 20%;
        right: 10%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 1);
        --animate-duration: 7s;
    }

    .btn1 {
        width: 3%;
        height: 3%;
        position: absolute;
        top: 25%;
        right: 41%;
        z-index: 1;
        --animate-duration: 2s;
    }

    .btn2 {
        width: 3%;
        height: 3%;
        position: absolute;
        top: 35%;
        right: 41%;
        z-index: 1;
        --animate-duration: 2s;
    }

    .tags-wrapper {
        width: 23%;
        height: 5%;
        right: 8%;
        top: 2%;
        position: absolute;
    }

    .description-wrapper {
        width: 30%;
        height: auto;
        background-color: rgba(76, 250, 250, 0.3);
        position: absolute;
        padding: 1%;
        top: 20vh;
        right: 10vw;
        box-shadow: 0 0 10px rgba(0, 0, 0, 1);
        z-index: 1;
    }
}
</style>