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
let _scene = {}
let _renderer = {}
onMounted(() => {
    const { camera, scene, renderer } = useTresContext()
    _camera = camera.value
    _scene = scene.value
    _renderer = renderer.value
    console.log(useTresContext(), 'ctx');
    console.log(_camera, 'camera in ctx');
    console.log(_scene, 'scene in ctx');
    console.log(_renderer, 'renderer in ctx');
})


// 假设这是在组件的 mounted 钩子或某个更新函数中
function lookAt() {
    _camera.lookAt(new THREE.Vector3(props.direction[0], props.direction[1], props.direction[2]));
    console.log(_camera, 'camera look at', props.direction[0], props.direction[1], props.direction[2]);

    // console.log(props.direction, 'direction');

}
let index = 0
function animate() {
    // console.log(_camera.position, 'camera position');

    lookAt(); // 更新相机朝向逻辑
    _renderer.render(_scene, _camera); // 渲染场景
    requestAnimationFrame(animate); // 请求下一帧的动画
}







defineExpose({
    animate,
    lookAt
})







</script>

<style scoped></style>   