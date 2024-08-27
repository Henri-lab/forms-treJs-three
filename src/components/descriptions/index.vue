<template>
    <div class="description">
        <el-select v-model="select" placeholder="请选择具体目标" size="large">
            <el-option v-for="item in targets" :key="item" :label="item" :value="item" />
        </el-select>
    </div>
</template>

<script setup >
import { onMounted } from 'vue';
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
    if (!props.country) {
        targets.value = []
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

<style scoped></style>