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
    MouseParallax,
    CustomShaderMaterial,
    Sparkles,
    Lensflare,
    CatmullRomCurve3,
    SVG,
    Ring,
    Sky,
    useVideoTexture
} from '@tresjs/cientos'
import mitt from 'mitt'
import Context from './Context.vue'
import { TextureLoader } from 'three';

const bus = mitt()
// bus.on('galaxy', () => {
//     console.log('galaxy')
//     ringR.value = 0
//     const timer = setInterval(() => {
//         if (ringR.value < 100)
//             ringR.value += 6
//         else {
//             initRing()
//             clearInterval(timer)
//         }
//     }, 10)
// })

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


// 背景旋转
const yRotation = shallowRef(0)
useRenderLoop().onLoop(({ delta }) => {
    yRotation.value += 0.1 * delta
})


const lightRef = shallowRef()

useRenderLoop().onLoop(({ elapsed }) => {
    if (lightRef.value) {
        lightRef.value.position.x = Math.cos(elapsed) * 2.5
        lightRef.value.position.y = Math.sin(elapsed) * 2.5
    }
})

const cameraZ = ref(2000); // camera startPos
const cameraX = ref(0);
const cameraY = ref(5);
const animateCamera = () => {
    if (cameraZ.value > 42) {
        cameraZ.value -= 7; //speed
        requestAnimationFrame(animateCamera);
    }
};

onMounted(() => {
    requestAnimationFrame(animateCamera);
});

const planets = ref([
    { x: 0, y: 0, z: 0, id: 1, svg: 'src/assets/flagSVG/cn.svg', color: 'white' },
    { x: 0, y: 0, z: 0, id: 0, svg: 'src/assets/flagSVG/us.svg', color: 'white' },
    { x: 0, y: 0, z: 0, id: 2, svg: 'src/assets/flagSVG/ru.svg', color: 'white' },
    { x: 0, y: 0, z: 0, id: 3, svg: 'src/assets/flagSVG/fr.svg', color: 'white' },
    { x: 0, y: 0, z: 0, id: 4, svg: 'src/assets/flagSVG/gb.svg', color: 'white' },
    { x: 0, y: 0, z: 0, id: 5, svg: 'src/assets/flagSVG/jp.svg', color: 'white' },
])

// ring
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
    console.log(points);

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
    console.log('Center:', center);
    console.log('Normal:', normal);


}
onMounted(() => {
    initRing();
});



// 直线
// const orbitPos = computed(() => {
//     return planets.value.map((planet) => [planet.x, planet.y, planet.z]);
// });
// 曲线
// const orbitPos = ref([]) as any

// onMounted(() => {
//     const centerX = (-13 + -4) / 2;  // 中心点的x坐标
//     const centerY = (5 + 0) / 2;     // 中心点的y坐标
//     const centerZ = (-8 + 2) / 2;    // 中心点的z坐标

//     const radius = Math.sqrt(Math.pow(-13 - centerX, 2) + Math.pow(5 - centerY, 2) + Math.pow(-8 - centerZ, 2));  // 半径
//     const numPoints = 8;  // 你可以根据需要增加或减少点的数量

//     for (let i = 0; i < numPoints; i++) {
//         const angle = (2 * Math.PI * i) / numPoints;
//         const x = centerX + radius * Math.cos(angle) || 0;
//         const y = centerY + radius * Math.sin(angle);
//         const z = centerZ;  // 假设轨道在同一个z平面上

//         orbitPos.value.push({ x, y, z, id: i + 2 });  // 新生成点的id从2开始
//     }
// })

const initR = 12
const open = () => {
    console.log('galaxy')
    ringR.value = initR
    const timer = setInterval(() => {
        if (ringR.value < 40) {
            ringR.value += 0.03
            initRing()
        }
        else {
            clearInterval(timer)
        }
    }, 1)
}
const reverse = () => {
    console.log('galaxy')

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

const lookX = ref(0)
const lookY = ref(0)
const lookZ = ref(0)
const ctx = ref(null)
const lookAt = (i) => {
    cameraX.value = planets.value[0].x
    cameraY.value = planets.value[0].y
    cameraZ.value = planets.value[0].z
    transArr(planets.value)
    console.log(cameraX.value, cameraY.value, cameraZ.value,'cameraXYZ');

    // lookX.value = planets.value[i].x
    // lookY.value = planets.value[i].y
    // lookZ.value = planets.value[i].z
    // // ctx.value && ctx.value.animate()
    // ctx.value && ctx.value.lookAt() //bug

}

function transArr(arr: any) {
    const pop = arr.shift()
    arr.push(pop)
}

// bus.on('getCamera', (res) => {
//     camera = res
//     console.log(camera, 'camera');
// })

const texture = ref({})
useLoader(TextureLoader, 'src/assets/test.png').then(res => {
    texture.value = res
    console.log(texture.value, 'texture');
})




defineExpose({ open, reverse, lookAt })
</script>

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


<template>
    <div class="galaxy">
        <TresCanvas clear-color="#2F4F4F">
            <Context ref="ctx" :direction="[lookX, lookY, lookZ]" />
            <!-- 配置 -->
            <TresPerspectiveCamera :position="[cameraX, cameraY, cameraZ]" />
            <OrbitControls />
            <MouseParallax :factor="50" :ease="[3, 0.5]" />
            <TresAmbientLight />
            <TresDirectionalLight :position="[10, 10, 15]" />

            <!-- 背景 -->
            <Stars :rotation="[0, yRotation, 0]" :radius="5" :depth="50" :count="1000" :size="0.3"
                :size-attenuation="true" />
            <Sky />
            <!-- 星球 -->
            <TresMesh class="planets" v-for="planet in planets" :key="planet.id" :position="[planet.x, planet.y, planet.z]">
                <Sphere>
                    <MeshGlassMaterial :color="planet.color" />
                    <Sparkles :directional-light="lightRef" />
                </Sphere>
            </TresMesh>

            <TresMesh class="planets" v-for="planet in planets" :key="planet.id" :position="[planet.x, planet.y, planet.z]">
                <!-- <Circle :args="[1, 1]">
                    <TresMeshToonMaterial color="#33A8FF" />
                </Circle> -->
                <Sphere>
                    <TresMeshBasicMaterial :map="texture" />
                </Sphere>
            </TresMesh>


            <!-- 国旗 -->
            <TresMesh class="flags" v-for="planet in planets" :key="planet.id"
                :position="[planet.x - 1, planet.y + 2, planet.z + 2]">
                <Suspense>
                    <SVG :src="planet.svg" :scale="0.003" />
                </Suspense>
            </TresMesh>
            <!-- 轨道 -->
            <Ring ref="ringRef" :args="[ringR - 0.3, ringR, 32]" :position="[ringC.x, ringC.y, ringC.z]"
                :rotation="[Math.atan2(ringN.y, ringN.z) * Math.PI / (-3), Math.atan2(ringN.x, ringN.z), 0]">
                <TresMeshToonMaterial color="purple" />
            </Ring>
            <!-- <CatmullRomCurve3 :points="orbitPos" :segments="4" :line-width="2" color="#fbb03b" /> -->

            <!-- 立方体 -->
            <TresMesh ref="boxRef" :position="[23.2, 13, 0]" :scale="0.5" cast-shadow>
                <TresBoxGeometry :args="[1, 1, 1]" />
                <TresMeshNormalMaterial />
            </TresMesh>
        </TresCanvas>
    </div>
</template>