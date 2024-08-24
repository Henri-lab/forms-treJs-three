<script setup lang="ts">
import { ShallowRef, shallowRef } from 'vue';

import { useRenderLoop, TresInstance } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';

const boxRef: ShallowRef<TresInstance | null> = shallowRef(null);

const { onLoop } = useRenderLoop();

onLoop(({ delta, elapsed }) => {
    if (boxRef.value) {
        boxRef.value.rotation.y += delta;
        boxRef.value.rotation.z = elapsed * 0.2;
    }
});
function onClick(ev) {
  if (ev) {
    ev.object.material.color.set('#008080');
  }
}
</script>

<template>
    <div class="cube" style="width: 100%; height: 100%">
        <TresCanvas clear-color="transparent" shadows alpha>
            <OrbitControls />
            <TresScene>
                <TresPerspectiveCamera :position="[1, 2, 5]" :fov="45" :aspect="1" :near="0.1" :far="1000" />
                <TresMesh ref="boxRef" :scale="1" cast-shadow>
                    <TresBoxGeometry :args="[1, 1, 1]" />
                    <TresMeshNormalMaterial />
                </TresMesh>
            </TresScene>
        </TresCanvas>
    </div>
</template>
