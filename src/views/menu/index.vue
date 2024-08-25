<template>
    <div class="menu">
        <Galaxy class="galaxy-wrapper" />
        <el-button class="btn1" color="#626aef">
            up
            <!-- <template v-slot:prepend>
                <svg>
                    <use href="@/assets/upArrow.svg"></use>
                </svg>
            </template> -->

        </el-button>
        <el-button class="btn2" color="#626aef">
            down
            <!-- <template v-slot:prepend>
                <svg>
                    <use href="@/assets/downArrow.svg"></use>
                </svg>
            </template> -->
        </el-button>
        <Card class="card-wrapper" />
    </div>
</template>

<script setup lang="ts">
import Galaxy from '~c/threeVue/galaxy/index.vue';
import Card from '~c/card.vue';

</script>

<style lang="scss" scoped>
.menu {
    width: 100%;
    height: 100%;
    position: relative;

    .galaxy-wrapper {
        width: 100vw;
        height: 100vh;
        position: absolute;
    }

    .card-wrapper {
        width: 30vw;
        height: 50vh;
        background-color: rgba(76, 250, 250, 0.3);
        position: absolute;
        padding: 1%;
        top: 20vh;
        right: 10vw;
        box-shadow: 0 0 10px rgba(0, 0, 0, 1);
    }

    .btn1 {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 30vh;
        right: 41vw;
        z-index: 1;
    }

    .btn2 {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 45vh;
        right: 41vw;
        z-index: 1;
    }
}
</style>