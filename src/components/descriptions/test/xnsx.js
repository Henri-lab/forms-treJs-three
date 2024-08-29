// 性能属性
const kv_ship = {
    facilityType: 's', // ship
    data: [
        { key: 'max_speed', value: "" },
        { key: 'cruise_speed', value: "" },
        { key: 'turning_radius', value: "" },
        { key: 'replenishment_speed', value: "" },
        { key: 'aircraft_operational_conditions', value: "" },
        { key: 'shortest_mission_time', value: "" },
        { key: 'aircraft_capacity', value: "" },
        { key: 'aircraft_loading_plan', value: "" },
        { key: 'replenishment_system', value: "" },
        { key: 'replenishment_capacity', value: "" },
        { key: 'ammo_storage', value: "" },
        { key: 'dry_goods_storage', value: "" },
        { key: 'fuel_storage', value: "" },
        { key: 'replenishment_method', value: "" },
        { key: 'replenishment_time', value: "" },
        { key: 'replenishment_personnel', value: "" },
        { key: 'replenishment_equipment', value: "" },
        { key: 'standard_displacement', value: "" },
        { key: 'full_load_displacement', value: "" },
        { key: 'max_draft', value: "" },
        { key: 'light_draft', value: "" },
        { key: 'fuel_reserve', value: "" },
        { key: 'ammo_reserve', value: "" },
        { key: 'fresh_water_reserve', value: "" },
        { key: 'ground_control_station', value: "" },
        { key: 'ground_control_location', value: "" }
    ]
};

function spanSize_ship(key) {
    const spanMap = {
        max_speed: 1,
        cruise_speed: 1,
        turning_radius: 1,
        replenishment_speed: 1,
        aircraft_operational_conditions: 1,
        shortest_mission_time: 1,
        aircraft_capacity: 1,
        aircraft_loading_plan: 1,
        replenishment_system: 1,
        replenishment_capacity: 1,
        ammo_storage: 1,
        dry_goods_storage: 1,
        fuel_storage: 1,
        replenishment_method: 1,
        replenishment_time: 1,
        replenishment_personnel: 1,
        replenishment_equipment: 1,
        standard_displacement: 1,
        full_load_displacement: 1,
        max_draft: 1,
        light_draft: 1,
        fuel_reserve: 1,
        ammo_reserve: 1,
        fresh_water_reserve: 1,
        ground_control_station: 1,
        ground_control_location: 1,
    };
    return spanMap[key] || 1;
}

function labelName_CN_ship(key) {
    const cnMap = {
        max_speed: "最大航速",
        cruise_speed: "巡航航速",
        turning_radius: "转弯半径",
        replenishment_speed: "补给航速",
        aircraft_operational_conditions: "舰载机起降条件",
        shortest_mission_time: "舰载战斗机最短勤务保障时间",
        aircraft_capacity: "可搭载舰载机类型及数量",
        aircraft_loading_plan: "舰载机搭载方案",
        replenishment_system: "补给系统",
        replenishment_capacity: "补给能力",
        ammo_storage: "补给弹药储备量",
        dry_goods_storage: "补给干货储存量",
        fuel_storage: "补给油料储备量",
        replenishment_method: "补给方式",
        replenishment_time: "补给时间",
        replenishment_personnel: "补给运输人员",
        replenishment_equipment: "补给运输装备",
        standard_displacement: "标准排水量",
        full_load_displacement: "满载排水量",
        max_draft: "最大吃水",
        light_draft: "空载吃水",
        fuel_reserve: "燃油储备量",
        ammo_reserve: "弹药储备量",
        fresh_water_reserve: "淡水储备量",
        ground_control_station: "地面控制站",
        ground_control_location: "地面控制站地理位置",
    };
    return cnMap[key] || ``;
}

function inputType_ship(key) {
    const inputTypeMap = {
        max_speed: 'basic',
        cruise_speed: 'basic',
        turning_radius: 'basic',
        replenishment_speed: 'basic',
        aircraft_operational_conditions: 'basic',
        shortest_mission_time: 'basic',
        aircraft_capacity: 'basic',
        aircraft_loading_plan: 'basic',
        replenishment_system: 'basic',
        replenishment_capacity: 'basic',
        ammo_storage: 'basic',
        dry_goods_storage: 'basic',
        fuel_storage: 'basic',
        replenishment_method: 'basic',
        replenishment_time: 'basic',
        replenishment_personnel: 'basic',
        replenishment_equipment: 'basic',
        standard_displacement: 'basic',
        full_load_displacement: 'basic',
        max_draft: 'basic',
        light_draft: 'basic',
        fuel_reserve: 'basic',
        ammo_reserve: 'basic',
        fresh_water_reserve: 'basic',
        ground_control_station: 'basic',
        ground_control_location: 'basic',
    };
    return inputTypeMap[key] || 'basic';
}

function wrap_ship({ key, value }) {
    return {
        key,
        value,
        name: labelName_CN_ship(key),
        span: spanSize_ship(key),
        type: inputType_ship(key),
        status: true,
    };
}

function wrapObj_ship(obj) {
    let res = []
    obj.forEach(item => {
        res.push(wrap_ship(item))
    })
    return res;
}

export let xxsx_ship = wrapObj_ship(kv_ship);


const kv_aircraft = {
    facilityType: 'a',
    data: [
        {
            key: 'combat_radius',
            value: "",
        },
        {
            key: 'max_range',
            value: "",
        },
        {
            key: 'practical_range',
            value: "",
        },
        {
            key: 'endurance_time',
            value: "",
        },
        {
            key: 'takeoff_conditions',
            value: "",
        },
        {
            key: 'max_level_flight_speed',
            value: "",
        },
        {
            key: 'cruise_speed',
            value: "",
        },
        {
            key: 'cruise_altitude',
            value: "",
        },
        {
            key: 'practical_ceiling',
            value: "",
        },
        {
            key: 'thrust_to_weight_ratio',
            value: "",
        },
        {
            key: 'shortest_maintenance_support_time',
            value: "",
        },
        {
            key: 'max_landing_weight',
            value: "",
        },
        {
            key: 'external_fuel_capacity',
            value: "",
        },
        {
            key: 'weapon_mounting_scheme',
            value: "",
        },
        {
            key: 'mounting_rack_quantity',
            value: "",
        },
        {
            key: 'payload',
            value: "",
        },
        {
            key: 'minimum_takeoff_distance',
            value: "",
        },
        {
            key: 'minimum_landing_distance',
            value: "",
        },
        {
            key: 'climb_rate',
            value: "",
        },
        {
            key: 'climb_rate_conditions',
            value: "",
        },
        {
            key: 'turning_radius',
            value: "",
        },
        {
            key: 'flight_envelope',
            value: "",
        },
        {
            key: 'maneuver_overload',
            value: "",
        },
        {
            key: 'air_refueling_capability',
            value: "",
        },
        {
            key: 'aircraft_carrier_capability',
            value: "",
        },
        {
            key: 'refueling_time',
            value: "",
        },
        {
            key: 'hourly_fuel_consumption',
            value: "",
        },
        {
            key: 'refueling_aircraft_oil_capacity',
            value: "",
        },
        {
            key: 'refueling_aircraft_supply_quantity',
            value: "",
        },
        {
            key: 'refueling_aircraft_refueling_speed',
            value: "",
        },
    ],
};

function labelName_CN_aircraft(key) {
    const cnMap = {
        combat_radius: "作战半径",
        max_range: "最大航程",
        practical_range: "实用航程",
        endurance_time: "续航时间",
        takeoff_conditions: "起飞条件",
        max_level_flight_speed: "最大平飞速度",
        cruise_speed: "巡航速度",
        cruise_altitude: "巡航高度",
        practical_ceiling: "实用升限",
        thrust_to_weight_ratio: "推重比",
        shortest_maintenance_support_time: "最短勤务保障时间",
        max_landing_weight: "最大着陆重量",
        external_fuel_capacity: "外挂燃油量",
        weapon_mounting_scheme: "武器挂载方案",
        mounting_rack_quantity: "挂（点）架数量",
        payload: "载弹量",
        minimum_takeoff_distance: "最小起飞距离",
        minimum_landing_distance: "最小着陆距离",
        climb_rate: "爬升率",
        climb_rate_conditions: "爬升率条件",
        turning_radius: "旋回半径",
        flight_envelope: "飞行包线",
        maneuver_overload: "机动过载",
        air_refueling_capability: "是否空中加油",
        aircraft_carrier_capability: "是否舰载",
        refueling_time: "加油时间",
        hourly_fuel_consumption: "小时耗油率",
        refueling_aircraft_oil_capacity: "加油机载油量",
        refueling_aircraft_supply_quantity: "加油机补给飞机数量",
        refueling_aircraft_refueling_speed: "加油机加油速度",
    };
    return labelName_CN_aircraft[key] || '';
}

function spanSize_aircraft(key) {
    const spanMap = {
        combat_radius: 1,
        max_range: 1,
        practical_range: 1,
        endurance_time: 1,
        takeoff_conditions: 1,
        max_level_flight_speed: 1,
        cruise_speed: 1,
        cruise_altitude: 1,
        practical_ceiling: 1,
        thrust_to_weight_ratio: 1,
        shortest_maintenance_support_time: 1,
        max_landing_weight: 1,
        external_fuel_capacity: 1,
        weapon_mounting_scheme: 1,
        mounting_rack_quantity: 1,
        payload: 1,
        minimum_takeoff_distance: 1,
        minimum_landing_distance: 1,
        climb_rate: 1,
        climb_rate_conditions: 1,
        turning_radius: 1,
        flight_envelope: 1,
        maneuver_overload: 1,
        air_refueling_capability: 1,
        aircraft_carrier_capability: 1,
        refueling_time: 1,
        hourly_fuel_consumption: 1,
        refueling_aircraft_oil_capacity: 1,
        refueling_aircraft_supply_quantity: 1,
        refueling_aircraft_refueling_speed: 1,
    };
    return spanMap[key] || 1;
}

function inputType_aircraft(key) {
    const inputTypeMap = {
        combat_radius: 'basic',
        max_range: 'basic',
        practical_range: 'basic',
        endurance_time: 'basic',
        takeoff_conditions: 'basic',
        max_level_flight_speed: 'basic',
        cruise_speed: 'basic',
        cruise_altitude: 'basic',
        practical_ceiling: 'basic',
        thrust_to_weight_ratio: 'basic',
        shortest_maintenance_support_time: 'basic',
        max_landing_weight: 'basic',
        external_fuel_capacity: 'basic',
        weapon_mounting_scheme: 'basic',
        mounting_rack_quantity: 'basic',
        payload: 'basic',
        minimum_takeoff_distance: 'basic',
        minimum_landing_distance: 'basic',
        climb_rate: 'basic',
        climb_rate_conditions: 'basic',
        turning_radius: 'basic',
        flight_envelope: 'basic',
        maneuver_overload: 'basic',
        air_refueling_capability: 'basic',
        aircraft_carrier_capability: 'basic',
        refueling_time: 'basic',
        hourly_fuel_consumption: 'basic',
        refueling_aircraft_oil_capacity: 'basic',
        refueling_aircraft_supply_quantity: 'basic',
        refueling_aircraft_refueling_speed: 'basic',
    };
    return inputTypeMap[key] || 'basic';
}

function wrap_aircraft({ key, value }) {
    return {
        key,
        value,
        name: labelName_CN_aircraft(key),
        span: spanSize_aircraft(key),
        type: inputType_aircraft(key),
        status: true,
    };
}

function wrapObj_aircraft(obj) {
    let res = []
    obj.forEach(item => {
        res.push(wrap_aircraft(item))
    })
    return res;
}

export let xnsx_aircraft = wrapObj_aircraft(kv_aircraft);