<script setup lang="ts">
// @ts-nocheck
import { useTresContext } from '@tresjs/core'
import { onMounted,defineExpose } from 'vue'
import * as THREE from 'three'

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
    console.log(_camera, 'camera in ctx');
    console.log(_scene, 'scene in ctx');
    console.log(_renderer, 'renderer in ctx');
})
function getScene() {
    return computed(() => _scene)
}
defineExpose({
    getScene,
})

</script>
