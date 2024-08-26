<script setup lang="ts">
//@ts-nocheck
import { ref, onMounted, shallowRef, Ref, computed } from 'vue';
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import {
    OrbitControls,
    Stars,
    MeshGlassMaterial,
    MeshWobbleMaterial,
    Sphere,
    Circle,
    MouseParallax,
    CustomShaderMaterial,
    Sparkles,
    Lensflare,
    CatmullRomCurve3,
    SVG
} from '@tresjs/cientos'
import mitt from 'mitt'

const bus = mitt()




const yRotation = shallowRef(0)
useRenderLoop().onLoop(({ delta }) => {
    yRotation.value += 0.1 * delta
})


const lightRef = shallowRef()

useRenderLoop().onLoop(({ elapsed }) => {
    if (lightRef.value) {
        lightRef.value.position.x = Math.cos(elapsed) * 2.5
        lightRef.value.position.y = Math.sin(elapsed) * 2.5
    }
})

const cameraZ = ref(2000); // camera startPos
const animateCamera = () => {
    if (cameraZ.value > 13) {
        cameraZ.value -= 7; //speed
        requestAnimationFrame(animateCamera);
    }
};

onMounted(() => {
    requestAnimationFrame(animateCamera);
});

const planets = ref([
    { x: -13, y: 5, z: -8, id: 0, svg: '@/assets/flagSVG/us.svg' },
    { x: -4, y: 0, z: 2, id: 1, svg: '@/assets/flagSVG/cn.svg' },
])

// 直线
const orbitPos = computed(() => {
    return planets.value.map((planet) => [planet.x, planet.y, planet.z]);
});
// 曲线
// const orbitPos = ref([]) as any

// onMounted(() => {
//     const centerX = (-13 + -4) / 2;  // 中心点的x坐标
//     const centerY = (5 + 0) / 2;     // 中心点的y坐标
//     const centerZ = (-8 + 2) / 2;    // 中心点的z坐标

//     const radius = Math.sqrt(Math.pow(-13 - centerX, 2) + Math.pow(5 - centerY, 2) + Math.pow(-8 - centerZ, 2));  // 半径
//     const numPoints = 8;  // 你可以根据需要增加或减少点的数量

//     for (let i = 0; i < numPoints; i++) {
//         const angle = (2 * Math.PI * i) / numPoints;
//         const x = centerX + radius * Math.cos(angle) || 0;
//         const y = centerY + radius * Math.sin(angle);
//         const z = centerZ;  // 假设轨道在同一个z平面上

//         orbitPos.value.push({ x, y, z, id: i + 2 });  // 新生成点的id从2开始
//     }
// })
const plane = planets.value[0]
const warship = planets.value[1]

</script>

<style lang="scss" scoped>
.galaxy {
    width: 100%;
    height: 100%;
    position: relative;

    .star {
        width: 100%;
        height: 100%;
        position: absolute;
    }
}
</style>


<template>
    <div class="galaxy">
        <TresCanvas clear-color="#2F4F4F">
            <!-- 配置 -->
            <TresPerspectiveCamera :position="[0, 0, cameraZ]" />
            <OrbitControls />
            <MouseParallax :factor="5" :ease="[3, 0.1]" />
            <TresAmbientLight />
            <TresDirectionalLight :position="[10, 10, 15]" />

            <!-- 背景 -->
            <Stars :rotation="[0, yRotation, 0]" :radius="5" :depth="50" :count="1000" :size="0.3"
                :size-attenuation="true" />

            <!-- 星球 -->
            <TresMesh class="planets" v-for="planet in planets" :key="planet.id" :position="[planet.x, planet.y, planet.z]">
                <Sphere color="blue">
                    <MeshGlassMaterial color="white" />
                    <Sparkles :directional-light="lightRef" />
                </Sphere>
            </TresMesh>
            <TresMesh class="planets" v-for="planet in planets" :key="planet.id" :position="[planet.x, planet.y, planet.z]">
                <Circle :args="[1, 1]">
                    <TresMeshToonMaterial color="#33A8FF" />
                </Circle>
            </TresMesh>

            <!-- 国旗 -->
            <TresMesh class="flags" v-for="planet in planets" :key="planet.id" :position="[planet.x, planet.y, planet.z]">
                <Suspense>
                    <SVG  src="../../../assets/flagSVG/us.svg" :scale="1" />
                </Suspense>
            </TresMesh>
            <!-- 轨道 -->
            <CatmullRomCurve3 :points="orbitPos" :segments="4" :line-width="2" color="#fbb03b" />
        </TresCanvas>
    </div>
</template>