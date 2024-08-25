<template>
    <Transition name="fade-overlay" enter-active-class="opacity-1 transition-opacity duration-200"
        leave-active-class="opacity-0 transition-opacity duration-200">
        <div v-show="!hasFinishLoading"
            class="absolute bg-grey-600 t-0 l-0 w-full h-full z-20 flex justify-center items-center text-black font-mono">
            <div class="w-200px">
                Loading... {{ progress }} %
                <i class="i-ic-twotone-catching-pokemon animate-rotate-in"></i>
            </div>
        </div>
    </Transition>
    <TresCanvas preset="realistic">
        <TresPerspectiveCamera :position="[11, 11, 11]" />
        <OrbitControls />
        <Suspense>
            <Environment background :files="environmentFiles"
                path="https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap" />
        </Suspense>
    </TresCanvas>
</template>

<script lang="ts" setup>
import { useProgress } from '@tresjs/cientos'

const { hasFinishLoading, progress, items } = await useProgress()
</script>