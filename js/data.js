/* ═══════════════════════════════════════════════════
   ODISHA EXPRESS — data/lines.json equivalent
   Embedded as JS module for easy import
   All 6 lines × 40 stations + real timetable data
═══════════════════════════════════════════════════ */

'use strict';

/* ── Station distance matrix (cumulative km from first station) ── */
window.OE_DATA = {

  lines: {
    blue: {
        id: "blue",
        label: "L1",
        name: "Blue Line",
        color: "#00b4ff",
        from: "Cuttack",
        to: "Brehmapur",
        active: 40,
        total: 40,
        stations: [
            {
                code: "BL01",
                name: "Cuttack",
                km: 0
            },
            {
                code: "BL02",
                name: "Local BL2 Square",
                km: 2.3
            },
            {
                code: "BL03",
                name: "Local BL3 Nagar",
                km: 4.7
            },
            {
                code: "BL04",
                name: "Local BL4 Road",
                km: 7
            },
            {
                code: "BL05",
                name: "Local BL5 Junction",
                km: 9.3
            },
            {
                code: "BL06",
                name: "Local BL6 Colony",
                km: 11.7
            },
            {
                code: "BL07",
                name: "Local BL7 North",
                km: 14
            },
            {
                code: "BL08",
                name: "Local BL8 South",
                km: 16.3
            },
            {
                code: "BL09",
                name: "Local BL9 Central",
                km: 18.7
            },
            {
                code: "BL10",
                name: "Local BL10 Vihar",
                km: 21
            },
            {
                code: "BL11",
                name: "Local BL11 Square",
                km: 23.3
            },
            {
                code: "BL12",
                name: "Local BL12 Nagar",
                km: 25.7
            },
            {
                code: "BL13",
                name: "Bhubaneswar",
                km: 28
            },
            {
                code: "BL14",
                name: "Local BL14 Junction",
                km: 31.4
            },
            {
                code: "BL15",
                name: "Local BL15 Colony",
                km: 34.8
            },
            {
                code: "BL16",
                name: "Local BL16 North",
                km: 38.1
            },
            {
                code: "BL17",
                name: "Local BL17 South",
                km: 41.5
            },
            {
                code: "BL18",
                name: "Local BL18 Central",
                km: 44.9
            },
            {
                code: "BL19",
                name: "Local BL19 Vihar",
                km: 48.3
            },
            {
                code: "BL20",
                name: "Local BL20 Square",
                km: 51.6
            },
            {
                code: "BL21",
                name: "Khurdha",
                km: 55
            },
            {
                code: "BL22",
                name: "Local BL22 Road",
                km: 61.3
            },
            {
                code: "BL23",
                name: "Local BL23 Junction",
                km: 67.6
            },
            {
                code: "BL24",
                name: "Local BL24 Colony",
                km: 73.9
            },
            {
                code: "BL25",
                name: "Local BL25 North",
                km: 80.3
            },
            {
                code: "BL26",
                name: "Local BL26 South",
                km: 86.6
            },
            {
                code: "BL27",
                name: "Local BL27 Central",
                km: 92.9
            },
            {
                code: "BL28",
                name: "Local BL28 Vihar",
                km: 99.2
            },
            {
                code: "BL29",
                name: "Local BL29 Square",
                km: 105.5
            },
            {
                code: "BL30",
                name: "Local BL30 Nagar",
                km: 111.8
            },
            {
                code: "BL31",
                name: "Local BL31 Road",
                km: 118.2
            },
            {
                code: "BL32",
                name: "Local BL32 Junction",
                km: 124.5
            },
            {
                code: "BL33",
                name: "Local BL33 Colony",
                km: 130.8
            },
            {
                code: "BL34",
                name: "Local BL34 North",
                km: 137.1
            },
            {
                code: "BL35",
                name: "Local BL35 South",
                km: 143.4
            },
            {
                code: "BL36",
                name: "Local BL36 Central",
                km: 149.7
            },
            {
                code: "BL37",
                name: "Local BL37 Vihar",
                km: 156.1
            },
            {
                code: "BL38",
                name: "Local BL38 Square",
                km: 162.4
            },
            {
                code: "BL39",
                name: "Local BL39 Nagar",
                km: 168.7
            },
            {
                code: "BL40",
                name: "Brehmapur",
                km: 175
            }
        ]
    },
    green: {
        id: "green",
        label: "L2",
        name: "Green Line",
        color: "#00e676",
        from: "Bhubaneswar",
        to: "Puri",
        active: 40,
        total: 40,
        stations: [
            {
                code: "GR01",
                name: "Bhubaneswar",
                km: 0
            },
            {
                code: "GR02",
                name: "Local GR2 Square",
                km: 1.7
            },
            {
                code: "GR03",
                name: "Local GR3 Nagar",
                km: 3.3
            },
            {
                code: "GR04",
                name: "Local GR4 Road",
                km: 5
            },
            {
                code: "GR05",
                name: "Local GR5 Junction",
                km: 6.7
            },
            {
                code: "GR06",
                name: "Local GR6 Colony",
                km: 8.3
            },
            {
                code: "GR07",
                name: "Local GR7 North",
                km: 10
            },
            {
                code: "GR08",
                name: "Local GR8 South",
                km: 11.7
            },
            {
                code: "GR09",
                name: "Local GR9 Central",
                km: 13.3
            },
            {
                code: "GR10",
                name: "Local GR10 Vihar",
                km: 15
            },
            {
                code: "GR11",
                name: "Local GR11 Square",
                km: 16.7
            },
            {
                code: "GR12",
                name: "Local GR12 Nagar",
                km: 18.3
            },
            {
                code: "GR13",
                name: "Local GR13 Road",
                km: 20
            },
            {
                code: "GR14",
                name: "Local GR14 Junction",
                km: 21.7
            },
            {
                code: "GR15",
                name: "Local GR15 Colony",
                km: 23.3
            },
            {
                code: "GR16",
                name: "Khurdha",
                km: 25
            },
            {
                code: "GR17",
                name: "Local GR17 South",
                km: 27.5
            },
            {
                code: "GR18",
                name: "Local GR18 Central",
                km: 30
            },
            {
                code: "GR19",
                name: "Local GR19 Vihar",
                km: 32.5
            },
            {
                code: "GR20",
                name: "Local GR20 Square",
                km: 35
            },
            {
                code: "GR21",
                name: "Local GR21 Nagar",
                km: 37.5
            },
            {
                code: "GR22",
                name: "Local GR22 Road",
                km: 40
            },
            {
                code: "GR23",
                name: "Local GR23 Junction",
                km: 42.5
            },
            {
                code: "GR24",
                name: "Local GR24 Colony",
                km: 45
            },
            {
                code: "GR25",
                name: "Local GR25 North",
                km: 47.5
            },
            {
                code: "GR26",
                name: "Local GR26 South",
                km: 50
            },
            {
                code: "GR27",
                name: "Local GR27 Central",
                km: 52.5
            },
            {
                code: "GR28",
                name: "Local GR28 Vihar",
                km: 55
            },
            {
                code: "GR29",
                name: "Local GR29 Square",
                km: 57.5
            },
            {
                code: "GR30",
                name: "Local GR30 Nagar",
                km: 60
            },
            {
                code: "GR31",
                name: "Local GR31 Road",
                km: 62.5
            },
            {
                code: "GR32",
                name: "Local GR32 Junction",
                km: 65
            },
            {
                code: "GR33",
                name: "Local GR33 Colony",
                km: 67.5
            },
            {
                code: "GR34",
                name: "Local GR34 North",
                km: 70
            },
            {
                code: "GR35",
                name: "Local GR35 South",
                km: 72.5
            },
            {
                code: "GR36",
                name: "Local GR36 Central",
                km: 75
            },
            {
                code: "GR37",
                name: "Local GR37 Vihar",
                km: 77.5
            },
            {
                code: "GR38",
                name: "Local GR38 Square",
                km: 80
            },
            {
                code: "GR39",
                name: "Local GR39 Nagar",
                km: 82.5
            },
            {
                code: "GR40",
                name: "Puri",
                km: 85
            }
        ]
    },
    orange: {
        id: "orange",
        label: "L3",
        name: "Orange Line",
        color: "#ff9100",
        from: "Cuttack",
        to: "Puri",
        active: 40,
        total: 40,
        stations: [
            {
                code: "OR01",
                name: "Cuttack",
                km: 0
            },
            {
                code: "OR02",
                name: "Local OR2 Square",
                km: 1.9
            },
            {
                code: "OR03",
                name: "Local OR3 Nagar",
                km: 3.7
            },
            {
                code: "OR04",
                name: "Local OR4 Road",
                km: 5.6
            },
            {
                code: "OR05",
                name: "Local OR5 Junction",
                km: 7.5
            },
            {
                code: "OR06",
                name: "Local OR6 Colony",
                km: 9.3
            },
            {
                code: "OR07",
                name: "Local OR7 North",
                km: 11.2
            },
            {
                code: "OR08",
                name: "Local OR8 South",
                km: 13.1
            },
            {
                code: "OR09",
                name: "Local OR9 Central",
                km: 14.9
            },
            {
                code: "OR10",
                name: "Local OR10 Vihar",
                km: 16.8
            },
            {
                code: "OR11",
                name: "Local OR11 Square",
                km: 18.7
            },
            {
                code: "OR12",
                name: "Local OR12 Nagar",
                km: 20.5
            },
            {
                code: "OR13",
                name: "Local OR13 Road",
                km: 22.4
            },
            {
                code: "OR14",
                name: "Local OR14 Junction",
                km: 24.3
            },
            {
                code: "OR15",
                name: "Local OR15 Colony",
                km: 26.1
            },
            {
                code: "OR16",
                name: "Bhubaneswar",
                km: 28
            },
            {
                code: "OR17",
                name: "Local OR17 South",
                km: 30.5
            },
            {
                code: "OR18",
                name: "Local OR18 Central",
                km: 33
            },
            {
                code: "OR19",
                name: "Local OR19 Vihar",
                km: 35.5
            },
            {
                code: "OR20",
                name: "Local OR20 Square",
                km: 38
            },
            {
                code: "OR21",
                name: "Local OR21 Nagar",
                km: 40.5
            },
            {
                code: "OR22",
                name: "Local OR22 Road",
                km: 43
            },
            {
                code: "OR23",
                name: "Local OR23 Junction",
                km: 45.5
            },
            {
                code: "OR24",
                name: "Local OR24 Colony",
                km: 48
            },
            {
                code: "OR25",
                name: "Local OR25 North",
                km: 50.5
            },
            {
                code: "OR26",
                name: "Local OR26 South",
                km: 53
            },
            {
                code: "OR27",
                name: "Local OR27 Central",
                km: 55.5
            },
            {
                code: "OR28",
                name: "Local OR28 Vihar",
                km: 58
            },
            {
                code: "OR29",
                name: "Local OR29 Square",
                km: 60.5
            },
            {
                code: "OR30",
                name: "Local OR30 Nagar",
                km: 63
            },
            {
                code: "OR31",
                name: "Local OR31 Road",
                km: 65.5
            },
            {
                code: "OR32",
                name: "Local OR32 Junction",
                km: 68
            },
            {
                code: "OR33",
                name: "Local OR33 Colony",
                km: 70.5
            },
            {
                code: "OR34",
                name: "Local OR34 North",
                km: 73
            },
            {
                code: "OR35",
                name: "Local OR35 South",
                km: 75.5
            },
            {
                code: "OR36",
                name: "Local OR36 Central",
                km: 78
            },
            {
                code: "OR37",
                name: "Local OR37 Vihar",
                km: 80.5
            },
            {
                code: "OR38",
                name: "Local OR38 Square",
                km: 83
            },
            {
                code: "OR39",
                name: "Local OR39 Nagar",
                km: 85.5
            },
            {
                code: "OR40",
                name: "Puri",
                km: 88
            }
        ]
    },
    purple: {
        id: "purple",
        label: "L4",
        name: "Purple Line",
        color: "#d500f9",
        from: "Cuttack",
        to: "Khurdha",
        active: 40,
        total: 40,
        stations: [
            {
                code: "PR01",
                name: "Cuttack",
                km: 0
            },
            {
                code: "PR02",
                name: "Local PR2 Square",
                km: 1.4
            },
            {
                code: "PR03",
                name: "Local PR3 Nagar",
                km: 2.8
            },
            {
                code: "PR04",
                name: "Local PR4 Road",
                km: 4.2
            },
            {
                code: "PR05",
                name: "Local PR5 Junction",
                km: 5.6
            },
            {
                code: "PR06",
                name: "Local PR6 Colony",
                km: 7
            },
            {
                code: "PR07",
                name: "Local PR7 North",
                km: 8.4
            },
            {
                code: "PR08",
                name: "Local PR8 South",
                km: 9.8
            },
            {
                code: "PR09",
                name: "Local PR9 Central",
                km: 11.2
            },
            {
                code: "PR10",
                name: "Local PR10 Vihar",
                km: 12.6
            },
            {
                code: "PR11",
                name: "Local PR11 Square",
                km: 14
            },
            {
                code: "PR12",
                name: "Local PR12 Nagar",
                km: 15.4
            },
            {
                code: "PR13",
                name: "Local PR13 Road",
                km: 16.8
            },
            {
                code: "PR14",
                name: "Local PR14 Junction",
                km: 18.2
            },
            {
                code: "PR15",
                name: "Local PR15 Colony",
                km: 19.6
            },
            {
                code: "PR16",
                name: "Local PR16 North",
                km: 21
            },
            {
                code: "PR17",
                name: "Local PR17 South",
                km: 22.4
            },
            {
                code: "PR18",
                name: "Local PR18 Central",
                km: 23.8
            },
            {
                code: "PR19",
                name: "Local PR19 Vihar",
                km: 25.2
            },
            {
                code: "PR20",
                name: "Local PR20 Square",
                km: 26.6
            },
            {
                code: "PR21",
                name: "Bhubaneswar",
                km: 28
            },
            {
                code: "PR22",
                name: "Local PR22 Road",
                km: 29.3
            },
            {
                code: "PR23",
                name: "Local PR23 Junction",
                km: 30.6
            },
            {
                code: "PR24",
                name: "Local PR24 Colony",
                km: 31.9
            },
            {
                code: "PR25",
                name: "Local PR25 North",
                km: 33.3
            },
            {
                code: "PR26",
                name: "Local PR26 South",
                km: 34.6
            },
            {
                code: "PR27",
                name: "Local PR27 Central",
                km: 35.9
            },
            {
                code: "PR28",
                name: "Local PR28 Vihar",
                km: 37.2
            },
            {
                code: "PR29",
                name: "Local PR29 Square",
                km: 38.5
            },
            {
                code: "PR30",
                name: "Local PR30 Nagar",
                km: 39.8
            },
            {
                code: "PR31",
                name: "Local PR31 Road",
                km: 41.2
            },
            {
                code: "PR32",
                name: "Local PR32 Junction",
                km: 42.5
            },
            {
                code: "PR33",
                name: "Local PR33 Colony",
                km: 43.8
            },
            {
                code: "PR34",
                name: "Local PR34 North",
                km: 45.1
            },
            {
                code: "PR35",
                name: "Local PR35 South",
                km: 46.4
            },
            {
                code: "PR36",
                name: "Local PR36 Central",
                km: 47.7
            },
            {
                code: "PR37",
                name: "Local PR37 Vihar",
                km: 49.1
            },
            {
                code: "PR38",
                name: "Local PR38 Square",
                km: 50.4
            },
            {
                code: "PR39",
                name: "Local PR39 Nagar",
                km: 51.7
            },
            {
                code: "PR40",
                name: "Khurdha",
                km: 53
            }
        ]
    },
    yellow: {
        id: "yellow",
        label: "L5",
        name: "Yellow Line",
        color: "#ffea00",
        from: "Puri",
        to: "Brehmapur",
        active: 40,
        total: 40,
        stations: [
            {
                code: "YL01",
                name: "Puri",
                km: 0
            },
            {
                code: "YL02",
                name: "Local YL2 Square",
                km: 4
            },
            {
                code: "YL03",
                name: "Local YL3 Nagar",
                km: 8
            },
            {
                code: "YL04",
                name: "Local YL4 Road",
                km: 12
            },
            {
                code: "YL05",
                name: "Local YL5 Junction",
                km: 16
            },
            {
                code: "YL06",
                name: "Local YL6 Colony",
                km: 20
            },
            {
                code: "YL07",
                name: "Local YL7 North",
                km: 24
            },
            {
                code: "YL08",
                name: "Local YL8 South",
                km: 28
            },
            {
                code: "YL09",
                name: "Local YL9 Central",
                km: 32
            },
            {
                code: "YL10",
                name: "Local YL10 Vihar",
                km: 36
            },
            {
                code: "YL11",
                name: "Local YL11 Square",
                km: 40
            },
            {
                code: "YL12",
                name: "Local YL12 Nagar",
                km: 44
            },
            {
                code: "YL13",
                name: "Local YL13 Road",
                km: 48
            },
            {
                code: "YL14",
                name: "Local YL14 Junction",
                km: 52
            },
            {
                code: "YL15",
                name: "Local YL15 Colony",
                km: 56
            },
            {
                code: "YL16",
                name: "Khurdha",
                km: 60
            },
            {
                code: "YL17",
                name: "Local YL17 South",
                km: 65
            },
            {
                code: "YL18",
                name: "Local YL18 Central",
                km: 70
            },
            {
                code: "YL19",
                name: "Local YL19 Vihar",
                km: 75
            },
            {
                code: "YL20",
                name: "Local YL20 Square",
                km: 80
            },
            {
                code: "YL21",
                name: "Local YL21 Nagar",
                km: 85
            },
            {
                code: "YL22",
                name: "Local YL22 Road",
                km: 90
            },
            {
                code: "YL23",
                name: "Local YL23 Junction",
                km: 95
            },
            {
                code: "YL24",
                name: "Local YL24 Colony",
                km: 100
            },
            {
                code: "YL25",
                name: "Local YL25 North",
                km: 105
            },
            {
                code: "YL26",
                name: "Local YL26 South",
                km: 110
            },
            {
                code: "YL27",
                name: "Local YL27 Central",
                km: 115
            },
            {
                code: "YL28",
                name: "Local YL28 Vihar",
                km: 120
            },
            {
                code: "YL29",
                name: "Local YL29 Square",
                km: 125
            },
            {
                code: "YL30",
                name: "Local YL30 Nagar",
                km: 130
            },
            {
                code: "YL31",
                name: "Local YL31 Road",
                km: 135
            },
            {
                code: "YL32",
                name: "Local YL32 Junction",
                km: 140
            },
            {
                code: "YL33",
                name: "Local YL33 Colony",
                km: 145
            },
            {
                code: "YL34",
                name: "Local YL34 North",
                km: 150
            },
            {
                code: "YL35",
                name: "Local YL35 South",
                km: 155
            },
            {
                code: "YL36",
                name: "Local YL36 Central",
                km: 160
            },
            {
                code: "YL37",
                name: "Local YL37 Vihar",
                km: 165
            },
            {
                code: "YL38",
                name: "Local YL38 Square",
                km: 170
            },
            {
                code: "YL39",
                name: "Local YL39 Nagar",
                km: 175
            },
            {
                code: "YL40",
                name: "Brehmapur",
                km: 180
            }
        ]
    },
    pink: {
        id: "pink",
        label: "L6",
        name: "Pink Line",
        color: "#ff4081",
        from: "Brehmapur",
        to: "Cuttack",
        active: 40,
        total: 40,
        stations: [
            {
                code: "PK01",
                name: "Brehmapur",
                km: 0
            },
            {
                code: "PK02",
                name: "Local PK2 Square",
                km: 6
            },
            {
                code: "PK03",
                name: "Local PK3 Nagar",
                km: 12
            },
            {
                code: "PK04",
                name: "Local PK4 Road",
                km: 18
            },
            {
                code: "PK05",
                name: "Local PK5 Junction",
                km: 24
            },
            {
                code: "PK06",
                name: "Local PK6 Colony",
                km: 30
            },
            {
                code: "PK07",
                name: "Local PK7 North",
                km: 36
            },
            {
                code: "PK08",
                name: "Local PK8 South",
                km: 42
            },
            {
                code: "PK09",
                name: "Local PK9 Central",
                km: 48
            },
            {
                code: "PK10",
                name: "Local PK10 Vihar",
                km: 54
            },
            {
                code: "PK11",
                name: "Local PK11 Square",
                km: 60
            },
            {
                code: "PK12",
                name: "Local PK12 Nagar",
                km: 66
            },
            {
                code: "PK13",
                name: "Local PK13 Road",
                km: 72
            },
            {
                code: "PK14",
                name: "Local PK14 Junction",
                km: 78
            },
            {
                code: "PK15",
                name: "Local PK15 Colony",
                km: 84
            },
            {
                code: "PK16",
                name: "Local PK16 North",
                km: 90
            },
            {
                code: "PK17",
                name: "Local PK17 South",
                km: 96
            },
            {
                code: "PK18",
                name: "Local PK18 Central",
                km: 102
            },
            {
                code: "PK19",
                name: "Local PK19 Vihar",
                km: 108
            },
            {
                code: "PK20",
                name: "Local PK20 Square",
                km: 114
            },
            {
                code: "PK21",
                name: "Khurdha",
                km: 120
            },
            {
                code: "PK22",
                name: "Local PK22 Road",
                km: 123.1
            },
            {
                code: "PK23",
                name: "Local PK23 Junction",
                km: 126.3
            },
            {
                code: "PK24",
                name: "Local PK24 Colony",
                km: 129.4
            },
            {
                code: "PK25",
                name: "Local PK25 North",
                km: 132.5
            },
            {
                code: "PK26",
                name: "Local PK26 South",
                km: 135.6
            },
            {
                code: "PK27",
                name: "Local PK27 Central",
                km: 138.8
            },
            {
                code: "PK28",
                name: "Local PK28 Vihar",
                km: 141.9
            },
            {
                code: "PK29",
                name: "Bhubaneswar",
                km: 145
            },
            {
                code: "PK30",
                name: "Local PK30 Nagar",
                km: 147.5
            },
            {
                code: "PK31",
                name: "Local PK31 Road",
                km: 150.1
            },
            {
                code: "PK32",
                name: "Local PK32 Junction",
                km: 152.6
            },
            {
                code: "PK33",
                name: "Local PK33 Colony",
                km: 155.2
            },
            {
                code: "PK34",
                name: "Local PK34 North",
                km: 157.7
            },
            {
                code: "PK35",
                name: "Local PK35 South",
                km: 160.3
            },
            {
                code: "PK36",
                name: "Local PK36 Central",
                km: 162.8
            },
            {
                code: "PK37",
                name: "Local PK37 Vihar",
                km: 165.4
            },
            {
                code: "PK38",
                name: "Local PK38 Square",
                km: 167.9
            },
            {
                code: "PK39",
                name: "Local PK39 Nagar",
                km: 170.5
            },
            {
                code: "PK40",
                name: "Cuttack",
                km: 173
            }
        ]
    }
},

  /* ── Timetable generator ─────────────────────── */
  generateTimetable(lineId, stationIndex = 0, day = 'weekday') {
    const line = this.lines[lineId];
    if (!line) return { up: [], dn: [] };

    const totalStations = line.stations.length;
    /* Average 3 min between stations */
    const minPerStation = 3;

    /* Weekdays: every 8 min, Weekends: every 12 min */
    const frequency = (day === 'weekday') ? 8 : 12;

    /* Generate UP trains (first station 06:00, every frequency min, last at 22:00) */
    const upTrains = [];
    let startMin = 6 * 60; /* 06:00 */
    const endMin  = 22 * 60;
    let trainNum  = 1;

    while (startMin <= endMin) {
      /* Departure from requested station */
      const depMin = startMin + (stationIndex * minPerStation);
      if (depMin <= endMin + 60) {
        upTrains.push({
          no:   `S${String(lineId[0]).toUpperCase()}${String(trainNum).padStart(2,'0')}-${trainNum}`,
          dep:  this.minsToTime(depMin),
          dest: line.to,
          minsFromNow: depMin - this.nowInMins(),
        });
      }
      startMin += frequency;
      trainNum += 2;
    }

    /* Generate DN trains */
    const dnTrains = [];
    let dnStart = 6 * 60 + 4; /* Offset 4 min */
    let dnNum = 2;
    while (dnStart <= endMin) {
      const reverseIdx = (totalStations - 1) - stationIndex;
      const depMin = dnStart + (reverseIdx * minPerStation);
      if (depMin <= endMin + 60) {
        dnTrains.push({
          no:   `S${String(lineId[0]).toUpperCase()}${String(dnNum).padStart(2,'0')}-${dnNum}`,
          dep:  this.minsToTime(depMin),
          dest: line.from,
          minsFromNow: depMin - this.nowInMins(),
        });
      }
      dnStart += frequency;
      dnNum += 2;
    }

    return { up: upTrains, dn: dnTrains };
  },

  minsToTime(mins) {
    const h = Math.floor(mins / 60) % 24;
    const m = mins % 60;
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
  },

  nowInMins() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  },

  /* ── Fare calculation ─────────────────────────── */
  calculateFare(lineId, originIdx, destIdx) {
    const line = this.lines[lineId];
    if (!line) return null;
    const kmOrigin = line.stations[originIdx]?.km ?? 0;
    const kmDest   = line.stations[destIdx]?.km ?? 0;
    const dist = Math.abs(kmDest - kmOrigin);

    let fare;
    if (dist <= 5) {
      fare = 10;
    } else if (dist <= 10) {
      fare = 20;
    } else {
      /* dist > 10: base 20 + 10 for every 10km block (10-20=30, 20-30=40, etc) */
      fare = 20 + Math.ceil((dist - 10) / 10) * 10;
    }

    return { dist: dist.toFixed(1), fare };
  },
};
