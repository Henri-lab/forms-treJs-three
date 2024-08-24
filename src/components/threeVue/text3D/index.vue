<script setup lang="ts">
import { TresCanvas, useTexture } from '@tresjs/core';
import { OrbitControls, Text3D } from '@tresjs/cientos';
import { shallowRef, watchEffect, defineProps } from 'vue';

const camera = {
    position: [2.789917807383607, 1.1520053956903624, 4.066760580672416],
    fov: 45,
    rotation: [-0.26033035821639566, 0.3493743923092192, 0.09093149349977715],
};
const matcapTexture = await useTexture([
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png',
]);

const textRef = shallowRef();

watchEffect(() => {
    console.log(textRef.value);
});

let prop = defineProps({
    text: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <div class="text-3d">
        <TresCanvas shadows alpha physically-correct-lights>
            <TresPerspectiveCamera v-bind="camera" :fov="45" :aspect="1" :near="0.1" :far="1000" />
            <OrbitControls />
            <Suspense>
                <Text3D :position="[-1, 0, 0]" ref="textRef"
                    font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json">
                   {{ prop.text }}
                    <TresMeshMatcapMaterial :matcap="matcapTexture" />
                </Text3D>
            </Suspense>
            <!-- <TresAxesHelper :args="[1]" /> -->
            <TresDirectionalLight :position="[0, 2, 4]" :intensity="2" cast-shadow />
        </TresCanvas>
    </div>
</template>

<style>
.text-3d {
    width: 100%;
    height: 100%;
    background: transparent;
}
</style>
