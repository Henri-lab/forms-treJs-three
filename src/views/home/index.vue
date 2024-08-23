<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HeaderVue></HeaderVue>
      </el-header>
      <el-container>
        <!-- 选项 -->
        <el-aside width="200px">
          <p v-for="item in tools" :key="item.index" class="aside-tools"
            :class="item.index == acitveIndex ? 'active' : ''" @click="clickTools(item)">
            <span>
              <img :src="item.icon1" alt="" v-if="acitveIndex == item.index" />
              <img :src="item.icon" alt="" v-else />
            </span>
            <span>
              {{ item.name }}
            </span>
          </p>
        </el-aside>
        <el-main>
          <!-- 查询 -->
          <el-form :model="form" label-width="80px" style="display: flex">
            <el-form-item>
              <el-input v-model="form.name" placeholder="请输入关键字" clearable />
            </el-form-item>
            <el-form-item style="margin-left: 20px">
              <el-input v-model="form.country" placeholder="请输入国家" clearable />
            </el-form-item>
            <el-form-item style="margin-left: 20px">
              <el-input v-model="form.type" placeholder="请输入类型" clearable />
            </el-form-item>
            <el-form-item style="margin-left: 5px">
              <div class="search-button" @click="inputSearch">查询</div>
            </el-form-item>
          </el-form>
          <!-- 表格 -->
          <!-- <el-table :data="tableData" row-key="id" default-expand-all> -->
          <el-table ref="myTable" :data="tableData[tableDataName]" style="width: 99.97%; --el-table-border-color: none"
            :highlight-current-row="true" default-expand-all :row-class-name="tableRowClassName" empty-text="暂无数据"
            max-height="818" row-key="id">
            <el-table-column label="名称">
              <template #default="scope">
                <span :id="'row-' + scope.row.id"> {{ scope.row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="address" label="操作" align="center">
              <template #default="scope">
                <div v-if="scope.row.order === 3">
                  <el-button size="small" @click="openDetail(scope.row)">
                    详情
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <!-- 详情 -->
    <el-dialog v-model="dialogVisible" title="目标详情" :lock-scroll="false" width="1400px" height="400px" top="10vh">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-form :model="dialogForm" label-width="120px" style="max-width: 1000px; margin: 10px auto">
          <el-collapse-item title="基本标识属性:" name="1">
            <el-row :gutter="gutter">
              <el-col :span="12" v-for="item in obj[currentName]">
                <el-form-item :label="item.name">
                  <el-input v-model="item.value" :title="item.value" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="性能属性:" name="2">
            <el-row :gutter="gutter">
              <el-col :span="12" v-for="item in obj1[currentName]">
                <el-form-item :label="item.name">
                  <el-input v-model="item.value" :title="item.value" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="物理特性:" name="3">
            <el-row :gutter="gutter">
              <el-col :span="12" v-for="item in obj2[currentName]">
                <el-form-item :label="item.name">
                  <el-input v-model="item.value" :title="item.value" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="功能属性:" name="4">
            <el-row :gutter="gutter">
              <el-col :span="12" v-for="item in obj3[currentName]">
                <el-form-item :label="item.name">
                  <el-input v-model="item.value" :title="item.value" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="活动特性:" name="5">
            <el-row :gutter="gutter">
              <el-col :span="12" v-for="item in obj4[currentName]">
                <el-form-item :label="item.name">
                  <el-input v-model="item.value" :title="item.value" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="识别特性:" name="6">
            <el-row :gutter="gutter">
              <el-col :span="12" v-for="item in obj5[currentName]">
                <el-form-item :label="item.name">
                  <el-input v-model="item.value" :title="item.value" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-form>
      </el-collapse>
      <div class="dialog-domain">
        <RelationEcharts></RelationEcharts>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
// @ts-nocheck
import { ref, nextTick, onMounted } from "vue";
import HeaderVue from "@/components/HeaderVue.vue";
import feijiIcon from "@/assets/images/飞机未选中.png";
import feijiIcon1 from "@/assets/images/飞机选中.png";
import jianchuanIcon from "@/assets/images/舰船未选中.png";
import jianchuanIcon1 from "@/assets/images/舰船选中.png";
import RelationEcharts from "@/components/RelationEcharts.vue";
import axios from "axios";
let acitveIndex = ref(1);
let dialogVisible = ref(false);
const myTable = ref(null);
const gutter = ref(20);//折叠项间距
// onMounted(()=>{
//   setInterval(()=>{
//     gutter.value += 1;
//   },500)
// })
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
let form = ref({
  name: "",
  country: "",
  type: "",
});
let dialogForm = ref({});
let tableDataName = ref("飞机目标");
const activeNames = ref(["1"]);
const handleChange = (val: string[]) => {
  console.log(val);
};
const tableData = ref({});

let tools = [
  {
    index: 1,
    name: "飞机目标",
    icon: feijiIcon,
    icon1: feijiIcon1,
  },
  {
    index: 2,
    name: "舰船目标",
    icon: jianchuanIcon,
    icon1: jianchuanIcon1,
  },
];
let clickTools = (i: any) => {
  acitveIndex.value = i.index;
  tableDataName.value = i.name;
};
const tableRowClassName = ({ row, rowIndex }: any): any => {
  if (rowIndex % 2 == 0) {
    return "";
  } else {
    return "warning-row";
  }
};
let currentName = ref();

const openDetail = (item: any) => {
  activeNames.value = ["1"]
  dialogVisible.value = true;
  currentName.value = item.name;
  // console.log(obj[currentName.value]);
};
// 基本标识属性
const obj = ref();
// 性能属性
const obj1 = ref({
  // 尼米兹航空母舰: [
  //   {
  //     name: "最大航速",
  //     value: "",
  //   },
  //   {
  //     name: "巡航航速",
  //     value: "",
  //   },
  //   {
  //     name: "转弯半径",
  //     value: "",
  //   },
  //   {
  //     name: "补给航速",
  //     value: "",
  //   },
  //   {
  //     name: "舰载机起降条件",
  //     value: "",
  //   },
  //   {
  //     name: "舰载战斗机最短勤务保障时间",
  //     value: "",
  //   },
  //   {
  //     name: "可搭载舰载机类型及数量",
  //     value: "",
  //   },
  //   {
  //     name: "舰载机搭载方案",
  //     value: "",
  //   },
  //   {
  //     name: "补给系统",
  //     value: "",
  //   },
  //   {
  //     name: "补给能力",
  //     value: "",
  //   },
  //   {
  //     name: "补给弹药储备量",
  //     value: "",
  //   },
  //   {
  //     name: "补给干货储存量",
  //     value: "",
  //   },
  //   {
  //     name: "补给油料储备量",
  //     value: "",
  //   },
  //   {
  //     name: "补给方式",
  //     value: "",
  //   },
  //   {
  //     name: "补给时间",
  //     value: "2010年2月",
  //   },
  //   {
  //     name: "补给运输人员",
  //     value: "",
  //   },
  //   {
  //     name: "补给运输装备",
  //     value: "",
  //   },
  //   {
  //     name: "标准排水量",
  //     value: "100,020长吨",
  //   },
  //   {
  //     name: "满载排水量",
  //     value: "112,020短吨",
  //   },
  //   {
  //     name: "最大吃水",
  //     value: "37英尺",
  //   },
  //   {
  //     name: "空载吃水",
  //     value: "37英尺",
  //   },
  //   {
  //     name: "燃油储备量",
  //     value: "",
  //   },
  //   {
  //     name: "弹药储备量",
  //     value: "",
  //   },
  //   {
  //     name: "淡水储备量",
  //     value: "",
  //   },
  //   {
  //     name: "地面控制站",
  //     value: "",
  //   },
  //   {
  //     name: "地面控制站地理位置",
  //     value: "",
  //   },
  // ],
  // 辽宁号航空母舰: [
  //   {
  //     name: "最大航速",
  //     value: "29节",
  //   },
  //   {
  //     name: "巡航航速",
  //     value: "14节",
  //   },
  //   {
  //     name: "转弯半径",
  //     value: "",
  //   },
  //   {
  //     name: "补给航速",
  //     value: "",
  //   },
  //   {
  //     name: "舰载机起降条件",
  //     value: "",
  //   },
  //   {
  //     name: "舰载战斗机最短勤务保障时间",
  //     value: "",
  //   },
  //   {
  //     name: "可搭载舰载机类型及数量",
  //     value: "",
  //   },
  //   {
  //     name: "舰载机搭载方案",
  //     value: "",
  //   },
  //   {
  //     name: "补给系统",
  //     value: "",
  //   },
  //   {
  //     name: "补给能力",
  //     value: "",
  //   },
  //   {
  //     name: "补给弹药储备量",
  //     value: "",
  //   },
  //   {
  //     name: "补给干货储存量",
  //     value: "",
  //   },
  //   {
  //     name: "补给油料储备量",
  //     value: "",
  //   },
  //   {
  //     name: "补给方式",
  //     value: "",
  //   },
  //   {
  //     name: "补给时间",
  //     value: "",
  //   },
  //   {
  //     name: "补给运输人员",
  //     value: "",
  //   },
  //   {
  //     name: "补给运输装备",
  //     value: "",
  //   },
  //   {
  //     name: "标准排水量",
  //     value: "",
  //   },
  //   {
  //     name: "满载排水量",
  //     value: "",
  //   },
  //   {
  //     name: "最大吃水",
  //     value: "10米",
  //   },
  //   {
  //     name: "空载吃水",
  //     value: "",
  //   },
  //   {
  //     name: "燃油储备量",
  //     value: "",
  //   },
  //   {
  //     name: "弹药储备量",
  //     value: "",
  //   },
  //   {
  //     name: "淡水储备量",
  //     value: "",
  //   },
  //   {
  //     name: "地面控制站",
  //     value: "",
  //   },
  //   {
  //     name: "地面控制站地理位置",
  //     value: "",
  //   },
  // ],
  // "F-15战斗机": [
  //   {
  //     name: "作战半径",
  //     value: "1,965公里",
  //   },
  //   {
  //     name: "最大航程",
  //     value: "5,600公里",
  //   },
  //   {
  //     name: "实用航程",
  //     value: "",
  //   },
  //   {
  //     name: "续航时间",
  //     value: "",
  //   },
  //   {
  //     name: "起飞条件",
  //     value: "",
  //   },
  //   {
  //     name: "最大平飞速度",
  //     value: "2.05马赫",
  //   },
  //   {
  //     name: "巡航速度",
  //     value: "0.95马赫",
  //   },
  //   {
  //     name: "巡航高度",
  //     value: "16英尺",
  //   },
  //   {
  //     name: "实用升限",
  //     value: "19,800米",
  //   },
  //   {
  //     name: "推重比",
  //     value: "1.071",
  //   },
  //   {
  //     name: "最短勤务保障时间",
  //     value: "",
  //   },
  //   {
  //     name: "最大着陆重量",
  //     value: "",
  //   },
  //   {
  //     name: "外挂燃油量",
  //     value: "",
  //   },
  //   {
  //     name: "武器挂载方案",
  //     value: "",
  //   },
  //   {
  //     name: "挂（点）架数量",
  //     value: "",
  //   },
  //   {
  //     name: "载弹量",
  //     value: "",
  //   },
  //   {
  //     name: "最小起飞距离",
  //     value: "",
  //   },
  //   {
  //     name: "最小着陆距离",
  //     value: "",
  //   },
  //   {
  //     name: "爬升率",
  //     value: "20,440米/分钟 ; 67,050英尺/分钟",
  //   },
  //   {
  //     name: "爬升率条件",
  //     value: "加力燃烧室以大角度爬升姿",
  //   },
  //   {
  //     name: "旋回半径",
  //     value: "",
  //   },
  //   {
  //     name: "飞行包线",
  //     value: "",
  //   },
  //   {
  //     name: "机动过载",
  //     value: "",
  //   },
  //   {
  //     name: "是否空中加油",
  //     value: "",
  //   },
  //   {
  //     name: "是否舰载",
  //     value: "",
  //   },
  //   {
  //     name: "加油时间",
  //     value: "",
  //   },
  //   {
  //     name: "小时耗油率",
  //     value: "",
  //   },
  //   {
  //     name: "加油机载油量",
  //     value: "",
  //   },
  //   {
  //     name: "加油机补给飞机数量",
  //     value: "",
  //   },
  //   {
  //     name: "加油机加油速度",
  //     value: "",
  //   },
  // ],
  // "F-16战斗机": [
  //   {
  //     name: "作战半径",
  //     value: "295海英里",
  //   },
  //   {
  //     name: "最大航程",
  //     value: "3,100海英里",
  //   },
  //   {
  //     name: "实用航程",
  //     value: "",
  //   },
  //   {
  //     name: "续航时间",
  //     value: "",
  //   },
  //   {
  //     name: "起飞条件",
  //     value: "",
  //   },
  //   {
  //     name: "最大平飞速度",
  //     value: "2.05马赫",
  //   },
  //   {
  //     name: "巡航速度",
  //     value: "0.95马赫",
  //   },
  //   {
  //     name: "巡航高度",
  //     value: "16英尺",
  //   },
  //   {
  //     name: "实用升限",
  //     value: "19,800米",
  //   },
  //   {
  //     name: "推重比",
  //     value: "1.24",
  //   },
  //   {
  //     name: "最短勤务保障时间",
  //     value: "",
  //   },
  //   {
  //     name: "最大着陆重量",
  //     value: "",
  //   },
  //   {
  //     name: "外挂燃油量",
  //     value: "3,000浬",
  //   },
  //   {
  //     name: "武器挂载方案",
  //     value: "",
  //   },
  //   {
  //     name: "挂（点）架数量",
  //     value: "",
  //   },
  //   {
  //     name: "载弹量",
  //     value: "29,500磅",
  //   },
  //   {
  //     name: "最小起飞距离",
  //     value: "",
  //   },
  //   {
  //     name: "最小着陆距离",
  //     value: "",
  //   },
  //   {
  //     name: "爬升率",
  //     value: "1200英尺/秒",
  //   },
  //   {
  //     name: "爬升率条件",
  //     value: "",
  //   },
  //   {
  //     name: "旋回半径",
  //     value: "",
  //   },
  //   {
  //     name: "飞行包线",
  //     value: "",
  //   },
  //   {
  //     name: "机动过载",
  //     value: "9g",
  //   },
  //   {
  //     name: "是否空中加油",
  //     value: "",
  //   },
  //   {
  //     name: "是否舰载",
  //     value: "",
  //   },
  //   {
  //     name: "加油时间",
  //     value: "",
  //   },
  //   {
  //     name: "小时耗油率",
  //     value: "",
  //   },
  //   {
  //     name: "加油机载油量",
  //     value: "",
  //   },
  //   {
  //     name: "加油机补给飞机数量",
  //     value: "",
  //   },
  //   {
  //     name: "加油机加油速度",
  //     value: "",
  //   },
  // ],
});
// 物理属性
const obj2 = ref({
  // 尼米兹航空母舰: [
  //   {
  //     name: "要害部位",
  //     value: "",
  //   },
  //   {
  //     name: "要害部位位置",
  //     value: "",
  //   },
  //   {
  //     name: "电磁散射特性",
  //     value: "",
  //   },
  //   {
  //     name: "红外特性",
  //     value: "",
  //   },
  //   {
  //     name: "光学特性",
  //     value: "",
  //   },
  // ],
  // 辽宁号航空母舰: [
  //   {
  //     name: "要害部位",
  //     value: "",
  //   },
  //   {
  //     name: "要害部位位置",
  //     value: "",
  //   },
  //   {
  //     name: "电磁散射特性",
  //     value: "",
  //   },
  //   {
  //     name: "红外特性",
  //     value: "",
  //   },
  //   {
  //     name: "光学特性",
  //     value: "",
  //   },
  // ],
  // "F-15战斗机": [
  //   {
  //     name: "电磁散射特性",
  //     value: "",
  //   },
  //   {
  //     name: "红外特性",
  //     value: "",
  //   },
  //   {
  //     name: "光学特性",
  //     value: "",
  //   },
  //   {
  //     name: "机体材料",
  //     value: "",
  //   },
  //   {
  //     name: "机体总局",
  //     value: "",
  //   },
  // ],
  // "F-16战斗机": [
  //   {
  //     name: "电磁散射特性",
  //     value: "",
  //   },
  //   {
  //     name: "红外特性",
  //     value: "",
  //   },
  //   {
  //     name: "光学特性",
  //     value: "",
  //   },
  //   {
  //     name: "机体材料",
  //     value: "",
  //   },
  //   {
  //     name: "机体总局",
  //     value: "",
  //   },
  // ],
});
// 功能
const obj3 = ref({
  // 尼米兹航空母舰: [
  //   {
  //     name: "装载武器类型",
  //     value: "",
  //   },
  //   {
  //     name: "装载武器数量",
  //     value: "",
  //   },
  //   {
  //     name: "导弹发射装置",
  //     value: "",
  //   },
  //   {
  //     name: "导弹",
  //     value:
  //       "2 × RIM-7海麻雀导弹、2 × RIM-116拉姆导弹、2 × 方阵近迫武器系统加特林机炮",
  //   },
  //   {
  //     name: "导弹数量",
  //     value: "6",
  //   },
  //   {
  //     name: "舰炮",
  //     value: "",
  //   },
  //   {
  //     name: "舰炮数量",
  //     value: "",
  //   },
  //   {
  //     name: "舰载机",
  //     value: "",
  //   },
  //   {
  //     name: "鱼雷（水雷）",
  //     value: "SLQ-25A Nixie鱼雷反制系统",
  //   },
  //   {
  //     name: "鱼雷（水雷）数量",
  //     value: "2",
  //   },
  //   {
  //     name: "防空武器型号",
  //     value: "",
  //   },
  //   {
  //     name: "防空武器最大射程",
  //     value: "",
  //   },
  //   {
  //     name: "防空武器最大射高",
  //     value: "",
  //   },
  //   {
  //     name: "防空武器运用方式",
  //     value: "",
  //   },
  //   {
  //     name: "反舰武器型号",
  //     value: "",
  //   },
  //   {
  //     name: "反舰武器最大射程",
  //     value: "",
  //   },
  //   {
  //     name: "反舰武器运用方式",
  //     value: "",
  //   },
  //   {
  //     name: "反潜武器型号",
  //     value: "",
  //   },
  //   {
  //     name: "反潜武器最大射程",
  //     value: "",
  //   },
  //   {
  //     name: "反潜武器运用方式",
  //     value: "",
  //   },
  //   {
  //     name: "对陆武器型号",
  //     value: "",
  //   },
  //   {
  //     name: "对陆武器最大射程",
  //     value: "",
  //   },
  //   {
  //     name: "对陆武器运用方式",
  //     value: "",
  //   },
  //   {
  //     name: "指控系统",
  //     value: "",
  //   },
  //   {
  //     name: "通信系统",
  //     value: "",
  //   },
  //   {
  //     name: "通信系统数量",
  //     value: "",
  //   },
  // ],
  // 辽宁号航空母舰: [
  //   {
  //     name: "装载武器类型",
  //     value:
  //       "12单元P-700花岗石导弹（SS-N-19）反舰巡航导弹垂直发射装置（备弹12枚）",
  //   },
  //   {
  //     name: "装载武器数量",
  //     value: "12",
  //   },
  //   {
  //     name: "导弹发射装置",
  //     value: "346型相控阵雷达",
  //   },
  //   {
  //     name: "导弹",
  //     value: "P-700花岗石导弹",
  //   },
  //   {
  //     name: "导弹数量",
  //     value: "12单元",
  //   },
  //   {
  //     name: "舰炮",
  //     value:
  //       "8座ZM87“卡什坦”（Kashtan）导炮合一近防系统；4座AK-630M型6管30毫米近防炮",
  //   },
  //   {
  //     name: "舰炮数量",
  //     value: "8座",
  //   },
  //   {
  //     name: "舰载机",
  //     value:
  //       "Su-33（Su-27）和Mig-29战斗机、Ka-27反潜直升机、Ka-31预警直升机等类型",
  //   },
  //   {
  //     name: "鱼雷（水雷）",
  //     value: "10联装反潜／反鱼雷多管火箭（RBU-12000",
  //   },
  //   {
  //     name: "鱼雷（水雷）数量",
  //     value: "2",
  //   },
  //   {
  //     name: "防空武器型号",
  //     value: "六联3K95“匕首”（SA-N-9)",
  //   },
  //   {
  //     name: "防空武器最大射程",
  //     value: "",
  //   },
  //   {
  //     name: "防空武器最大射高",
  //     value: "",
  //   },
  //   {
  //     name: "防空武器运用方式",
  //     value: "",
  //   },
  //   {
  //     name: "反舰武器型号",
  //     value: "",
  //   },
  //   {
  //     name: "反舰武器最大射程",
  //     value: "",
  //   },
  //   {
  //     name: "反舰武器运用方式",
  //     value: "",
  //   },
  //   {
  //     name: "反潜武器型号",
  //     value: "",
  //   },
  //   {
  //     name: "反潜武器最大射程",
  //     value: "",
  //   },
  //   {
  //     name: "反潜武器运用方式",
  //     value: "",
  //   },
  //   {
  //     name: "对陆武器型号",
  //     value: "",
  //   },
  //   {
  //     name: "对陆武器最大射程",
  //     value: "",
  //   },
  //   {
  //     name: "对陆武器运用方式",
  //     value: "",
  //   },
  //   {
  //     name: "指控系统",
  //     value: "",
  //   },
  //   {
  //     name: "通信系统",
  //     value: "",
  //   },
  //   {
  //     name: "通信系统数量",
  //     value: "",
  //   },
  // ],
  // "F-15战斗机": [
  //   {
  //     name: "地位作用",
  //     value: "",
  //   },
  //   {
  //     name: "机载航炮",
  //     value: "",
  //   },
  //   {
  //     name: "机载航炮数量",
  //     value: "",
  //   },
  //   {
  //     name: "空空导弹型号",
  //     value: "",
  //   },
  //   {
  //     name: "空空导弹数量",
  //     value: "",
  //   },
  //   {
  //     name: "空空导弹性能",
  //     value: "",
  //   },
  //   {
  //     name: "空地导弹",
  //     value: "",
  //   },
  //   {
  //     name: "空地导弹最大射程",
  //     value: "",
  //   },
  //   {
  //     name: "空地导弹数量",
  //     value: "",
  //   },
  //   {
  //     name: "航空炸弹",
  //     value: "B-61战术核子弹",
  //   },
  //   {
  //     name: "航空炸弹数量",
  //     value: "11个",
  //   },
  //   {
  //     name: "航空炸弹投掷距离",
  //     value: "",
  //   },
  //   {
  //     name: "反舰导弹型号",
  //     value: "",
  //   },
  //   {
  //     name: "反舰导弹数量",
  //     value: "",
  //   },
  //   {
  //     name: "反舰导弹射程",
  //     value: "",
  //   },
  //   {
  //     name: "反潜武器型号",
  //     value: "",
  //   },
  //   {
  //     name: "反潜武器数量",
  //     value: "",
  //   },
  //   {
  //     name: "反潜武器射程",
  //     value: "",
  //   },
  //   {
  //     name: "鱼雷（水雷）",
  //     value: "",
  //   },
  //   {
  //     name: "鱼雷（水雷）数量",
  //     value: "",
  //   },
  //   {
  //     name: "核弹药型号",
  //     value: "GBU-28",
  //   },
  //   {
  //     name: "核弹量",
  //     value: "",
  //   },
  //   {
  //     name: "核弹药精度",
  //     value: "",
  //   },
  //   {
  //     name: "通信系统",
  //     value: "",
  //   },
  //   {
  //     name: "通信系统数量",
  //     value: "",
  //   },
  //   {
  //     name: "通信系统位置",
  //     value: "",
  //   },
  //   {
  //     name: "通信系统性能",
  //     value: "",
  //   },
  //   {
  //     name: "用户及性质",
  //     value: "",
  //   },
  // ],
  // "F-16战斗机": [
  //   {
  //     name: "地位作用",
  //     value: "",
  //   },
  //   {
  //     name: "机载航炮",
  //     value: "",
  //   },
  //   {
  //     name: "机载航炮数量",
  //     value: "",
  //   },
  //   {
  //     name: "空空导弹型号",
  //     value: "",
  //   },
  //   {
  //     name: "空空导弹数量",
  //     value: "",
  //   },
  //   {
  //     name: "空空导弹性能",
  //     value: "",
  //   },
  //   {
  //     name: "空地导弹",
  //     value: "",
  //   },
  //   {
  //     name: "空地导弹最大射程",
  //     value: "",
  //   },
  //   {
  //     name: "空地导弹数量",
  //     value: "",
  //   },
  //   {
  //     name: "航空炸弹",
  //     value: "B-61战术核子弹",
  //   },
  //   {
  //     name: "航空炸弹数量",
  //     value: "11个",
  //   },
  //   {
  //     name: "航空炸弹投掷距离",
  //     value: "",
  //   },
  //   {
  //     name: "反舰导弹型号",
  //     value: "",
  //   },
  //   {
  //     name: "反舰导弹数量",
  //     value: "",
  //   },
  //   {
  //     name: "反舰导弹射程",
  //     value: "",
  //   },
  //   {
  //     name: "反潜武器型号",
  //     value: "",
  //   },
  //   {
  //     name: "反潜武器数量",
  //     value: "",
  //   },
  //   {
  //     name: "反潜武器射程",
  //     value: "",
  //   },
  //   {
  //     name: "鱼雷（水雷）",
  //     value: "",
  //   },
  //   {
  //     name: "鱼雷（水雷）数量",
  //     value: "",
  //   },
  //   {
  //     name: "核弹药型号",
  //     value: "GBU-28",
  //   },
  //   {
  //     name: "核弹量",
  //     value: "",
  //   },
  //   {
  //     name: "核弹药精度",
  //     value: "",
  //   },
  //   {
  //     name: "通信系统",
  //     value: "",
  //   },
  //   {
  //     name: "通信系统数量",
  //     value: "",
  //   },
  //   {
  //     name: "通信系统位置",
  //     value: "",
  //   },
  //   {
  //     name: "通信系统性能",
  //     value: "",
  //   },
  //   {
  //     name: "用户及性质",
  //     value: "",
  //   },
  // ],
});
// 活动
const obj4 = ref({
  // 尼米兹航空母舰: [
  //   {
  //     name: "常用航线",
  //     value: "",
  //   },
  //   {
  //     name: "常用阵位",
  //     value: "",
  //   },
  //   {
  //     name: "典型态势示意图",
  //     value: "",
  //   },
  //   {
  //     name: "重要行动事件",
  //     value: "",
  //   },
  //   {
  //     name: "计划活动情况",
  //     value: "",
  //   },
  //   {
  //     name: "常驻港口",
  //     value: "",
  //   },
  //   {
  //     name: "常驻港口地理位置",
  //     value: "",
  //   },
  //   {
  //     name: "海上补给方式",
  //     value: "",
  //   },
  //   {
  //     name: "常用补给港口",
  //     value: "",
  //   },
  //   {
  //     name: "补给周期",
  //     value: "",
  //   },
  // ],
  // 辽宁号航空母舰: [
  //   {
  //     name: "常用航线",
  //     value: "",
  //   },
  //   {
  //     name: "常用阵位",
  //     value: "",
  //   },
  //   {
  //     name: "典型态势示意图",
  //     value: "",
  //   },
  //   {
  //     name: "重要行动事件",
  //     value: "",
  //   },
  //   {
  //     name: "计划活动情况",
  //     value: "",
  //   },
  //   {
  //     name: "常驻港口",
  //     value: "",
  //   },
  //   {
  //     name: "常驻港口地理位置",
  //     value: "",
  //   },
  //   {
  //     name: "海上补给方式",
  //     value: "",
  //   },
  //   {
  //     name: "常用补给港口",
  //     value: "",
  //   },
  //   {
  //     name: "补给周期",
  //     value: "",
  //   },
  // ],
  // "F-15战斗机": [
  //   {
  //     name: "常驻机场",
  //     value: "",
  //   },
  //   {
  //     name: "常驻机场地理位置",
  //     value: "",
  //   },
  //   {
  //     name: "印太具备保障条件机场",
  //     value: "",
  //   },
  //   {
  //     name: "印太具备保障条件机场地理位置",
  //     value: "",
  //   },
  //   {
  //     name: "主要活动空域",
  //     value: "",
  //   },
  //   {
  //     name: "常用航线",
  //     value: "",
  //   },
  //   {
  //     name: "重要行动事件",
  //     value: "",
  //   },
  //   {
  //     name: "戒备转换时间",
  //     value: "",
  //   },
  //   {
  //     name: "挂弹时间",
  //     value: "",
  //   },
  //   {
  //     name: "装备维修周期",
  //     value: "",
  //   },
  // ],
  // "F-16战斗机": [
  //   {
  //     name: "常驻机场",
  //     value: "",
  //   },
  //   {
  //     name: "常驻机场地理位置",
  //     value: "",
  //   },
  //   {
  //     name: "印太具备保障条件机场",
  //     value: "",
  //   },
  //   {
  //     name: "印太具备保障条件机场地理位置",
  //     value: "",
  //   },
  //   {
  //     name: "主要活动空域",
  //     value: "",
  //   },
  //   {
  //     name: "常用航线",
  //     value: "",
  //   },
  //   {
  //     name: "重要行动事件",
  //     value: "",
  //   },
  //   {
  //     name: "戒备转换时间",
  //     value: "",
  //   },
  //   {
  //     name: "挂弹时间",
  //     value: "",
  //   },
  //   {
  //     name: "装备维修周期",
  //     value: "",
  //   },
  // ],
});
// 级别
const obj5 = ref({
  // 尼米兹航空母舰: [
  //   {
  //     name: "基本描述",
  //     value:
  //       "尼米兹号航空母舰（USS Nimitz CVN-68）是一艘隶属于美国海军的核动力航空母舰，也是一系列尼米兹级核动力航空母舰的第一艘。尼米兹号于1972年5月13日正式下水，其舰名承袭自第二次世界大战期间曾担任美国海军太平洋舰队指挥官的契斯特·尼米兹海军五星上将[5]，该舰目前仍是美国海军重要的打击武力平台，也是现今为止全世界最大型的军舰之一，根据美国海军最新规划，该舰将于2027年除役",
  //   },
  //   {
  //     name: "舰船装备部署图",
  //     value: "",
  //   },
  //   {
  //     name: "目标视频",
  //     value: "",
  //   },
  //   {
  //     name: "雷达影像",
  //     value: "",
  //   },
  //   {
  //     name: "光学影像",
  //     value: "",
  //   },
  // ],
  // 辽宁号航空母舰: [
  //   {
  //     name: "基本描述",
  //     value:
  //       "辽宁号航空母舰，正式名称为中国人民解放军海军辽宁舰（舷号：16），是一艘隶属于中国人民解放军海军的航空母舰，是中国服役的第一艘航空母舰，亦是001型航空母舰的首艘和唯一一艘。该舰舰名源自其改造地辽宁省。",
  //   },
  //   {
  //     name: "舰船装备部署图",
  //     value: "",
  //   },
  //   {
  //     name: "目标视频",
  //     value: "",
  //   },
  //   {
  //     name: "雷达影像",
  //     value: "",
  //   },
  //   {
  //     name: "光学影像",
  //     value: "",
  //   },
  // ],
  // "F-15战斗机": [
  //   {
  //     name: "描述",
  //     value:
  //       "美国空军F-15C鹰式战斗机（86-0161），隶属佛罗里达州空军国民警卫队的第125战斗机联队，第159战斗机中队",
  //   },
  //   {
  //     name: "飞机三视图",
  //     value: "",
  //   },
  //   {
  //     name: "雷达影像",
  //     value: "",
  //   },
  //   {
  //     name: "目标视频",
  //     value: "",
  //   },
  //   {
  //     name: "可见光影像",
  //     value: "",
  //   },
  // ],
  // "F-16战斗机": [
  //   {
  //     name: "描述",
  //     value:
  //       "美国空军国民警卫队的F-16C Block30战斗机，隶属科罗拉多州第140联队的第120战斗机中队",
  //   },
  //   {
  //     name: "飞机三视图",
  //     value: "",
  //   },
  //   {
  //     name: "雷达影像",
  //     value: "",
  //   },
  //   {
  //     name: "目标视频",
  //     value: "",
  //   },
  //   {
  //     name: "可见光影像",
  //     value: "",
  //   },
  // ],
});
const inputSearch = () => {
  // let data = tableData[tableDataName.value];
  // if (data && data.length > 0) {
  //   // 折叠树结构
  //   shrinkTableTree(data);
  //   // 如果搜索框为空，则不执行任何操作
  //   if (form.name === "") {
  //     return;
  //   }
  //   // 再展开定位到的位置
  //   expandAndHighlight(data);
  // }
};
/** 折叠行 **/
const shrinkTableTree = (data: any) => {
  // 强制收缩第一行（第一行在下面循环关闭不了）
  myTable.value.toggleRowExpansion(data[0], false);
  for (const row of data) {
    if (row.children && row.children.length > 0) {
      shrinkTableTree(row.children);
    }
    myTable.value.toggleRowExpansion(row, false);
  }
};

/** 表格展开与高亮 **/
const expandAndHighlight = (data: any) => {
  for (const row of data) {
    // 按tableData表格数据中name模糊搜索
    if (row.name.includes(form.name)) {
      // 切换行的展开状态
      myTable.value.toggleRowExpansion(row);
      // 高亮当前行
      myTable.value.setCurrentRow(row);
      // 定位到行
      nextTick(() => scrollToRow(row));
      return true;
    }
    if (row.children && row.children.length > 0) {
      const found = expandAndHighlight(row.children);
      if (found) {
        // 确保父级也被展开
        myTable.value.toggleRowExpansion(row, true);
        return true;
      }
    }
  }
  return false;
};

/** 定位到行 **/
const scrollToRow = (row: any) => {
  // 获取表格设置的行id
  const rowElement = document.getElementById(`row-${row.id}`);
  if (rowElement) {
    rowElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};



</script>


<style lang="scss" scoped>
@import './layout.scss';
</style>


