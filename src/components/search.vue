<template>
    <div class="search">
        <!-- 查询 -->
        <el-form :model="form" label-width="80px" class="search-form">
            <el-form-item class="search-keywords search-item" label="关键字">
                <el-input v-model="form.keywords" placeholder="请输入关键字" clearable class="keywords-input input" />
            </el-form-item>
            <el-form-item class="search-country search-item"
                :rules="[{ required: true, message: '请选择国家', trigger: 'blur' }]" label="国家">
                <el-select v-model="form.countryCode" placeholder="请输入国家" clearable class="country-input input" allow-create
                    filterable>
                    <el-option value="us">美国</el-option>
                    <el-option value="cn">中国</el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="search-type search-item" label="载具类型">
                <el-select v-model="form.type" placeholder="请输入类型" clearable class="type-input input">
                    <el-option value="aircraft">战斗机</el-option>
                    <el-option value="ship">舰船</el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <div class="search-button search-item" @click="inputSearch">查询</div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import bus from '@/utils/bus';
const form = reactive({
    keywords: '',
    countryCode: '',
    type: '',
})

const inputSearch = () => {
    // 暂时硬编码 如果你输入关键字 那就加载所有类型
    const countryCode = form.countryCode
    const type = form.type
    if (form.keywords) {
        console.log('keywords');
        bus.emit('openDetails')
        bus.emit('detailsCheck', { countryCode, type: '' });
    } else {
        bus.emit('openDetails')
        bus.emit('detailsCheck', { countryCode, type });
    }
}

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
            // border: 1px solid white;

            .input {
                width: 10rem;
            }

            .keywords-input {}
        }
    }



    // 搜索框
    .el-item {
        width: 200px;
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