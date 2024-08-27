<template>
    <div class="card" v-if="isShow">
        <el-card class="card">
            <template #header>
                <div class="card-header">
                    <span class="countryName">{{ props.countryName }}</span>
                </div>
            </template>
            <div class="classify">
                <div class="aircraft">
                    <div class="aircraft-chart chart" ref="aircraftChart">
                        <v-chart :option="airOpt" class="vchart"></v-chart>
                    </div>
                    <el-button type="primary" class="btn-check" round @click="checkAir(props.countryName)">查看</el-button>
                </div>
                <div class="ship">
                    <div class="ship-chart chart" ref="shipChart">
                        <v-chart :option="shipOpt" class="vchart"></v-chart>
                    </div>
                    <el-button type="primary" class="btn-check" round @click="checkShip(props.countryName)">查看</el-button>
                </div>
            </div>
            <!-- <template #footer>Footer content</template> -->
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue';
import * as THREE from 'three';
import bus from '@/utils/bus';

const props = defineProps({
    countryName: {
        type: String,
        default: 'test',
    },
})
const isShow = ref(true);
const toggleShow = () => {
    isShow.value = !isShow.value;
}
defineExpose({ toggleShow })
const airOpt = ref({
    backgroundColor: 'black',

    title: {
        text: '飞机目标',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },

    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 274, name: '联盟广告' },
                { value: 235, name: '视频广告' },
                { value: 400, name: '搜索引擎' }
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
            },
            itemStyle: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx: any) {
                return Math.random() * 200;
            }
        }
    ]
})
const shipOpt = ref({
    backgroundColor: 'black',

    title: {
        text: '舰艇目标',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },

    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 274, name: '联盟广告' },
                { value: 235, name: '视频广告' },
                { value: 400, name: '搜索引擎' }
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
            },
            itemStyle: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx: any) {
                return Math.random() * 200;
            }
        }
    ]
})
onMounted(() => {
})


function checkAir(country) {
    bus.emit('detailsCheck', { country, type: 'aircraft' })
}
function checkShip(country) {
    bus.emit('detailsCheck', { country, type: 'ship' })
}


</script>

<style lang="scss" scoped>
.countryName {
    font-weight: 900;
    color: rgb(5, 249, 54);
    font-family: 'Times New Roman', Times, serif;
    font-size: 1.5rem;

}

.card {
    width: 100%;
    height: auto;
    background-color: transparent;
    opacity: 90%;
    padding: 0;


    // @update
    .classify {
        width: 90%;
        height: 20rem;
        // background-color: rgb(26, 219, 193);
        padding: 0;
        display: flex;
        margin: 0 auto;
        justify-content: center;

        .aircraft {
            width: 50%;
            height: 100%;
            // background-color: green;
            display: flex;
            justify-content: center;
            flex-direction: column;

            .chart {
                width: 100%;
                height: 95%;
                // border: 1px solid greenyellow;

                .vchart {
                    width: 100%;
                    height: 100%;
                    border: 1px solid greenyellow;
                    border-bottom: 2px;
                    border-radius: 10%;
                    margin: 0 auto;
                }
            }

            .btn-check {
                width: 80%;
                height: 5%;
                margin: 0 auto;
            }
        }

        .ship {
            width: 50%;
            height: 100%;
            // background-color: blue;
            display: flex;
            flex-direction: column;
            justify-content: center;


            .chart {
                width: 100%;
                height: 95%;
                // border: 1px solid greenyellow;

                .vchart {
                    width: 100%;
                    height: 100%;
                    border: 1px solid greenyellow;
                    border-radius: 10%;
                    margin: 0 auto;
                    border-bottom: 2px;

                }
            }

            .btn-check {
                width: 80%;
                height: 5%;
                margin: 0 auto;
            }
        }
    }
}
</style>