<template>
    <div class="galaxy">
        <TresCanvas clear-color="black">
            <TresPerspectiveCamera :position="[0, 2, cameraZ]" />
            <OrbitControls />
            <MouseParallax :factor="5" :ease="[3, 0.1]" />
            <TresAmbientLight />
            <TresDirectionalLight :position="[10, 10, 15]" />
            <Stars :rotation="[0, yRotation, 0]" :radius="5" :depth="50" :count="1000" :size="0.3"
                :size-attenuation="true" />

            <TresMesh :position="[0, 0, 0]">
                <Sphere>
                    <MeshGlassMaterial />
                </Sphere>
            </TresMesh>
            <Circle ref="circleRef" :args="[1, 1]" :position="[0, 0, 0]">
                <TresMeshToonMaterial color="#33A8FF" />
            </Circle>


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
    MouseParallax
} from '@tresjs/cientos'

const yRotation = shallowRef(0)
useRenderLoop().onLoop(({ delta }) => {
    yRotation.value += 0.02 * delta
})

const radius = ref(0)
onMounted(() => {

})

const cameraZ = ref(2000); // Starting position (far)

const animateCamera = () => {
    if (cameraZ.value > 13) {
        cameraZ.value -= 7; //speed
        requestAnimationFrame(animateCamera);
    }
};

onMounted(() => {
    requestAnimationFrame(animateCamera);
});

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