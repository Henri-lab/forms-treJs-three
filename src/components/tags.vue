vue
<template>
    <div class="tags">
        <div class="flag" v-for="(item, index) in flags">
            <div class="flag-container">
                <img class="flag-img" :src="new URL(item.url, import.meta.url).href" alt="" @click="goCountry(item.value)">
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
        url: "src/assets/flagSVG/cn.svg"//vite无法解析-路径
    },
    {
        name: '美国',
        value: 'us',
        url: `src/assets/flagSVG/us.svg`
    },
    {
        name: '俄国',
        value: 'ru',
        url: `src/assets/flagSVG/ru.svg`
    },
    {
        name: '法国',
        value: 'fr',
        url: `src/assets/flagSVG/fr.svg`
    },
    {
        name: '英国',
        value: 'gb',
        url: `src/assets/flagSVG/gb.svg`
    },
    {
        name: '日本',
        value: 'jp',
        url: `src/assets/flagSVG/jp.svg`
    },
]);

const goCountry = (name) => {
    console.log('goCountry');
    bus.emit('goCountry', name)
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