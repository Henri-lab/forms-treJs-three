<template>
    <!-- <div class="context">

    </div> -->
</template>

<script setup lang="ts">
// @ts-nocheck
import { useTresContext } from '@tresjs/core'
import { onMounted } from 'vue'
import mitt from 'mitt';
import * as THREE from 'three'

const bus = mitt()
const props = defineProps({
    direction: {
        type: Array,
        required: true,
    },
})


// onMounted(() => {
//     const { camera } = useTresContext()
//     // console.log(camera.value, 'camera in ctx');
//     setTimeout(() => {
//         bus.emit('getCamera', getContext('camera'))
//         console.log('emit');
//     }, 1000);
// })
let _camera = {}
onMounted(() => {
    const { camera } = useTresContext()
    _camera = camera.value
    console.log(camera.value, 'camera in ctx');
    console.log(props.direction, 'direction');

})

const lookAtPosition = ref(new THREE.Vector3(props.direction[0], props.direction[1], props.direction[2])); // 设置目标点

// 假设这是在组件的 mounted 钩子或某个更新函数中
function updateCamera() {
    _camera.lookAt(lookAtPosition.value);
    console.log(props.direction, 'direction');
    console.log(_camera.position, 'camera position');

}





const getContext = (type) => {
    if (type === 'camera') {
        const { camera } = useTresContext()
        return camera
    }
}





defineExpose({
    getContext,
    updateCamera
})







</script>

<style scoped></style>   