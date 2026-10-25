// ############################################################################//
//                                                                             //
//    ... перезагрузить z2m, что бы конвертер применился                       //
//                                                                             //
//#############################################################################//

const {
    numeric,
	enumLookup,
	reporting,
	temperature,
	pressure,
} = require('zigbee-herdsman-converters/lib/modernExtend');

const fourReporting = {min: 30, max: 1800, change: 10};
const pmReporting = {min: 10, max: 600, change: 0.1};


const definition = {
        zigbeeModel: ["EFEKTA_TDS_Monitor"],
        model: "EFEKTA_TDS_Monitor",
        vendor: "EFEKTA",
        description: "TDS Monitor with DS18B20 temperature sensor",
        extend: [
            temperature({
                reporting: fourReporting,
                access: "STATE",
            }),
            numeric({
                name: "tds",
                unit: "ppm",
                cluster: "genBasic",
                attribute: {ID: 0x0555, type: 0x39},
                description: "Measured Total Dissolved Solids value",
                access: "STATE",
                reporting: pmReporting,
                precision: 1,
            }),
			numeric({
                name: "salinity",
                unit: "‰",
                cluster: "genBasic",
                attribute: {ID: 0x055A, type: 0x39},
                description: "Measured Salinity value",
                access: "STATE",
                reporting: pmReporting,
                precision: 2,
            }),
			numeric({
                name: "sg",
                unit: "-",
                cluster: "genBasic",
                attribute: {ID: 0x055B, type: 0x39},
                description: "Measured Specific Gravity value",
                access: "STATE",
                reporting: pmReporting,
                precision: 4,
            }),
			numeric({
                name: "ec",
                unit: "µS/cm",
                cluster: "genBasic",
                attribute: {ID: 0x055D, type: 0x39},
                description: "Measured Electrical Conductivity value",
                access: "STATE",
                reporting: pmReporting,
                precision: 1,
            }),
			numeric({
                name: 'osmotic_pressure',
                unit: 'bar',
                cluster: 'msPressureMeasurement',
                attribute: 'measuredValue',
                description: 'Measured Osmotic pressure value in bar',
                scale: 100,
                precision: 2,
                access: 'STATE',
				reporting: pmReporting,
            }),
			numeric({
                name: 'osmotic_pressure_engineering',
                unit: 'bar',
                cluster: 'msPressureMeasurement',
                attribute: {ID: 0x0571, type: 0x29},
                description: 'Measured Osmotic pressure engineering value in bar',
                scale: 100,
                precision: 2,
                access: 'STATE',
				reporting: pmReporting,
            }),
			enumLookup({
                name: "water_type",
                lookup: {"Fresh Water": 0, "Sea Water": 1},
                cluster: "genBasic",
                attribute: {ID: 0x055C, type: 0x20},
                description: "Water type",
                access: "STATE_SET",
            }),
            enumLookup({
                name: "tds_coefficient",
                lookup: {"500": 500, "550": 550, "640": 640, "700": 700, "1000": 1000},
                cluster: "genBasic",
                attribute: {ID: 0x0557, type: 0x21},
                description: "TDS coefficient",
                access: "STATE_SET",
            }),
            numeric({
                name: "reading_interval",
                unit: "Seconds",
                valueMin: 10,
                valueMax: 360,
                cluster: "genBasic",
                attribute: {ID: 0x0201, type: 0x21},
                description: "Setting the sensor reading interval in seconds, by default 30 seconds",
                access: "STATE_SET",
            }),
            numeric({
                name: "tds_offset",
                unit: "ppm",
                valueMin: -100.0,
                valueMax: 100.0,
                valueStep: 0.1,
                cluster: "genBasic",
                attribute: {ID: 0x0556, type: 0x39},
                description: "Adjust TDS",
                access: "STATE_SET",
            }),
			numeric({
                name: "ecCalibration",
                unit: "ppm",
                valueMin: -10.0,
                valueMax: 10.0,
                valueStep: 0.001,
                cluster: "genBasic",
                attribute: {ID: 0x0559, type: 0x39},
                description: "EC calibration",
                access: "STATE_SET",
            }),
            enumLookup({
                name: "tx_radio_power",
                lookup: {"4dbm": 4, "19dbm": 19},
                cluster: "genBasic",
                attribute: {ID: 0x0236, type: 0x28},
                description: "Set TX Radio Power, dbm",
                access: "STATE_SET",
            }),
        ],
    };

module.exports = definition;