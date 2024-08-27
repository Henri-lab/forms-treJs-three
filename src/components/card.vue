<template>
    <div class="card">
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>{{ props.countryName }}</span>
                </div>
            </template>
            <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
            <template #footer>Footer content</template>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue';
import mitt from 'mitt';
const bus = mitt();

const props = defineProps({
    countryName: {
        type: String,
        default: 'test',
    },
})


</script>

<style>
.card {
    width: 100%;
    height: 100%;
}
</style>