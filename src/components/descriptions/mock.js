import axios from 'axios'
export let data = {}
export let jbxx_aircraft_arr = []
export let jbxx_ship_arr = []
export let xnsx_aircraft_arr = []
export let xnsx_ship_arr = []
export let wltx_aircraft_arr = []
export let wltx_ship_arr = []
export let gnsx_aircraft_arr = []
export let gnsx_ship_arr = []
export let hdtx_aircraft_arr = []
export let hdtx_ship_arr = []
export let sbtx_aircraft_arr = []
export let sbtx_ship_arr = []
export let tree = []

axios.get('/data.json').then(res => {
    data = res.data
    console.log(data, '示例数据JSON')
    Object.keys(data['jbxx']).forEach(k => {
        if (k.includes('机')) {
            jbxx_aircraft_arr.push(data['jbxx'][k])
        } else if (k.includes('舰')) {
            jbxx_ship_arr.push(data['jbxx'][k])
        }
    })
    console.log(jbxx_aircraft_arr, '飞机基础信息')
    console.log(jbxx_ship_arr, '舰船基础信息')

    Object.keys(data['xnsx']).forEach(k => {
        if (k.includes('机')) {
            xnsx_aircraft_arr.push(data['xnsx'][k])
        } else if (k.includes('舰')) {
            xnsx_ship_arr.push(data['xnsx'][k])
        }
    })
    console.log(xnsx_aircraft_arr, '飞机性能属性')
    console.log(xnsx_ship_arr, '舰船性能属性')


    Object.keys(data['wltx']).forEach(k => {
        if (k.includes('机')) {
            wltx_aircraft_arr.push(data['wltx'][k])
        } else if (k.includes('舰')) {
            wltx_ship_arr.push(data['wltx'][k])
        }
    })
    console.log(wltx_aircraft_arr, '3 飞机物理特性')
    console.log(wltx_ship_arr, '3 舰船物理特性')

    Object.keys(data['hdtx']).forEach(k => {
        if (k.includes('机')) {
            hdtx_aircraft_arr.push(data['hdtx'][k])
        } else if (k.includes('舰')) {
            hdtx_ship_arr.push(data['hdtx'][k])
        }
    })
    console.log(hdtx_aircraft_arr, '3 飞机活动特性')
    console.log(hdtx_ship_arr, '3 舰船活动特性')


    Object.keys(data['sbtx']).forEach(k => {
        if (k.includes('机')) {
            sbtx_aircraft_arr.push(data['sbtx'][k])
        } else if (k.includes('舰')) {
            sbtx_ship_arr.push(data['sbtx'][k])
        }
    })
    console.log(sbtx_aircraft_arr, '3 飞机识别特性')
    console.log(sbtx_ship_arr, '3 舰船识别特性')


    Object.keys(data['tree']).forEach(k => {
        if (k.includes('机')) {
            sbtx_aircraft_arr.push(data['tree'][k])
        } else if (k.includes('舰')) {
            sbtx_ship_arr.push(data['tree'][k])
        }
    })
    console.log(sbtx_aircraft_arr, '3 飞机识别特性')
    console.log(sbtx_ship_arr, '3 舰船识别特性')

    tree = data['tree']
})


