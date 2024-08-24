<!-- webgl 溢出警告 -->


<script setup lang="ts">
import { reactive } from 'vue';
import { OrbitControls } from '@tresjs/cientos';
import { AdditiveBlending } from 'three';
import { useRenderLoop } from '@tresjs/core';
import vertexShader from './_v.glsl';
import fragmentShader from './_f.glsl';

const state = reactive({
  clearColor: '#201919',
  shadows: true,
  alpha: false,
  physicallyCorrectLights: true,
});

const fireFliesShader = {
  transparent: true,
  blending: AdditiveBlending,
  depthWrite: false,

  vertexShader,
  fragmentShader,
  uniforms: {
    uSize: { value: 100 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uTime: { value: 0 },
  },
};

const firefliesCount = 300;
const positionArray = new Float32Array(firefliesCount * 3);
const scaleArray = new Float32Array(firefliesCount);

for (let i = 0; i < firefliesCount; i++) {
  positionArray[i * 3 + 0] = (Math.random() - 0.5) * 12;
  positionArray[i * 3 + 1] = (Math.random() - 0.5) * 12;
  positionArray[i * 3 + 2] = (Math.random() - 0.5) * 12;
  scaleArray[i] = Math.random();
}

const { onLoop } = useRenderLoop();

onLoop(({ elapsed }) => {
  fireFliesShader.uniforms.uTime.value = elapsed;
});
</script>
<template>
  <TresCanvas v-bind="state">
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :fov="45"
      :near="0.1"
      :far="1000"
      :look-at="[-8, 3, -3]"
    />
    <TresScene>
      <OrbitControls />
      <TresAmbientLight :intensity="0.5" />
      <TresPoints>
        <TresSphereGeometry :args="[1, 32, 32]" />
        <TresPointsMaterial
          :size="0.02"
          color="#d4ff00"
          :size-attenuation="true"
        />
      </TresPoints>
      <TresPoints>
        <TresBufferGeometry
          :position="[positionArray, 3]"
          :a-scale="[scaleArray, 1]"
        />
        <TresShaderMaterial v-bind="fireFliesShader" />
      </TresPoints>
      <TresDirectionalLight :position="[0, 2, 4]" :intensity="1" cast-shadow />
    </TresScene>
  </TresCanvas>
</template>
