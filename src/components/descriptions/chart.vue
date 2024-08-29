<template>
    <div class="map">
        <v-chart class="vchart pie" :option="pieOpt"></v-chart>
        <v-chart class="vchart relation" :option="relationOpt"></v-chart>
    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import axios from 'axios';
import bus from '@/utils/bus';

const pieOpt = ref({})

// const colors = ['#FFAE57', '#FF7853', '#EA5151', '#CC3F57', '#9A2555'];
// const bgColor = '#2E2733';
// const itemStyle = {
//     star5: {
//         color: colors[0]
//     },
//     star4: {
//         color: colors[1]
//     },
//     star3: {
//         color: colors[2]
//     },
//     star2: {
//         color: colors[3]
//     }
// };
// const data = [
//     {
//         name: '虚构',
//         itemStyle: {
//             color: colors[1]
//         },
//         children: [
//             {
//                 name: '小说',
//                 children: [
//                     {
//                         name: '5☆',
//                         children: [
//                             {
//                                 name: '疼'
//                             },
//                             {
//                                 name: '慈悲'
//                             },
//                             {
//                                 name: '楼下的房客'
//                             }
//                         ]
//                     },
//                     {
//                         name: '4☆',
//                         children: [
//                             {
//                                 name: '虚无的十字架'
//                             },
//                             {
//                                 name: '无声告白'
//                             },
//                             {
//                                 name: '童年的终结'
//                             }
//                         ]
//                     },
//                     {
//                         name: '3☆',
//                         children: [
//                             {
//                                 name: '疯癫老人日记'
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 name: '其他',
//                 children: [
//                     {
//                         name: '5☆',
//                         children: [
//                             {
//                                 name: '纳博科夫短篇小说全集'
//                             }
//                         ]
//                     },
//                     {
//                         name: '4☆',
//                         children: [
//                             {
//                                 name: '安魂曲'
//                             },
//                             {
//                                 name: '人生拼图版'
//                             }
//                         ]
//                     },
//                     {
//                         name: '3☆',
//                         children: [
//                             {
//                                 name: '比起爱你，我更需要你'
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         name: '非虚构',
//         itemStyle: {
//             color: colors[2]
//         },
//         children: [
//             {
//                 name: '设计',
//                 children: [
//                     {
//                         name: '5☆',
//                         children: [
//                             {
//                                 name: '无界面交互'
//                             }
//                         ]
//                     },
//                     {
//                         name: '4☆',
//                         children: [
//                             {
//                                 name: '数字绘图的光照与渲染技术'
//                             },
//                             {
//                                 name: '日本建筑解剖书'
//                             }
//                         ]
//                     },
//                     {
//                         name: '3☆',
//                         children: [
//                             {
//                                 name: '奇幻世界艺术\n&RPG地图绘制讲座'
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 name: '社科',
//                 children: [
//                     {
//                         name: '5☆',
//                         children: [
//                             {
//                                 name: '痛点'
//                             }
//                         ]
//                     },
//                     {
//                         name: '4☆',
//                         children: [
//                             {
//                                 name: '卓有成效的管理者'
//                             },
//                             {
//                                 name: '进化'
//                             },
//                             {
//                                 name: '后物欲时代的来临'
//                             }
//                         ]
//                     },
//                     {
//                         name: '3☆',
//                         children: [
//                             {
//                                 name: '疯癫与文明'
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 name: '心理',
//                 children: [
//                     {
//                         name: '5☆',
//                         children: [
//                             {
//                                 name: '我们时代的神经症人格'
//                             }
//                         ]
//                     },
//                     {
//                         name: '4☆',
//                         children: [
//                             {
//                                 name: '皮格马利翁效应'
//                             },
//                             {
//                                 name: '受伤的人'
//                             }
//                         ]
//                     },
//                     {
//                         name: '3☆'
//                     },
//                     {
//                         name: '2☆',
//                         children: [
//                             {
//                                 name: '迷恋'
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 name: '居家',
//                 children: [
//                     {
//                         name: '4☆',
//                         children: [
//                             {
//                                 name: '把房子住成家'
//                             },
//                             {
//                                 name: '只过必要生活'
//                             },
//                             {
//                                 name: '北欧简约风格'
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 name: '绘本',
//                 children: [
//                     {
//                         name: '5☆',
//                         children: [
//                             {
//                                 name: '设计诗'
//                             }
//                         ]
//                     },
//                     {
//                         name: '4☆',
//                         children: [
//                             {
//                                 name: '假如生活糊弄了你'
//                             },
//                             {
//                                 name: '博物学家的神秘动物图鉴'
//                             }
//                         ]
//                     },
//                     {
//                         name: '3☆',
//                         children: [
//                             {
//                                 name: '方向'
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 name: '哲学',
//                 children: [
//                     {
//                         name: '4☆',
//                         children: [
//                             {
//                                 name: '人生的智慧'
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 name: '技术',
//                 children: [
//                     {
//                         name: '5☆',
//                         children: [
//                             {
//                                 name: '代码整洁之道'
//                             }
//                         ]
//                     },
//                     {
//                         name: '4☆',
//                         children: [
//                             {
//                                 name: 'Three.js 开发指南'
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]
//     }
// ];
// for (let j = 0; j < data.length; ++j) {
//     let level1 = data[j].children;
//     for (let i = 0; i < level1.length; ++i) {
//         let block = level1[i].children;
//         let bookScore = [];
//         let bookScoreId;
//         for (let star = 0; star < block.length; ++star) {
//             let style = (function (name) {
//                 switch (name) {
//                     case '5☆':
//                         bookScoreId = 0;
//                         return itemStyle.star5;
//                     case '4☆':
//                         bookScoreId = 1;
//                         return itemStyle.star4;
//                     case '3☆':
//                         bookScoreId = 2;
//                         return itemStyle.star3;
//                     case '2☆':
//                         bookScoreId = 3;
//                         return itemStyle.star2;
//                 }
//             })(block[star].name);
//             block[star].label = {
//                 color: style.color,
//                 downplay: {
//                     opacity: 0.5
//                 }
//             };
//             if (block[star].children) {
//                 style = {
//                     opacity: 1,
//                     color: style.color
//                 };
//                 block[star].children.forEach(function (book) {
//                     book.value = 1;
//                     book.itemStyle = style;
//                     book.label = {
//                         color: style.color
//                     };
//                     let value = 1;
//                     if (bookScoreId === 0 || bookScoreId === 3) {
//                         value = 5;
//                     }
//                     if (bookScore[bookScoreId]) {
//                         bookScore[bookScoreId].value += value;
//                     } else {
//                         bookScore[bookScoreId] = {
//                             color: colors[bookScoreId],
//                             value: value
//                         };
//                     }
//                 });
//             }
//         }
//         level1[i].itemStyle = {
//             color: data[j].itemStyle.color
//         };
//     }
// }
// let option = {
//     backgroundColor: bgColor,
//     // color: colors,
//     series: [
//         {
//             type: 'sunburst',
//             center: ['50%', '48%'],
//             data: data,
//             sort: function (a, b) {
//                 if (a.depth === 1) {
//                     return b.getValue() - a.getValue();
//                 } else {
//                     return a.dataIndex - b.dataIndex;
//                 }
//             },
//             label: {
//                 rotate: 'radial',
//                 color: bgColor
//             },
//             itemStyle: {
//                 borderColor: bgColor,
//                 borderWidth: 2
//             },
//             levels: [
//                 {},
//                 {
//                     r0: 0,
//                     r: 40,
//                     label: {
//                         rotate: 0
//                     }
//                 },
//                 {
//                     r0: 40,
//                     r: 105,
//                     label: {
//                         rotate: 90
//                     }
//                 },
//                 {
//                     r0: 115,
//                     r: 140,
//                     itemStyle: {
//                         shadowBlur: 2,
//                         shadowColor: colors[2],
//                         color: 'transparent'
//                     },
//                     label: {
//                         rotate: 'tangential',
//                         fontSize: 10,
//                         color: colors[0]
//                     }
//                 },
//                 {
//                     r0: 140,
//                     r: 145,
//                     itemStyle: {
//                         shadowBlur: 80,
//                         shadowColor: colors[0]
//                     },
//                     label: {
//                         position: 'outside',
//                         textShadowBlur: 5,
//                         textShadowColor: '#333'
//                     },
//                     downplay: {
//                         label: {
//                             opacity: 0.5
//                         }
//                     }
//                 }
//             ]
//         }
//     ]
// }



// mock
let pieMock1 = {
    backgroundColor: '#2c343c',
    title: {
        text: '综合评分',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },
    tooltip: {
        trigger: 'item'
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
            name: 'Access From',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
                { value: 335, name: '速度' },
                { value: 310, name: '弹药量' },
                { value: 274, name: '续航' },
                { value: 235, name: '成本' },
                { value: 400, name: '反侦察' }
            ].sort(function (a, b) {
                return a.value - b.value;
            }),
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
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
};
let pieMock2 = {
    backgroundColor: '#2c343c',
    title: {
        text: '综合评分',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },
    tooltip: {
        trigger: 'item'
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
            name: 'Access From',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
                { value: 205, name: '速度' },
                { value: 710, name: '弹药量' },
                { value: 174, name: '续航' },
                { value: 285, name: '成本' },
                { value: 40, name: '反侦察' }
            ].sort(function (a, b) {
                return a.value - b.value;
            }),
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
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
};
let pieMock3 = {
    backgroundColor: '#2c343c',
    title: {
        text: '综合评分',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },
    tooltip: {
        trigger: 'item'
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
            name: 'Access From',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
                { value: 325, name: '速度' },
                { value: 310, name: '弹药量' },
                { value: 274, name: '续航' },
                { value: 809, name: '成本' },
                { value: 600, name: '反侦察' }
            ].sort(function (a, b) {
                return a.value - b.value;
            }),
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
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
};
let pieMock4 = {
    backgroundColor: '#2c343c',
    title: {
        text: '综合评分',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },
    tooltip: {
        trigger: 'item'
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
            name: 'Access From',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
                { value: 625, name: '速度' },
                { value: 310, name: '弹药量' },
                { value: 774, name: '续航' },
                { value: 839, name: '成本' },
                { value: 600, name: '反侦察' }
            ].sort(function (a, b) {
                return a.value - b.value;
            }),
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
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
};
let pieMock5 = {
    backgroundColor: '#2c343c',
    title: {
        text: '综合评分',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },
    tooltip: {
        trigger: 'item'
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
            name: 'Access From',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
                { value: 425, name: '速度' },
                { value: 210, name: '弹药量' },
                { value: 574, name: '续航' },
                { value: 309, name: '成本' },
                { value: 100, name: '反侦察' }
            ].sort(function (a, b) {
                return a.value - b.value;
            }),
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
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
};
let pieMock6 = {
    backgroundColor: '#2c343c',
    title: {
        text: '综合评分',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },
    tooltip: {
        trigger: 'item'
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
            name: 'Access From',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
                { value: 325, name: '速度' },
                { value: 910, name: '弹药量' },
                { value: 174, name: '续航' },
                { value: 909, name: '成本' },
                { value: 100, name: '反侦察' }
            ].sort(function (a, b) {
                return a.value - b.value;
            }),
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
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
};






const relationOpt = ref({})
let nodesAir = [
    {
        id: 'F22',
        name: 'F-22A猛禽战斗机',
        category: 'Fighter',
        value: 100, // 可以表示战斗机的一些量化属性，如性能指数
        // 自定义属性，比如战斗机图标的URL
        icon: 'path/to/f22-icon.png',
        // 节点的初始位置，可以是二维或三维坐标
        x: 100,
        y: 200,
        // z: 50,
        // 节点样式，如边框、背景色等
        itemStyle: {
            color: '#ff0000', // 节点颜色
            borderColor: '#000000', // 边框颜色
            borderWidth: 2 // 边框宽度
        },
        label: {
            show: true,
            formatter: '{b}',
            color: '#ffffff' // 文字颜色
        }
    },
    {
        id: 'F35',
        name: 'F-35A闪电II战斗机',
        category: 'Fighter',
        value: 95,
        icon: 'path/to/f35-icon.png',
        x: 300,
        y: 100,
        itemStyle: {
            color: '#00ff00'
        },
        label: {
            show: true,
            formatter: '{b}'
        }
    },
    // 根据需要添加更多战斗机节点...
];

let edgesAir = [
    {
        source: 'F22',
        target: 'F35'
    },
    // 可以添加更多边来表示其他战斗机之间的关系...
];
let relationMock1 = {
    backgroundColor: '#000',
    series: [
        {
            type: 'graphGL',
            nodes: nodesAir,
            edges: edgesAir,
            modularity: {
                resolution: 2,
                sort: true
            },
            lineStyle: {
                color: 'rgba(255,255,255,1)',
                opacity: 0.05
            },
            itemStyle: {
                opacity: 1
                // borderColor: '#fff',
                // borderWidth: 1
            },
            focusNodeAdjacency: false,
            focusNodeAdjacencyOn: 'click',
            symbolSize: function (value) {
                return Math.sqrt(value / 10);
            },
            label: {
                color: '#fff'
            },
            emphasis: {
                label: {
                    show: false
                },
                lineStyle: {
                    opacity: 0.5,
                    width: 4
                }
            },
            forceAtlas2: {
                steps: 5,
                stopThreshold: 20,
                jitterTolerence: 10,
                edgeWeight: [0.2, 1],
                gravity: 5,
                edgeWeightInfluence: 0
                // preventOverlap: true
            }
        }
    ]
};



bus.on('chartChange', (select => {
    if (select === 'F-22A猛禽战斗机') {
        pieOpt.value = pieMock1
        relationOpt.value = relationMock1
    } else if (select === 'F-35A闪电II战斗机') {
        pieOpt.value = pieMock2
    } else if (select === 'F/A-18E/F超级大黄蜂战斗机') {
        pieOpt.value = pieMock3
    } else if (select === '杰拉尔德·R·福特级航空母舰') {
        pieOpt.value = pieMock4
    } else if (select === '黄蜂级两栖攻击舰') {
        pieOpt.value = pieMock5
    } else {
        pieOpt.value = pieMock6
    }
}))


</script>

<style lang="scss" scoped>
.map {
    width: 100%;
    height: 100%;

    .vchart {
        width: auto;
        height: 100%;

    }
}
</style>