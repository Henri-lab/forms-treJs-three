// 物理特性
const kv_ship = {
    facilityType: 's',
    data: [
        {
            key: 'critical_part',
            value: "",
        },
        {
            key: 'critical_part_location',
            value: "",
        },
        {
            key: 'em_scattering',
            value: "",
        },
        {
            key: 'infrared',
            value: "",
        },
        {
            key: 'optical',
            value: "",
        },
    ],
};

function labelName_CN_ship(key) {
    const cnMap = {
        critical_part: "要害部位",
        critical_part_location: "要害部位位置",
        em_scattering: "电磁散射特性",
        infrared: "红外特性",
        optical: "光学特性",
    };
    return cnMap[key] || '';
}
function spanSize_ship(key) {
    const spanMap = {
        critical_part: 1,
        critical_part_location: 1,
        em_scattering: 1,
        infrared: 1,
        optical: 1,
    };
    return spanMap[key] || 1;
}

function inputType_ship(key) {
    const inputTypeMap = {
        critical_part: 'basic',
        critical_part_location: 'basic',
        em_scattering: 'basic',
        infrared: 'basic',
        optical: 'basic',
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
    return Object.keys(obj).map(key => wrap_ship({ key, value: obj[key] }));
}

export let wltx_ship = wrapObj_ship(kv_ship);


// 物理特性
const kv_aircraft = {
    facilityType: 'a',
    data: [
        {
            key: 'material',
            value: "",
        },
        {
            key: 'layout',
            value: "",
        },
        {
            key: 'em_scattering',
            value: "",
        },
        {
            key: 'infrared',
            value: "",
        },
        {
            key: 'optical',
            value: "",
        },
    ],
};

function labelName_CN_aircraft(key) {
    const cnMap = {
        material: "机体材料",
        layout: '机体总局',
        em_scattering: "电磁散射特性",
        infrared: "红外特性",
        optical: "光学特性",
    };
    return cnMap[key] || '';
}
function spanSize_aircraft(key) {
    const spanMap = {
        material: 1,
        layout: 1,
        em_scattering: 1,
        infrared: 1,
        optical: 1,
    };
    return spanMap[key] || 1;
}

function inputType_aircraft(key) {
    const inputTypeMap = {
        material: "basic",
        layout: 'basic',
        em_scattering: 'basic',
        infrared: 'basic',
        optical: 'basic',
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
    return Object.keys(obj).map(key => wrap_aircraft({ key, value: obj[key] }));
}

export let wltx_aircraft = wrapObj_aircraft(kv_ship);
