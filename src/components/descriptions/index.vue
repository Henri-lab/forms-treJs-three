<!-- targetType ：aircraft / ship -->

<template>
    <div class="description">
        <div class="head">
            <el-select v-model="select" placeholder="请选择具体目标" size="large" allow-create filterable>
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
                <el-empty class="empty" description="请选择一个战斗机型号" image="src/assets/images/aircraft.png" image-size="500"
                    v-if="isEmptyAir && !loadAllTypeFlag" />
                <el-empty class="empty" description="请选择一个舰船型号" image="src/assets/images/ship.png" image-size="500"
                    v-if="isEmptyShip && !loadAllTypeFlag" />
            </div>
            <div class="right">
                <Chart class="vchart" />
                <!-- <Relation class="relation" v-draggable/> -->
            </div>
        </div>
    </div>
</template>

<script setup >
import { onMounted } from 'vue';
import Chart from './chart.vue'
import axios from 'axios'
import bus from '@/utils/bus'
import Relation from '~c/RelationEcharts.vue'
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
const select = ref('')
const targets = ref([])
const collapsedNames = ref([])
const targetNames = Object.keys(data['jbxx'])

const props = defineProps({
    // 查看的国家
    country: {
        type: String,
        default: ''
    },
    // 查看的类型
    targetType: {
        type: String,
        default: ''
    },
    // 搜索框输入
    search: {
        type: Object,
        default: () => {
            return {
                name: '',
                country: '',
                type: '',
            }
        }
    }
})
let loadAllTypeFlag = ref(0)
// 下拉框初始化
function initTargets() {
    targets.value = []
    if (!props.country) {
        return
    }
    // mock ！
    if (props.country.includes('法') || props.country.includes('英') || props.country.includes('俄') || props.country.includes('日') || props.country.includes('中')) {
        return
    }
    // 
    const type = props.targetType
    if (type === 'aircraft') {
        loadAllTypeFlag.value = 0
        jbxx_aircraft_arr.forEach(item => {//item：字段集合
            item.forEach(it => {
                if (it.name === '目标名称') {
                    targets.value.push(it.value)
                }
            })
        })
    } else if (type === 'ship') {//@update
        loadAllTypeFlag.value = 0
        jbxx_ship_arr.forEach(item => {
            item.forEach(it => {
                if (it.name === '目标名称') {
                    targets.value.push(it.value)
                }
            })
        })
    } else {
        loadAllTypeFlag = 1
        targets.value = targetNames
    }
    console.log(targets.value, 'options of select')

}
onMounted(() => {
    initTargets()
})
watch(() => props.country, () => {
    initTargets()
})

const isCollapse = ref(false)
const isEmptyAir = ref(false)
const isEmptyShip = ref(false)
watch(
    () => select.value,
    (newV) => {
        if (!newV) {//没有进行下拉选择
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
    }
)
// 六项表数据源
/**
 * @description:基本信息
 * */
const obj = ref([])
/**
 * @description:性能属性
 * */
const obj1 = ref([])
/**
 * @description:物理特性
 * */
const obj2 = ref([])
/**
 * @description:功能特性
 * */
const obj3 = ref([])
/**
 * @description:活动特性
 * */
const obj4 = ref([])
/**
 * @description:sb特性
 * */
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



watch(() => props.search,
    (newV) => {
        if (newV) {
            const { name, countryCode, type } = newV
            // console.log(targetNames, 'ad')
            // if (targetNames.includes(name)) {
            //     console.log('搜索到了')
            // }
            bus.emit('detailsCheck', { countryCode, type })
        }

    }, { immediate: true }
)



// bus.on('searchRes', (para) => {
//     console.log('get seach')
//     // console.log(para, 'search', allTarget.value, '已有')
// })


onBeforeUnmount(() => {
})
</script>

<style lang="scss" scoped>
.description {
    display: flex;
    flex-direction: column;
    @include layout100('%');
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
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            // border: 1px solid orange;
            .vchart {
                width: 100%;
                height: 50%;
            }

            .relation {
                width: 100%;
                height: 50%;
            }
        }

    }
}
</style>