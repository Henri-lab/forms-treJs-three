<template>
    <div class="galaxy">
        <TresCanvas clear-color="#005F5B">
            <!-- 配置 -->
            <TresPerspectiveCamera :position="[0, 2, cameraZ]" />
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





        </TresCanvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef } from 'vue';
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
    Sparkles
} from '@tresjs/cientos'

const yRotation = shallowRef(0)
useRenderLoop().onLoop(({ delta }) => {
    yRotation.value += 0.02 * delta
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
    { x: -10, y: -3, z: -10, id: 0 },
    { x: 3, y: -1, z: 0, id: 1 },
])

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

    .planet {
        width: 100%;
        height: 100%;
    }
}
</style>