<script setup lang="ts">
// @ts-nocheck
import { useTresContext } from '@tresjs/core'
import { onMounted } from 'vue'
import * as THREE from 'three'
import bus from '@/utils/bus'

const props = defineProps({
    direction: {
        type: Array,
        required: true,
    },
})


let _camera = {}
let _scene = {}
let _renderer = {}
onMounted(() => {
    const { camera, scene, renderer } = useTresContext()
    _camera = camera.value
    _scene = scene.value
    _renderer = renderer.value
    // console.log(useTresContext(), 'ctx');
    // console.log(_camera, 'camera in ctx');
    // console.log(_scene, 'scene in ctx');
    // console.log(_renderer, 'renderer in ctx');
})

// 假设这是在组件的 mounted 钩子或某个更新函数中
function lookAt() {
    _camera.lookAt(new THREE.Vector3(props.direction[0], props.direction[1], props.direction[2]));
    console.log(_camera, 'camera look at', props.direction[0], props.direction[1], props.direction[2]);
}
function animate() {

    lookAt(); // 更新相机朝向逻辑
    // _renderer.render(_scene, _camera); // 渲染场景
    // requestAnimationFrame(animate); // 请求下一帧的动画
}


defineExpose({
    animate,
    lookAt
})




bus.on('sceneInfo', () => {
    console.log(_scene, 'scene info');
    bus.emit('countrySphere',
        _scene.children.filter(item => item.type === 'country')
    )
})



</script>
