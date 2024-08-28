<template>
    <div class="search">
        <!-- 查询 -->
        <el-form :model="form" label-width="80px" class="search-form">
            <el-form-item class="search-name search-item">
                <el-input v-model="form.name" placeholder="请输入关键字" clearable class="name-input input" />
            </el-form-item>
            <el-form-item class="search-country search-item">
                <el-input v-model="form.country" placeholder="请输入国家" clearable class="country-input input" />
            </el-form-item>
            <el-form-item class="search-type search-item">
                <el-input v-model="form.type" placeholder="请输入类型" clearable class="type-input input" />
            </el-form-item>
            <el-form-item>
                <div class="search-button search-item" @click="inputSearch">查询</div>
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
    // background-color: #ffffff;
    justify-content: flex-end;

    .search-form {
        width: 80%;
        display: flex;
        // background-color: bisque;
        justify-content: flex-end;

        .search-item {
            // background-color: blue;
            border: 1px solid white;

            .input {
            }
            .name-input{
            }
        }
    }



    // 搜索框
    .el-item {
        width: 100px;
        height: 40px !important;
    }

    .el-input {
        width: auto;
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

.el-form-item__content {
    margin-left: 0px !important;
    margin-right: 0px !important;
}

// 搜索按钮
</style>