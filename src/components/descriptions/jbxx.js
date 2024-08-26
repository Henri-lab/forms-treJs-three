// 基本信息

// labelName_cn/spanSize/inputType~key

const kv_ship = [
    {
        key: 'name',
        value: "",
    },
    {
        key: 'alias',
        value: "",
    },
    {
        key: 'foreign_name',
        value: "",
    },
    {
        key: 'country',
        value: "",
    },
    {
        key: 'ship_type',
        value: "",
    },
    {
        key: 'ship_class',
        value: "",
    },
    {
        key: 'hull_number',
        value: "",
    },
    {
        key: 'home_port',
        value: "",
    },
    {
        key: 'home_port_coordinates',
        value: "",
    },
    {
        key: 'manufacturer',
        value: "",
    },
    {
        key: 'affiliation',
        value: "",
    },
    {
        key: 'crew_info',
        value: "",
    },
    {
        key: 'development_time',
        value: "",
    },
    {
        key: 'construction_date',
        value: "",
    },
    {
        key: 'launch_date',
        value: "",
    },
    {
        key: 'commission_date',
        value: "",
    },
    {
        key: 'production_quantity',
        value: null,
    },
    {
        key: 'current_active_quantity',
        value: null,
    },
    {
        key: 'mmsi',
        value: "",
    },
    {
        key: 'call_sign',
        value: "",
    },
    {
        key: 'structure',
        value: "",
    },
    {
        key: 'beam',
        value: "",
    },
    {
        key: 'draft',
        value: "",
    },
    {
        key: 'range',
        value: "",
    },
    {
        key: 'wind_resistance',
        value: "",
    },
    {
        key: 'seaworthiness',
        value: "",
    },
    {
        key: 'endurance',
        value: null,
    },
    {
        key: 'unsinkability',
        value: "",
    },
    {
        key: 'freeboard_height',
        value: "",
    },
]

function spanSize_ship(key) {
    const spanMap = {
        name: 1,
        alias: 1,
        foreign_name: 1,
        country: 1,
        ship_type: 1,
        ship_class: 1,
        hull_number: 1,
        home_port: 1,
        home_port_coordinates: 1,
        manufacturer: 1,
        affiliation: 1,
        crew_info: 1,
        development_time: 1,
        construction_date: 1,
        launch_date: 1,
        commission_date: 1,
        production_quantity: 1,
        current_active_quantity: 1,
        mmsi: 1,
        call_sign: 1,
        structure: 1,
        beam: 1,
        draft: 1,
        range: 1,
        wind_resistance: 1,
        seaworthiness: 1,
        endurance: 1,
        unsinkability: 1,
        freeboard_height: 1,
    }
    return spanMap[key] || 1;
}

function labelName_CN_ship(key) {
    const cnMap = {
        name: '目标名称',
        alias: '目标别称',
        foreign_name: '外文名称',
        country: '国家地区',
        ship_type: '舰（艇）型',
        ship_class: '舰（艇）级',
        hull_number: '舷号',
        home_port: '母港',
        home_port_coordinates: '母港地理位置',
        manufacturer: '生产厂家',
        affiliation: '类隶属关系',
        crew_info: '人员情况',
        development_time: '研制时间',
        construction_date: '动工日期',
        launch_date: '下水日期',
        commission_date: '服役日期',
        production_quantity: '生产数量',
        current_active_quantity: '目前在编数',
        mmsi: '海上移动识别码（MMSI）',
        call_sign: '呼号',
        structure: '船体结构',
        beam: '舰（艇）宽',
        draft: '吃水',
        range: '续航力',
        wind_resistance: '抗风力',
        seaworthiness: '适航性',
        endurance: '自持力',
        unsinkability: '不沉性',
        freeboard_height: '干舷高',
    };


    return cnMap[key] || ``;
}

function inputType_ship(key) {
    const inputTypeMap = {
        name: 'basic',
        alias: 'basic',
        foreign_name: 'basic',
        country: 'basic',
        ship_type: 'basic',
        ship_class: 'basic',
        hull_number: 'basic',
        home_port: 'basic',
        home_port_coordinates: 'basic',
        manufacturer: 'basic',
        affiliation: 'basic',
        crew_info: 'basic',
        development_time: 'basic',
        construction_date: 'basic',
        launch_date: 'basic',
        commission_date: 'basic',
        production_quantity: 'basic',
        current_active_quantity: 'basic',
        mmsi: 'basic',
        call_sign: 'basic',
        structure: 'basic',
        beam: 'basic',
        draft: 'basic',
        range: 'basic',
        wind_resistance: 'basic',
        seaworthiness: 'basic',
        endurance: 'basic',
        unsinkability: 'basic',
        freeboard_height: 'basic',
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
    }
}

function wrapObj_ship(obj) {
    return Object.keys(obj).map(key => wrap_ship({ key, value: obj[key] }))
}


export let jbxx_ship = {
    id: 0,
    title: '目标基本属性',
    facilityType: 's',
    data: wrapObj_ship(kv_ship)
}


const kv_aircraft = [
    {
        key: 'name',
        value: "",
    },
    {
        key: 'alias',
        value: "",
    },
    {
        key: 'foreign_name',
        value: "",
    },
    {
        key: 'country',
        value: "",
    },
    {
        key: 'model',
        value: "",
    },
    {
        key: 'manufacturer',
        value: "",
    },
    {
        key: 'production_quantity',
        value: null,
    },
    {
        key: 'development_time',
        value: "",
    },
    {
        key: 'first_flight_date',
        value: "",
    },
    {
        key: 'commission_date',
        value: "",
    },
    {
        key: 'current_active_quantity',
        value: null,
    },
    {
        key: 'primary_user',
        value: "",
    },
    {
        key: 'export_info',
        value: "",
    },
    {
        key: 'derived_models',
        value: "",
    },
    {
        key: 'generation',
        value: "",
    },
    {
        key: 'crew',
        value: null,
    },
    {
        key: 'airframe_structure',
        value: "",
    },
    {
        key: 'empty_weight',
        value: "",
    },
    {
        key: 'max_takeoff_weight',
        value: "",
    },
    {
        key: 'max_fuel_capacity',
        value: "",
    },
]

function spanSize_aircraft(key) {
    const spanMap = {
        name: 1,
        alias: 1,
        foreign_name: 1,
        country: 1,
        model: 1,
        manufacturer: 1,
        production_quantity: 1,
        development_time: 1,
        first_flight_date: 1,
        commission_date: 1,
        current_active_quantity: 1,
        primary_user: 1,
        export_info: 1,
        derived_models: 1,
        generation: 1,
        crew: 1,
        airframe_structure: 1,
        empty_weight: 1,
        max_takeoff_weight: 1,
        max_fuel_capacity: 1,
    }
    return spanMap[key] || 1;
}

function labelName_CN_aircraft(key) {
    const cnMap = {
        name: '目标名称',
        alias: '目标别称',
        foreign_name: '外文名称',
        country: '国家地区',
        model: '机型',
        manufacturer: '生产厂家',
        production_quantity: '生产架数',
        development_time: '研制时间',
        first_flight_date: '首飞时间',
        commission_date: '服役日期',
        current_active_quantity: '目前在编数',
        primary_user: '主要用户',
        export_info: '外销',
        derived_models: '衍生型号',
        generation: '代级',
        crew: '人员编制',
        airframe_structure: '机体组成',
        empty_weight: '空重',
        max_takeoff_weight: '最大起飞重量',
        max_fuel_capacity: '最大载油量',
    };
    return cnMap[key] || ``;
}

function inputType_aircraft(key) {
    const inputTypeMap = {
        name: 'basic',
        alias: 'basic',
        foreign_name: 'basic',
        country: 'basic',
        model: 'basic',
        manufacturer: 'basic',
        production_quantity: 'basic',
        development_time: 'basic',
        first_flight_date: 'basic',
        commission_date: 'basic',
        current_active_quantity: 'basic',
        primary_user: 'basic',
        export_info: 'basic',
        derived_models: 'basic',
        generation: 'basic',
        crew: 'basic',
        airframe_structure: 'basic',
        empty_weight: 'basic',
        max_takeoff_weight: 'basic',
        max_fuel_capacity: 'basic',
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
    }
}

function wrapObj_aircraft(obj) {
    return Object.keys(obj).map(key => wrap_aircraft({ key, value: obj[key] }))
}

export let jbxx_aircraft = {
    id: 1,
    title: '目标基本属性',
    facilityType: 'a', // aircraft
    data: wrapObj_aircraft(kv_aircraft)
}
