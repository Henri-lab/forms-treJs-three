<script setup lang="ts">

import { ref, onMounted, shallowRef, Ref, computed } from 'vue';
import { TresCanvas, useRenderLoop, TresInstance, useTexture, useLoader } from '@tresjs/core'
import {
    OrbitControls,
    Stars,
    MeshGlassMaterial,
    MeshWobbleMaterial,
    Sphere,
    Circle,
    Plane,
    MouseParallax,
    CustomShaderMaterial,
    Sparkles,
    Lensflare,
    CatmullRomCurve3,
    SVG,
    Ring,
    Sky,
    useVideoTexture,
    Ocean,
} from '@tresjs/cientos'
import bus from '@/utils/bus'
import Context from './Context.vue'
import { TextureLoader } from 'three';
import { resolve } from 'path';
import { onBeforeMount } from 'vue';


// 立方体旋转
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


// 星空背景旋转
const lightRef = shallowRef()
const yRotation = shallowRef(0)
useRenderLoop().onLoop(({ delta }) => {
    yRotation.value += 0.1 * delta
})
useRenderLoop().onLoop(({ elapsed }) => {
    if (lightRef.value) {
        lightRef.value.position.x = Math.cos(elapsed) * 2.5
        lightRef.value.position.y = Math.sin(elapsed) * 2.5
    }
})

// 摄像机初始动画
const cameraZ = ref(2000); // camera startPos
const cameraX = ref(0);
const cameraY = ref(5);
const animateCamera = () => {
    if (cameraZ.value > 42) {
        cameraZ.value -= 15; //speed
        requestAnimationFrame(animateCamera);
    }
};
onMounted(() => {
    requestAnimationFrame(animateCamera);
});



// ring 星球链
const planets = ref([
    { type: 'country', x: 0, y: 0, z: 0, id: 1, svg: '../../../../assets/flagSVG/cn.svg', color: 'red', name: 'cn' },
    { type: 'country', x: 0, y: 0, z: 0, id: 3, svg: '../../../../assets/flagSVG/ru.svg', color: 'yellow', name: 'ru' },
    { type: 'country', x: 0, y: 0, z: 0, id: 2, svg: '../../../../assets/flagSVG/us.svg', color: 'blue', name: 'us' },
    { type: 'country', x: 0, y: 0, z: 0, id: 4, svg: '../../../../assets/flagSVG/fr.svg', color: 'purple', name: 'fr' },
    { type: 'country', x: 0, y: 0, z: 0, id: 5, svg: '../../../../assets/flagSVG/gb.svg', color: 'green', name: 'gb' },
    { type: 'country', x: 0, y: 0, z: 0, id: 6, svg: '../../../../assets/flagSVG/jp.svg', color: 'white', name: 'jp' },
])

const ringN = ref({ x: 0, y: 0, z: 0 });// 环normal
const ringC = ref({ x: 0, y: 0, z: 0 });// 环中心点
const ringR = ref(12);// 环的半径
const ringS = ref(6);// 环的个数
function initRing() {
    const radius = ringR.value || 10; // 环的半径
    const tiltAngle = Math.PI / 4; // 环相对于水平面的倾斜角度
    const numPoints = ringS.value || 6; // 总共6个点
    const angleStep = (2 * Math.PI) / numPoints; // 每个点的角度步长

    // 生成倾斜的环形坐标 并设置好星球位置
    planets.value.forEach((planet, index) => {
        const angle = index * angleStep;
        const x = radius * Math.cos(angle); // 原本的x坐标
        const y = radius * Math.sin(angle); // 原本的y坐标
        const z = y * Math.sin(tiltAngle);  // 根据倾斜角度调整z坐标
        planet.x = x - 14;                      // x坐标 统一偏移 保持圆心
        planet.y = y * Math.cos(tiltAngle); // 根据倾斜角度调整y坐标
        planet.z = z;                      // 设置z坐标
    });
    // 六个点的坐标
    const points = planets.value.map((planet) => {
        return {
            x: planet.x,
            y: planet.y,
            z: planet.z,
        }
    })
    // console.log(points, 'points');

    // 计算环的中心
    const center = points.reduce((acc, point) => {
        acc.x += point.x;
        acc.y += point.y;
        acc.z += point.z;
        return acc;
    }, { x: 0, y: 0, z: 0 });

    center.x /= points.length;
    center.y /= points.length;
    center.z /= points.length;

    // 假设用两个相邻点计算法向量
    const v1 = { x: points[1].x - points[0].x, y: points[1].y - points[0].y, z: points[1].z - points[0].z };
    const v2 = { x: points[2].x - points[0].x, y: points[2].y - points[0].y, z: points[2].z - points[0].z };

    // 计算法向量
    const normal = {
        x: v1.y * v2.z - v1.z * v2.y,
        y: v1.z * v2.x - v1.x * v2.z,
        z: v1.x * v2.y - v1.y * v2.x
    };

    // 归一化法向量
    const length = Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z);
    normal.x /= length;
    normal.y /= length;
    normal.z /= length;

    ringC.value = center;
    ringN.value = normal;

    // 输出中心和法向量
    // console.log('Center:', center);
    // console.log('Normal:', normal);


}
onMounted(() => {
    initRing();
});

// 星球链动画
const initR = 12//初始半径
let openFlag = 1
const open = () => {
    openFlag = 1
    if (openFlag) {
        openFlag = 0//正在open 其他人不可操作 _flag
        console.log('galaxy ring open')
        ringR.value = initR
        const timer = setInterval(() => {
            if (ringR.value < 40) {
                ringR.value += 0.03
                initRing()
            }
            else {
                openFlag = 1
                clearInterval(timer)
            }
        }, 1)
    }
}
const reverse = () => {
    if (!openFlag) return // flag_
    console.log('galaxy ring reverse')
    const timer = setInterval(() => {
        if (ringR.value > initR) {
            ringR.value -= 0.03
            initRing()
        }
        else {
            clearInterval(timer)
        }
    }, 1)
}

//摄像机视线方向
const lookX = ref(0)
const lookY = ref(0)
const lookZ = ref(0)
const ctx = ref(null)
const lookAt = (i) => {
    lookX.value = planets.value[i].x
    lookY.value = planets.value[i].y
    lookZ.value = planets.value[i].z
    // // ctx.value && ctx.value.animate()
    ctx.value && ctx.value.lookAt() //bug
}

// 设置摄像机
const setPosOfCamera = (x, y, z) => {
    cameraX.value = x
    cameraY.value = y
    cameraZ.value = z
}

// 重置摄像机
const cameraReset = () => {
    reverse()
    cameraX.value = 0
    cameraY.value = 5
    cameraZ.value = 42
}
// 返回生成的星球集合
function getPlanets() {
    return planets.value
}


// 星球材质
const texture = ref([])
const promises = planets.value.map(p => {
    return useLoader(TextureLoader, p.svg);
});
Promise.all(promises).then(resArr => texture.value = resArr)

// 星球内平面的rotation
const rotX = ref(Math.PI)
const rotY = ref(Math.PI)
const rotZ = ref(Math.PI)
let timer2
// onMounted(() => {
//     let rate = 1
//     timer2 = setInterval(() => {
//         rate += 1
//         rotZ.value = Math.PI / rate
//         console.log(rate,'rate');

//     }, 100)
// })
onBeforeMount(() => {
    // clearInterval(timer2)
})

// 背景颜色切换
const theme = ref('black')
const changeTheme = () => {
    console.log('change theme');
    theme.value === 'black' ? theme.value = 'white' : theme.value = 'black'
}
// 背景环境切换
const isSky = ref(false)
const changeSky = () => {
    console.log('change theme');
    isSky.value = !isSky.value
}

const handlePlanetClick = (e, name) => {
    console.log(e, name);
}

defineExpose({
    open,
    reverse,
    lookAt,
    setPosOfCamera,
    cameraReset,
    getPlanets,
    changeTheme,
    changeSky
})


// 事件
bus.on('countrySphere',(country3D)=>{
    console.log(country3D,'country3D');
    
})
function getSceneInfo() {
    bus.emit('sceneInfo')
  
}


</script>

<template>
    <div class="galaxy" @click="getSceneInfo">
        <TresCanvas :clear-color="theme">
            <Context ref="ctx" :direction="[lookX, lookY, lookZ]" />

            <TresPerspectiveCamera :position="[cameraX, cameraY, cameraZ]" />
            <OrbitControls />
            <MouseParallax :factor="50" :ease="[1, 0.5]" />
            <TresAmbientLight />
            <TresDirectionalLight :position="[10, 10, 15]" />


            <Stars :rotation="[0, yRotation, 0]" :radius="500" :depth="100" :count="2000" :size="0.3"
                :size-attenuation="true" />
            <Sky v-if="isSky" />


            <TresMesh class="planets" v-for="planet in planets" :key="planet.id" :position="[planet.x, planet.y, planet.z]"
                :name="planet.name" type="country"  @click="(event) => console.log('click')" >
                <Sphere>
                    <MeshGlassMaterial :color="planet.color" />
                    <Sparkles :directional-light="lightRef" />
                </Sphere>
            </TresMesh>

            <TresMesh class="planets" v-for="(planet, index) in  planets " :key="planet.id"
                :position="[planet.x, planet.y, planet.z]">
                <Plane :args="[3, 2.5]" :rotation="[rotX, rotY, rotZ]">
                    <TresMeshBasicMaterial :map="texture[index]" />
                </Plane>
            </TresMesh>


            <Ring ref="ringRef" :args="[ringR - 0.1, ringR, 32]" :position="[ringC.x, ringC.y, ringC.z]"
                :rotation="[Math.atan2(ringN.y, ringN.z) * Math.PI / (-3), Math.atan2(ringN.x, ringN.z), 0]">
                <TresMeshToonMaterial color="purple" />
            </Ring>

            <TresMesh ref="boxRef" :position="[23.2, 13, 0]" :scale="0.5" cast-shadow>
                <TresBoxGeometry :args="[1, 1, 1]" />
                <TresMeshNormalMaterial />
            </TresMesh>
        </TresCanvas>
    </div>
</template>


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
}
</style>
