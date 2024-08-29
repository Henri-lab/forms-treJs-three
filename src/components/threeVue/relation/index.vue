<template>
    <button @click="getScene">getScene</button>
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

<script setup lang="ts">
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
        x: 0,
        y: 0,
        z: 0,
        label: 'F22a',
        value: 10
    },
    {
        x: 5,
        y: 0,
        z: 0,
        label: 'bbb',
        value: 5
    },
    {
        x: -5,
        y: 0,
        z: 0,
        label: 'ccc',
        value: 20
    },

])

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
        position:absolute;
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