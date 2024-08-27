export const countryNameMap = {
  CN: '中国',
  US: '美国',
  JP: '日本',
  RU: '俄罗斯',
  GB: '英国',
  DE: '德国',
  FR: '法国',
  ES: '西班牙',
  IT: '意大利',
  BR: '巴西',
  IN: '印度',
  KR: '韩国',
  TR: '土耳其',
};
// 转换键为小写
export const lowerCaseCountryNameMap = Object.fromEntries(
  Object.entries(countryNameMap).map(([key, value]) => [
    key.toLowerCase(),
    value,
  ])
);
