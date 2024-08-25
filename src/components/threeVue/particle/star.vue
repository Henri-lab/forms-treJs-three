<script setup lang="ts">
import { shallowRef, ref, onMounted } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, Stars } from '@tresjs/cientos'
import { MeshGlassMaterial, Sphere } from '@tresjs/cientos'

const yRotation = shallowRef(0)
useRenderLoop().onLoop(({ delta }) => {
    yRotation.value += 0.02 * delta
})

const radius = ref(0)
onMounted(() => {

})

const cameraZ = ref(2000); // Starting position (far)

const animateCamera = () => {
    if (cameraZ.value > 0) {
        cameraZ.value -= 7; //speed
        requestAnimationFrame(animateCamera);
    }
};

onMounted(() => {
    requestAnimationFrame(animateCamera);
});

</script>

<template>
    <div class="star">
        <TresCanvas clear-color="black">
            <TresPerspectiveCamera :position="[0, 2, cameraZ]" />
            <Stars :rotation="[0, yRotation, 0]" :radius="5" :depth="50" :count="1000" :size="0.3"
                :size-attenuation="true" />
            <!-- <TresGridHelper :args="[4, 4]" /> -->
        </TresCanvas>
    </div>
</template>

<style>
.star {
    width: 100%;
    height: 100%;
}
</style>