<template>
  <div class="descriptions">
    <div v-for="(table, table_i) in tableList " :key="table.id">
      <!-- 目标详情 -->
      <el-descriptions class="margin-top" title="?" :column="3" border>
        <template #title>
          <div class="descrTitle">
            <span>{{ table.title }}</span>
            <span style="cursor: pointer" @click="remove(table)">删除</span>
          </div>
        </template>

        <!-- opt 是数据字段 -->
        <el-descriptions-item v-for="(opt, opt_i) in table.data" :key="opt.id" :span="opt.span">
          <!-- 字段名称 -->
          <template #label>
            <div class="cell-item">
              {{ opt.name }}
            </div>
          </template>

          <el-input v-if="opt.type == 'textarea'" type="textarea" v-model="opt.value" :title="opt.value"
            auto-complete="off" :autosize="{ minRows: 1, maxRows: 10 }" @change="setManuRadarParam(table, opt)">
          </el-input>

          <el-select v-if="opt.type === 'sel'" style="width: 180px" v-model="selRadars[table_i]"
            :placeholder=selRadars[table_i] @change="handleSelect" allow-create filterable>
            <el-option v-for="type_sel in db_RadarTypes" :key="type_sel" :label="type_sel" :value="type_sel" />
          </el-select>

          <el-input v-if="opt.type == 'auto'" v-model="opt.value" placeholder="">
          </el-input>

          <el-input v-if="opt.type == 'basic'" v-model="opt.value" :title="opt.value" allow-create filterable>
          </el-input>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { jbxx_ship, jbxx_aircraft } from './jbxx';
import _ from 'lodash'

const props = defineProps({
  tableType: {
    type: String,
    required: true,
  },
})
const tableList = ref([])

onMounted(() => {
  console.log(jbxx_ship)
  if (props.tableType === 'jbxx_ship') {
    tableList.value.push(_.cloneDeep(jbxx_ship))
  }
  if(props.tableType === 'jbxx_aircraft'){
    tableList.value.push(_.cloneDeep(jbxx_aircraft))
  }
})
const handleSelect = (val) => {
}




</script>

<style lang="scss">
.error-input-lon .el-input__inner {
  color: red;
}

.error-input-lat .el-input__inner {
  color: red;
}

.el-descriptions__header {
  .el-descriptions__title {
    width: 100%;

    .descrTitle {
      width: 98%;
      display: flex;
      justify-content: space-between;
    }
  }
}

.descriptions {
  padding: 5px 10px;
  overflow-y: auto;
}

.el-descriptions__label.el-descriptions__cell.is-bordered-label {
  background: #152a41;
  color: #fff;
  width: 80px;
}

.el-descriptions__body .el-descriptions__table.is-bordered .el-descriptions__cell {
  border: 1px solid #276989 !important;
  background: #152a41;
}

.el-descriptions__title {
  color: #fff;
}

.el-descriptions__header {
  margin: 10px;
}

.el-input__wrapper {
  background: none !important;
  box-shadow: none !important;
}

.el-input__inner {
  color: #fff;
}

.el-textarea__inner {
  background: none !important;
  box-shadow: none !important;
  border: 1px solid #1296db !important;
  border-radius: 5px;
  color: #fff;
}

.el-input__inner::placeholder {
  color: #fff;
}

.el-select {
  outline: none;
  background-color: transparent !important;
  border: 1px solid #1296db !important;
  border-radius: 5px;
  box-shadow: none !important;
}

$selectBg: #264e74;
$selectHover: #4475ad;

.el-select-dropdown__empty {
  background-color: $selectBg;
  color: #fff;
}

.el-select__popper.el-popper {
  background-color: $selectBg;
  /* 这里设置下拉框的背景颜色 */
  border: none;

  .el-select-dropdown__item {
    color: #fff;
  }

  .el-select-dropdown__item.hover {
    background: $selectHover;
    color: #fff;
  }
}

.el-select-dropdown {
  background-color: $selectBg;
  /* 这里设置下拉框的背景颜色 */
  border: none;
}

.el-popper.is-light .el-popper__arrow::before {
  background: $selectBg;
  border: none;
}

.el-popper.is-light {
  background: $selectBg;

  //   border:1px solid #1a5076;
  .el-dropdown-menu {
    background: $selectBg;
    border: none;

    .el-dropdown-menu__item {
      color: #fff;
    }

    .el-dropdown-menu__item:not(.is-disabled):focus {
      background: $selectHover;
      color: #fff;
    }
  }
}
</style>