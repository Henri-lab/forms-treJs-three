<template>
    <div class="search">
        <!-- 查询 -->
        <el-form :model="form" label-width="80px" class="search-form">
            <el-form-item class="search-item-name ">
                <el-input v-model="form.name" placeholder="请输入关键字" clearable class="name-input" />
            </el-form-item>
            <el-form-item class="search-item-country">
                <el-input v-model="form.country" placeholder="请输入国家" clearable class="country-input" />
            </el-form-item>
            <el-form-item class="search-item-type">
                <el-input v-model="form.type" placeholder="请输入类型" clearable class="type-input" />
            </el-form-item>
            <el-form-item>
                <div class="search-button" @click="inputSearch">查询</div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
const form = reactive({
    name: '',
    country: '',
    type: '',
})

</script>

<style lang="scss" scoped>
.search {
    width: 100%;
    display: flex;

    .search-form {
        width: 80%;
        display: flex;
        // background-color: bisque;
        justify-content: space-around;

        .search-item {
            background-color: blue;
        }
    }



    // 搜索框
    .el-item {
        height: 40px !important;
    }

    .el-input {
        width: 100px;
        margin-left: -80%;
    }
}



.search-button {
    margin-left: -80%;
    background: $search_bgImg;
    background-size: cover;
    background-position: center;
    width: 5rem;
    height: 2rem;
    border: none;
    line-height: 2rem;
    color: #ffffff;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;
}

// 搜索按钮
</style>