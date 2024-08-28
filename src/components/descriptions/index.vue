<!-- targetType ：aircraft / ship -->

<template>
    <div class="description">
        <div class="head">
            <el-select v-model="select" placeholder="请选择具体目标" size="large">
                <el-option v-for="item in targets" :key="item" :label="item" :value="item" />
            </el-select>
        </div>
        <div class="main">
            <div class="left">
                <el-collapse v-model="collapsedNames" @change="collapseChange" v-if="isCollapse">
                    <el-form :model="dialogForm" label-width="120px" style="max-width: 1000px; margin: 10px auto">
                        <el-collapse-item title="基本标识属性:" name="1">
                            <el-row :gutter="gutter">
                                <el-col :span="12" v-for="item in obj[select]">
                                    <el-form-item :label="item.name">
                                        <el-input v-model="item.value" :title="item.value" disabled />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-collapse-item>
                        <el-collapse-item title="性能属性:" name="2">
                            <el-row :gutter="gutter">
                                <el-col :span="12" v-for="item in obj1[select]">
                                    <el-form-item :label="item.name">
                                        <el-input v-model="item.value" :title="item.value" disabled />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-collapse-item>
                        <el-collapse-item title="物理特性:" name="3">
                            <el-row :gutter="gutter">
                                <el-col :span="12" v-for="item in obj2[select]">
                                    <el-form-item :label="item.name">
                                        <el-input v-model="item.value" :title="item.value" disabled />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-collapse-item>
                        <el-collapse-item title="功能属性:" name="4">
                            <el-row :gutter="gutter">
                                <el-col :span="12" v-for="item in obj3[select]">
                                    <el-form-item :label="item.name">
                                        <el-input v-model="item.value" :title="item.value" disabled />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-collapse-item>
                        <el-collapse-item title="活动特性:" name="5">
                            <el-row :gutter="gutter">
                                <el-col :span="12" v-for="item in obj4[select]">
                                    <el-form-item :label="item.name">
                                        <el-input v-model="item.value" :title="item.value" disabled />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-collapse-item>
                        <el-collapse-item title="识别特性:" name="6">
                            <el-row :gutter="gutter">
                                <el-col :span="12" v-for="item in obj5[select]">
                                    <el-form-item :label="item.name">
                                        <el-input v-model="item.value" :title="item.value" disabled />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-collapse-item>
                    </el-form>
                </el-collapse>
                <el-empty class="empty" description="请选择一个战斗机型号" v-if="isEmptyAir" />
                <el-empty class="empty" description="请选择一个舰船型号" v-if="isEmptyShip" />
            </div>
            <div class="right">
                <Chart />
            </div>
        </div>
    </div>
</template>

<script setup >
import { onMounted } from 'vue';
import Chart from './chart.vue'
import axios from 'axios'
import bus from '@/utils/bus'
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
const gutter = ref(20);//折叠项间距

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
const collapsedNames = ref([])

function initTargets() {
    targets.value = []
    if (!props.country) {
        return
    }
    // mock ！
    if (props.country.includes('法') || props.country.includes('英') || props.country.includes('俄') || props.country.includes('日')) {
        return
    }
    // 
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

// 下拉框数据初始化
watch(() => props.country, () => {
    initTargets()
})

const isCollapse = ref(false)
const isEmptyAir = ref(false)
const isEmptyShip = ref(false)
watch(() => select.value,
    (newV) => {
        if (!newV) {
            isCollapse.value = false
            if (props.targetType === 'aircraft')
                isEmptyAir.value = true
            else
                isEmptyShip.value = true
        } else {
            bus.emit('chartChange', select.value)
            isCollapse.value = true
            isEmptyAir.value = false
            isEmptyShip.value = false
        }
    },
    {
        immediate: true
    })
const obj = ref([])
const obj1 = ref([])
const obj2 = ref([])
const obj3 = ref([])
const obj4 = ref([])
const obj5 = ref([])
onMounted(async () => {
    const response = await axios.get("./data.json");
    let data = JSON.parse(JSON.stringify(response.data));
    obj.value = data.jbxx;
    obj1.value = data.xnsx;
    obj2.value = data.wltx;
    obj3.value = data.gnsx;
    obj4.value = data.hdtx;
    obj5.value = data.sbtx;
});

function collapseChange() {
    console.log(obj.value, ' collapseChange')
}



onBeforeUnmount(() => {
})
</script>

<style lang="scss" scoped>
.description {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: scroll;

    .head {
        width: 80%;
        height: 10%;
        margin: 0 auto;
    }

    .main {
        width: 100%;
        height: 90%;
        display: flex;
        justify-content: space-around;

        .left {
            width: 60%;
            height: 100%;

            // border: 1px solid orange;
            // box-shadow: 10px, 10px, 10px, 10px, rgb(59, 55, 55, 0.5);
            .empty {
                width: 100%;
                height: 100%;
            }
        }

        .right {
            width: 35%;
            height: 100%;
            border: 1px solid orange;
        }

    }
}
</style>