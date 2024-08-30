<template>
    <div class="card" v-if="isShow">
        <el-card class="card">
            <template #header>
                <div class="card-header">
                    <span class="countryName">{{ props.countryName || '请选择您要查看的国家' }}</span>
                </div>
            </template>
            <div class="classify">
                <div class="aircraft">
                    <div class="title" style="font-weight: 600;font-size: 20px; margin:0 auto ;">战斗机</div>
                    <div class="aircraft-chart chart" ref="aircraftChart">
                        <img class="empty-air" src="src/assets/images/aircraft.png" alt="" v-show="isEmpty">
                        <div class="no-data" v-show="isEmpty">没有结果</div>

                        <!-- <div class="empty-air" v-show="isEmpty" />
                        <div class="no-data" v-show="isEmpty">没有结果</div> -->
                        <!-- <el-empty class="empty" v-show="isEmpty"></el-empty> -->

                        <v-chart :option="airOpt" class="vchart"></v-chart>
                    </div>
                    <el-button type="primary" class="btn-check" round @click="checkAir(props.countryName)"
                        v-show="!isEmpty">查看</el-button>
                </div>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <div class="ship">
                    <div class="title" style="font-weight: 600;font-size: 20px; margin:0 auto ;">舰船</div>
                    <div class="ship-chart chart" ref="shipChart">

                        <img class="empty-ship" src="src/assets/images/ship.png" alt="" v-show="isEmpty">
                        <div class="no-data" v-show="isEmpty">没有结果</div>

                        <!-- <div class="empty-ship" v-show="isEmpty" />
                        <div class="no-data" v-show="isEmpty">没有结果</div> -->
                        <!-- <el-empty class="empty" v-show="isEmpty"></el-empty> -->

                        <v-chart :option="shipOpt" class="vchart"></v-chart>
                    </div>
                    <el-button type="primary" class="btn-check" round @click="checkShip(props.countryName)"
                        v-show="!isEmpty">查看</el-button>
                </div>
            </div>
            <!-- <template #footer>Footer content</template> -->
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref, watch } from 'vue';
import * as THREE from 'three';
import bus from '@/utils/bus';
import { lowerCaseCountryNameMap } from '@/dict/country'


const props = defineProps({
    countryName: {
        type: String,//国家代码转义后的中文
        default: 'test',
    },
})
const isShow = ref(true);
const isEmpty = ref(true)
const toggleShow = () => {
    isShow.value = !isShow.value;
}
defineExpose({ toggleShow })



const airOpt = ref({})
const shipOpt = ref({})

// vchart
let radarGraph_air = {
    axisPointer: {
        link: {
            alignTicks: false
        }
    },
    title: {
    },
    tooltip: {
        trigger: 'item', // 鼠标悬停时触发提示框
        formatter: function (params) {
            // params 是一个数组，包含所有匹配的系列的数据
            var seriesName = params.seriesName; // 获取系列名称
            var dataIndex = params.dataIndex; // 获取数据项的索引
            var value = params.value; // 获取数据项的值
            var legendName = params.name; // 获取图例名称

            // 格式化提示框的显示内容
            return `${legendName} - ${seriesName}<br/>
       作战半径: ${value[0]}公里<br/>
       最大航程: ${value[1]}公里<br/>
       实用航程: ${value[2]}公里<br/>
       最大平飞速度: ${value[3]}马赫<br/>
       巡航速度: ${value[4]}马赫<br/>
       巡航高度: ${value[5]}米<br/>`;
        }
    },
    legend: {
        show: false,
        origin: 'horizontal',
        data: ['F-22A猛禽战斗机', 'F-35A闪电II战斗机', 'F/A-18E/F超级大黄蜂战斗机'],
        textStyle: { // 设置图例文字样式
            color: '#333', // 图例文字颜色
            fontSize: 14 // 图例文字大小
        },
    },
    radar: {
        // shape: 'circle',
        indicator: [
            { name: '作战半径', max: 6000 },
            { name: '最大航程', max: 16000 },
            { name: '实用航程', max: 16000 },
            { name: '最大平飞速度', max: 5 },
            { name: '巡航速度', max: 5 },
            { name: '巡航高度', max: 20000 }
        ]
    },
    series: [
        {
            name: '',
            type: 'radar',
            data: [
                {
                    value: [1965, 5600, 3450, 2.5, 0.95, 13000],
                    name: 'F-22A猛禽战斗机'
                },
                {
                    value: [722, 3330, 2346, 1.8, 1, 12200],
                    name: 'F-35A闪电II战斗机'
                },
                {
                    value: [5500, 11000, 2346, 0.95, 0.85, 12000],
                    name: 'F/A-18E/F超级大黄蜂战斗机'
                }
            ]
        }
    ]
};
let radarGraph_ship = {
    axisPointer: {
        link: {
            alignTicks: false
        }
    },
    title: {
    },
    tooltip: {
        trigger: 'item', // 鼠标悬停时触发提示框
        formatter: function (params) {
            // params 是一个数组，包含所有匹配的系列的数据
            var seriesName = params.seriesName; // 获取系列名称
            var dataIndex = params.dataIndex; // 获取数据项的索引
            var value = params.value; // 获取数据项的值
            var legendName = params.name; // 获取图例名称

            // 格式化提示框的显示内容
            return `${legendName} - ${seriesName}<br/>
       最大航速: ${value[0]}节<br/>
       巡航航速: ${value[1]}节<br/>
       最大吃水: ${value[2]}米<br/>
       燃油储备: ${value[3]}万加仑<br/>
       弹药储备: ${value[4]}吨<br/>
       转弯半径: ${value[5]}米<br/>`;
        }
    },
    legend: {
        show: false,
        origin: 'horizontal',
        data: ['杰拉尔德·R·福特级航空母舰', '黄蜂级两栖攻击舰', '阿利·伯克号驱逐舰'],
        textStyle: { // 设置图例文字样式
            color: '#333', // 图例文字颜色
            fontSize: 14 // 图例文字大小
        },
    },
    radar: {
        // shape: 'circle',
        indicator: [
            { name: '最大航速', max: 100 },
            { name: '巡航速度', max: 100 },
            { name: '最大吃水', max: 20 },
            { name: '燃油储备', max: 10000 },
            { name: '弹药储备', max: 2000 },
            { name: '转弯半径', max: 1500 }
        ]
    },
    series: [
        {
            name: '',
            type: 'radar',
            data: [
                {
                    value: [34.5, 30, 12.5, 9000, 1600, 1000],
                    name: '杰拉尔德·R·福特级航空母舰'
                },
                {
                    value: [20, 20, 7.9, 160, 500, 750],
                    name: '黄蜂级两栖攻击舰'
                },
                {
                    value: [32.5, 20, 10.2, 1200, 600, 650],
                    name: '阿利·伯克号驱逐舰'
                }
            ]
        }
    ]
};

// 暂时硬编码 只加载美国
watch(() => props.countryName,
    (newV) => {
        if (newV === '美国') {
            console.log('usa radar');
            isEmpty.value = false

            airOpt.value = radarGraph_air
            shipOpt.value = radarGraph_ship
        } else {
            isEmpty.value = true
            airOpt.value = {}
            shipOpt.value = {}
        }
    },
    {
        immediate: true
    }
)

const nameMap = {
    '美国': 'us',
    '中国': 'cn',
}
// 查看详情
function checkAir(countryName) {
    const countryCode = nameMap[countryName.toLowerCase()]
    console.log(countryCode, 'air check');

    bus.emit('detailsCheck', { countryCode, type: 'aircraft' })
}
function checkShip(countryName) {
    const countryCode = nameMap[countryName.toLowerCase()]
    console.log(countryCode, 'ship check');
    bus.emit('detailsCheck', { countryCode, type: 'ship' })
}


</script>

<style lang="scss" scoped>
@mixin set-vchart() {
    width: 100%;
    height: 100%;
    // border: 1px solid greenyellow;
    border-radius: 10%;
    margin: 0 auto;
    margin-left: 0.7rem;
    border-bottom: 2px;
}

@mixin set-btn-check {
    width: 80%;
    height: 5%;
    margin: 0 auto;
}

@mixin set-mainLR() {
    width: 55%;
    height: 100%;
    // background-color: blue;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

@mixin set-empty() {
    width: 100%;
    height: 80%;
    margin-top: 5%;
    background-color: red;
    background-size: cover;
    position: absolute;
}

@keyframes zoom {

    0%,
    100% {
        font-size: 16px;
    }

    50% {
        font-size: 20px;
    }
}


.card {
    width: 100%;
    height: 100%;
    background-color: transparent;
    opacity: 90%;
    padding: 0;
    border: 0;

    .card-header {
        padding-left: 3%;
        // padding-top: 1%;
        font-weight: 900;
        color: rgb(5, 249, 54);
        font-family: 'Times New Roman', Times, serif;
        font-size: 1.5rem;
    }


    // @update
    .classify {
        width: 90%;
        height: 20rem;
        margin: 0 auto;
        padding: 0;
        padding-top: 1rem;
        // background-color: rgb(26, 219, 193);
        display: flex;
        justify-content: space-between;

        .aircraft {
            @include set-mainLR();
            position: relative;

            .title {
                position: absolute;
                top: -2rem;
                left: 50%;
                transform: translateX(-50%);
                color: aliceblue;
            }

            .title:hover {
                animation: zoom 0.5s;
            }

            .chart {
                @include layout100('%');

                // border: 1px solid greenyellow;
                .empty-air {
                    @include set-empty();
                    background-image: url('src/assets/images/aircraft.png');
                    left: 0;


                }

                .empty-ship:hover {
                    cursor: auto;
                }

                .no-data {
                    color: antiquewhite;
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%)
                }

                // .vchart {
                //     @include set-vchart()
                // }
            }

            .btn-check {
                @include set-btn-check()
            }
        }

        .ship {
            @include set-mainLR();
            position: relative;

            .title {
                position: absolute;
                top: -2rem;
                left: 50%;
                transform: translateX(-50%);
                color: aliceblue;
            }

            .title:hover {
                animation: zoom 0.5s;
            }

            .chart {
                @include layout100('%');
                // border: 1px solid greenyellow;

                .vchart {
                    @include set-vchart()
                }

                .empty-ship {
                    @include set-empty();
                    background-image: url('src/assets/images/ship.png');
                    right: 0%;
                }

                .empty-ship:hover {
                    cursor: auto;
                }

                .no-data {
                    color: antiquewhite;
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%)
                }
            }

            .btn-check {
                @include set-btn-check()
            }
        }
    }
}
</style>