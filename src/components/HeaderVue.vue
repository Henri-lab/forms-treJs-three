<template>
  <div class="header-top">
    <div class="header-top-title">
    </div>
    <div class="header-top-time">
      <span>{{ date }}</span>
      <span>|</span>
      <span>{{ weekTime }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
const date = ref("");
const weekTime = ref("");
//格式化时间的函数  。它接受一个数字类型的参数 time，表示需要格式化的时间。
//如果 time 小于10，则返回一个带有前导零的字符串表示；
//否则，将 time 转换为字符串后返回。
function formatTime(time: number) {
  return time < 10 ? `0${time}` : time;
}
function updateTime() {
  const now = new Date();
  const year = now.getFullYear(); //年
  const month = now.getMonth() + 1; //月
  const day = now.getDate(); //日
  const hours = now.getHours(); //小时数
  const minutes = now.getMinutes(); //分钟数
  const seconds = now.getSeconds(); //秒数
  const week = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ][now.getDay()]; //星期
  //想展示什么  对应的展示即可

  date.value = `${year}年${formatTime(month)}月${formatTime(day)}日`;
  weekTime.value = `${week}`;
}
onMounted(() => {
  updateTime();
});
</script>
<style lang="scss" scoped>
.header-top {
  width: 100%;
  height: 75px;
  background: url("../assets/images/头部.png") no-repeat center;
  display: flex;
  align-items: center;
  .header-top-title {
    width: 500px;
    height: 40px;
    background: url("../assets/images/某地区陆上压制力量展示系统.png") no-repeat
      center;
    background-size: 75%;
  }
  .header-top-time {
    position: fixed;
    right: -36px;
    display: flex;
    align-items: center;
    width: 300px;
    top: 27px;
    justify-content: space-evenly;
    span:nth-child(1) {
      width: 150px;
    }
    span:nth-child(3) {
      width: 150px;
      margin-left: 20px;
    }
  }
}
</style>
<style>
.el-header {
  padding: 0 !important;
}
</style>
