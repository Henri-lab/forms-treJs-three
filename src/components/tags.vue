vue
<template>
    <div class="tags">
        <!-- <div class="flag" v-for="(item, index) in flags">
            <div class="flag-container">
                <img class="flag-img" :src="item.url" alt="">
            </div>
        </div> -->
        <div class="flag">
            <div class="flag-container">
                <img class="flag-img" src="@/assets/flagSVG/cn.svg" alt="" @click="go('cn')">
            </div>
        </div>

        <div class="flag">
            <div class="flag-container">
                <img class="flag-img" src="@/assets/flagSVG/us.svg" alt="" @click="go('us')">
            </div>
        </div>

        <div class="flag">
            <div class="flag-container">
                <img class="flag-img" src="@/assets/flagSVG/ru.svg" alt="" @click="go('ru')">
            </div>
        </div>

        <div class="flag">
            <div class="flag-container">
                <img class="flag-img" src="@/assets/flagSVG/fr.svg" alt="" @click="go('fr')">
            </div>
        </div>

        <div class="flag">
            <div class="flag-container">
                <img class="flag-img" src="@/assets/flagSVG/gb.svg" alt="" @click="go('gb')">
            </div>
        </div>

        <div class="flag">
            <div class="flag-container">
                <img class="flag-img" src="@/assets/flagSVG/jp.svg" alt="">
            </div>
        </div>

    </div>
</template> 

<script setup>
import { ref } from 'vue';
import bus from '@/utils/bus'

const flags = ref([
    {
        name: '中国',
        value: 'cn',
        url: `@/assets/flagSVG/cn.svg`
    },
    {
        name: '美国',
        value: 'us',
        url: `@/assets/flagSVG/us.svg`
    },
    {
        name: '俄国',
        value: 'ru',
        url: `@/assets/flagSVG/ru.svg`
    },
    {
        name: '法国',
        value: 'fr',
        url: `@/assets/flagSVG/fr.svg`
    },
    {
        name: '英国',
        value: 'gb',
        url: `@/assets/flagSVG/gb.svg`
    },
    {
        name: '日本',
        value: 'jp',
        url: `@/assets/flagSVG/jp.svg`
    },
]);

const go = (name) => {
    console.log('go');
    bus.emit('go', name)
}
</script>

<style lang="scss" scoped>
.tags {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;

}

.flag {
    flex-grow: 1;
    /* 使每个.flag元素均分flex容器的空间 */
    flex-basis: 0;
    /* 初始大小为0，根据flex-grow分配空间 */
    text-align: center;

    .flag-container {
        width: 25%;
        height: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: 50%;

        .flag-img {
            width: 100%;
            height: auto;
            object-fit: contain;
            /* 完整显示，可能超出容器 */
            max-width: 100px;
            max-height: 100px;
        }

        &:hover {
            border-radius: 0;
            box-shadow: 0 0 10px rgba(0, 0, 0, 1);
        }
    }


}
</style>