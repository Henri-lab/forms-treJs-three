<template>
    <button @click="getScene">getScene</button>
    <button @click="getDynamicEdge">getDynamicEdge</button>
    <div class="relation">
        <div class="pane" ref="paneRef" v-mouse-follow v-draggable v-if="isPane">
            正在查看： {{ curLabel }}
            <div class="close" @click="handleClose">X</div>
        </div>
        <TresCanvas clear-color="#006400">
            <Context ref="ctx"></Context>
            <OrbitControls></OrbitControls>
            <TresPerspectiveCamera />
            <!-- <Box ref="boxRef" :args="[1, 1, 1]" :position="[0, 4, 0]">
                <TresMeshToonMaterial color="orange" />
            </Box> -->
            <Suspense>
                <TresMesh v-for="(item, index) in testData" :key="index" @click="handleClick($event, item.label)"
                    :position="[item.x, item.y, item.z]">
                    <Sphere :arg="[1, 1, 1]">
                        <TresMeshBasicMaterial :map="texture" />
                    </Sphere>
                </TresMesh>
            </Suspense>
        </TresCanvas>
    </div>
</template>

<script setup>
import Context from './Context.vue'
import { TresCanvas, useRenderLoop, useLoader } from '@tresjs/core'
import {
    OrbitControls,
    Stars,
    MeshGlassMaterial,
    MeshWobbleMaterial,
    Sphere,
    Circle,
    Plane,
    Box,
    MouseParallax,
    CustomShaderMaterial,
    Sparkles,
    Lensflare,
    CatmullRomCurve3,
    SVG,
    Ring,
    Sky,
    useVideoTexture
} from '@tresjs/cientos'
import { computed, ref } from 'vue';
import * as _3 from 'three'
import { get } from 'http';

const texture = ref(null)
useLoader(_3.TextureLoader, 'src/assets/airShip/f22a.png').then(res => {
    texture.value = res
    console.log(texture.value, 'text')
})


const props = defineProps({
    nodes: {
        type: String,
        required: true,
    },
})

const testData = ref([
    {
        id: 'F22a',
        x: 0,
        y: 0,
        z: 0,
        label: 'F22a',
        value: 10
    },
    {
        id: 'F15A',
        x: 5,
        y: 0,
        z: 0,
        label: 'F15A',
        value: 5
    },
    {
        id: 'F3bc',
        x: -5,
        y: 0,
        z: 0,
        label: 'F3bc',
        value: 20
    },

])
//options
const edgesOpt = ref([
    {
        source: 'F22a',
        target: 'F15A',
        value: 10
    },
    {
        source: 'F22a',
        target: 'F3bc',
        value: 5
    },
    {
        source: 'F3bc',
        target: 'F15A',
        value: 20
    },
])

//根据edge配置找到对应的节点 并生成 线集合
function createEdges(nodes, edges, { isDynamic, step }) {
    return edges.map(edge => {
        const sourceNode = nodes.value.find(node => node.id === edge.source)
        const targetNode = nodes.value.find(node => node.id === edge.target)
        if (sourceNode && targetNode) {
            const linePos = createLinePos(sourceNode, targetNode, { isDynamic, step })//动态线
            return linePos
        } else {
            return null
        }
    })
}


function createLinePos(sourceNode, targetNode, { isDynamic, step }) {
    if (isDynamic) {
        return interpolatePoints(sourceNode, targetNode, step)
    } else {
        return [[sourceNode.x, sourceNode.y, sourceNode.z], [targetNode.x, targetNode.y, targetNode.z]]
    }
}

function interpolatePoints(sourceNode, targetNode, step) {
    const deltaX = targetNode.x - sourceNode.x;
    const deltaY = targetNode.y - sourceNode.y;
    const deltaZ = targetNode.z - sourceNode.z;
    const numSteps = Math.ceil(Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ) / step);//步数=总长 / 步长
    const points = [];

    for (let i = 0; i <= numSteps; i++) {
        const t = i / numSteps;//行进进度  // 比例要求：(行进进度与时间成正比 >>> 时间与步长成正比 >>> #步长大则行进快)
        const x = sourceNode.x + t * deltaX;//行进长度=总长 * 行进进度 
        const y = sourceNode.y + t * deltaY;
        const z = sourceNode.z + t * deltaZ;
        points.push([x, y, z]);
    }

    return points;
}
// const nodes = computed(() => props.nodes)
// nodes.forEach(node => {
//     const { x, y, z, value, label } = node
// })
const ctx = ref()
const getScene = () => {
    console.log('sfsfs');
    const sceneRef = ctx.value.getScene()
    console.log(sceneRef.value, 'scence')
}



const edgePosArr = ref([])
const getDynamicEdge = () => {
    const linePosArr = createEdges(testData, edgesOpt, { isDynamic: true, step: 0.2 })

    for (let i = 0; i < linePosArr.length - 1; i++) {
        if (linePosArr[i]) {
            edgePosArr.value.push(linePosArr[i])
        } else continue
    }

    console.log(edgePosArr.value,'dynamic: pos in diff time')
}

const curLabel = ref('')
const paneRef = ref()
const isPane = ref(false)
const handleClick = (event, label) => {
    console.log(event, label, 'click')
    curLabel.value = label
    isPane.value = true
}
const handleClose = () => {
    isPane.value = false
}
</script>

<style lang="scss" scoped>
.relation {
    margin: 0 auto;
    width: 60rem;
    height: 40rem;


    .pane {
        width: 10rem;
        height: 2rem;
        background-color: antiquewhite;
        font-size: 20px;
        color: black;
        position: absolute;
        padding-top: 2%;
        padding-bottom: 0;
        z-index: 999;

    }

    .close {
        width: 1rem;
        height: 1.5rem;
        text-align: center;
        position: absolute;
        top: 0;
        right: 0;
    }

    .close:hover {
        cursor: pointer;
        background-color: red;
    }
}
</style>