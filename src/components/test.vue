<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <!-- <message /> -->
              <el-icon>
                <Location />
              </el-icon>目标管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="isShowTable('舰船')">舰船目标</el-menu-item>
              <el-menu-item index="1-2" @click="isShowTable('飞机')">飞机目标</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <User />
              </el-icon>用户管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">权限管理</el-menu-item>
              <el-menu-item index="2-2">菜单管理</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <setting />
              </el-icon>系统管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">数据监控</el-menu-item>
              <el-menu-item index="3-2">缓存监控</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container v-if="showTable">
      <el-header style="text-align: left; font-size: 12px; padding-top: 14px" class="header-button">
        <el-button @click="add">新增</el-button>
        <el-button>删除</el-button>
        <el-button>导入</el-button>
        <el-button>导出</el-button>
      </el-header>
      <el-main>
        <el-scrollbar>
          <el-table :data="tableData" v-if="changeTable">
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="number" label="舰号" />
            <el-table-column prop="homePort" label="母港" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                  修改
                </el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                  删除
                </el-button>
                <el-button size="small" @click="handleDelete(scope.$index, scope.row)">
                  详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="tableData" v-else>
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="type" label="机型" />
            <el-table-column prop="home" label="生产厂家" />
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
  <el-dialog v-model="modelDialogVisible" width="1400" title="新增目标" center append-to-body destroy-on-close>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本属性" name="obj">
        <el-row :gutter="20">
          <el-col :span="12" v-for="item in obj[currentName]">
            <el-form-item :label="item.name">
              <el-input v-model="item.value" :title="item.value" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="性能属性" name="obj1">
        <el-row :gutter="20">
          <el-col :span="12" v-for="item in obj1[currentName]">
            <el-form-item :label="item.name">
              <el-input v-model="item.value" :title="item.value" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="物理特性" name="obj2">
        <el-row :gutter="20">
          <el-col :span="12" v-for="item in obj2[currentName]">
            <el-form-item :label="item.name">
              <el-input v-model="item.value" :title="item.value" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="功能属性" name="obj3">
        <el-row :gutter="20">
          <el-col :span="12" v-for="item in obj3[currentName]">
            <el-form-item :label="item.name">
              <el-input v-model="item.value" :title="item.value" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="活动特性" name="obj4">
        <el-row :gutter="20">
          <el-col :span="12" v-for="item in obj4[currentName]">
            <el-form-item :label="item.name">
              <el-input v-model="item.value" :title="item.value" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="识别特性" name="obj5">
        <el-row :gutter="20">
          <el-col :span="12" v-for="item in obj5[currentName]">
            <el-form-item :label="item.name">
              <el-input v-model="item.value" :title="item.value" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";
const activeName = ref("obj");
const item = {
  date: "2016-05-02",
  name: "Tom",
  address: "No. 189, Grove St, Los Angeles",
};
const tableData = ref();
const jcArray = [
  {
    name: "尼米兹号",
    number: "CVN-68",
    homePort: "基萨普海军基地",
  },
  {
    name: "美国号",
    number: "LHA-6",
    homePort: "佐世保军港",
  },
  {
    name: "邦克山号",
    number: "CG-52",
    homePort: "加利福尼亚州圣迭戈海军基地",
  },
];
const fjArray = [
  {
    name: "F-15E战斗机",
    type: "战斗机",
    home: "波音公司",
  },
  {
    name: "B-2轰炸机",
    type: "轰炸机",
    home: "诺斯罗普·格鲁门公司",
  },
  {
    name: "EA-18G“咆哮者”",
    type: "电子战飞机",
    home: "波音公司",
  },
];
let modelDialogVisible = ref(false);
let currentName = ref("");
let add = () => {
  currentName.value = "尼米兹航空母舰";
  console.log(obj[currentName]);
  modelDialogVisible.value = true;
};
let showTable = ref(false);
const obj = ref();
const obj1 = ref();
const obj2 = ref();
const obj3 = ref();
const obj4 = ref();
const obj5 = ref();
onMounted(async () => {
  const response = await axios.get("./data.json");
  let data = JSON.parse(JSON.stringify(response.data));
  obj.value = data.jbxx;
  obj1.value = data.xnsx;
  obj2.value = data.wltx;
  obj3.value = data.gnsx;
  obj4.value = data.hdtx;
  obj5.value = data.sbtx;
  tableData.value = data.tree;
});
let changeTable = ref();
let isShowTable = (name) => {
  tableData.value = name === "舰船" ? jcArray : fjArray;
  changeTable.value = name === "舰船" ? true : false;
  showTable.value = true;
};
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.header-button .el-button {
  width: 80px !important;
}
</style>
