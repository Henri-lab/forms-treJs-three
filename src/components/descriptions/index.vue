<template>
    <div class="description">
        <div class="head">
            <el-select v-model="select" placeholder="请选择具体目标" size="large">
                <el-option v-for="item in targets" :key="item" :label="item" :value="item" />
            </el-select>
        </div>
        <div class="main">
            <div class="left">
                <Map />
            </div>
            <div class="right"></div>
        </div>
    </div>
</template>

<script setup >
import { onMounted } from 'vue';
import Map from '~c/map.vue'
import {
    data,
    jbxx_aircraft_arr,
    jbxx_ship_arr,
    xnsx_aircraft_arr,
    xnsx_ship_arr,
    wltx_aircraft_arr,
    wltx_ship_arr,
    gnsx_aircraft_arr,
    gnsx_ship_arr,
    hdtx_aircraft_arr,
    hdtx_ship_arr,
    sbtx_aircraft_arr,
    sbtx_ship_arr,
    tree
} from './mock'


const props = defineProps({
    country: {
        type: String,
        default: ''
    },
    targetType: {
        type: String,
        default: ''
    }
})


const select = ref('')
const targets = ref([])

function initTargets() {
    targets.value = []
    if (!props.country) {
        return
    }
    const type = props.targetType
    if (type === 'aircraft') {
        jbxx_aircraft_arr.forEach(item => {//item：字段集合
            item.forEach(it => {
                if (it.name === '目标名称') {
                    targets.value.push(it.value)
                }
            })
        })
    } else {//@update
        jbxx_ship_arr.forEach(item => {
            item.forEach(it => {
                if (it.name === '目标名称') {
                    targets.value.push(it.value)
                }
            })
        })
    }
    console.log(targets.value, 'options of select')

}

onMounted(() => {
    initTargets()
})

watch(() => props.country, () => {
    initTargets()
})
onBeforeUnmount(() => {
})
</script>

<style lang="scss" scoped>
.description {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .head {
        width: 100%;
        height: 10%;
    }

    .main {
        width: 100%;
        height: 90%;
        display: flex;
        justify-content: space-around;

        .left {
            width: 48%;
            height: 100%;
            border: 1px solid orange;
        }

        .right {
            width: 48%;
            height: 100%;
            border: 1px solid orange;
        }

    }
}
</style>