<template>
    <div class="card">
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>Card name</span>
                </div>
            </template>
            <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
            <template #footer>Footer content</template>
        </el-card>
    </div>
</template>

<script lang="ts">
import mitt from 'mitt';
const bus = mitt();
bus.on('planetClick', (info) => {
    console.log('planetClick')
})


</script>

<style>
.card {
    width: 100%;
    height: 100%;
}
</style>