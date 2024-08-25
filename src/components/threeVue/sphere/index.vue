<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { MeshGlassMaterial, OrbitControls, Sphere } from '@tresjs/cientos'
</script>

<template>
    <div class="sphere">
        <TresCanvas clear-color="transparent">
            <OrbitControls></OrbitControls>
            <TresPerspectiveCamera :position="[3, 3, 30]" />
            <TresMesh>
                <Sphere ref="planeRef" :position="[0, 0, 0]">
                    <MeshGlassMaterial />
                </Sphere>
            </TresMesh>
            <TresAmbientLight />
            <TresDirectionalLight :position="[2, 2, 2]" />
        </TresCanvas>
    </div>
</template>

<style>
.sphere {
    width: 100%;
    height: 100%;
}
</style>