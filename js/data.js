/* ═══════════════════════════════════════════════════
   ODISHA EXPRESS — data/lines.json equivalent
   Embedded as JS module for easy import
   All 6 lines × 25 stations + real timetable data
═══════════════════════════════════════════════════ */

'use strict';

/* ── Station distance matrix (cumulative km from first station) ── */
window.OE_DATA = {

  lines: {
    blue: {
      id: 'blue', label: 'L1', name: 'Blue Line',
      color: '#00b4ff',
      from: 'Bhubaneswar North', to: 'Bhubaneswar South',
      active: 25, total: 25,
      stations: [
        { code: 'BN01', name: 'Bhubaneswar North',    km: 0.0  },
        { code: 'BN02', name: 'Nayapalli',            km: 1.8  },
        { code: 'BN03', name: 'Rajmahal Square',      km: 3.2  },
        { code: 'BN04', name: 'AIIMS Square',         km: 4.9  },
        { code: 'BN05', name: 'Vani Vihar',           km: 6.3  },
        { code: 'BN06', name: 'Utkal University',     km: 7.5  },
        { code: 'BN07', name: 'Acharya Vihar',        km: 8.8  },
        { code: 'BN08', name: 'Khandagiri Square',    km: 10.1 },
        { code: 'BN09', name: 'Patia',                km: 11.4 },
        { code: 'BN10', name: 'Chandrasekharpur',     km: 12.7 },
        { code: 'BN11', name: 'Infocity',             km: 14.0 },
        { code: 'BN12', name: 'Baramunda',            km: 15.2 },
        { code: 'BN13', name: 'Master Canteen',       km: 16.4 },
        { code: 'BN14', name: 'Bapuji Nagar',         km: 17.5 },
        { code: 'BN15', name: 'Old Town',             km: 18.8 },
        { code: 'BN16', name: 'Bindu Sagar',          km: 19.9 },
        { code: 'BN17', name: 'Lingaraj Temple',      km: 21.0 },
        { code: 'BN18', name: 'Keshari Nagar',        km: 22.2 },
        { code: 'BN19', name: 'KIIT Square',          km: 23.4 },
        { code: 'BN20', name: 'Jagamara',             km: 24.6 },
        { code: 'BN21', name: 'Kalinga Hospital',     km: 25.8 },
        { code: 'BN22', name: 'Satya Nagar',          km: 27.0 },
        { code: 'BN23', name: 'Unit 4 Square',        km: 28.1 },
        { code: 'BN24', name: 'Jaydev Vihar',         km: 29.3 },
        { code: 'BN25', name: 'Bhubaneswar South',    km: 30.5 },
      ],
    },

    green: {
      id: 'green', label: 'L2', name: 'Green Line',
      color: '#00e676',
      from: 'Airport', to: 'Old Town',
      active: 25, total: 25,
      stations: [
        { code: 'GR01', name: 'Airport',              km: 0.0  },
        { code: 'GR02', name: 'Bhimtangi',            km: 1.5  },
        { code: 'GR03', name: 'Mancheswar',           km: 3.0  },
        { code: 'GR04', name: 'Rasulgarh',            km: 4.4  },
        { code: 'GR05', name: 'Bomikhal',             km: 5.7  },
        { code: 'GR06', name: 'Palasuni',             km: 7.0  },
        { code: 'GR07', name: 'Tamando',              km: 8.5  },
        { code: 'GR08', name: 'Niladri Vihar',        km: 9.8  },
        { code: 'GR09', name: 'Pokhariput',           km: 11.0 },
        { code: 'GR10', name: 'Kalarahanga',          km: 12.3 },
        { code: 'GR11', name: 'Gadakana',             km: 13.6 },
        { code: 'GR12', name: 'Pahala',               km: 14.8 },
        { code: 'GR13', name: 'Aiginia',              km: 16.0 },
        { code: 'GR14', name: 'Nabarangpur',          km: 17.2 },
        { code: 'GR15', name: 'Khandagiri',           km: 18.4 },
        { code: 'GR16', name: 'Nandankanan Road',     km: 19.7 },
        { code: 'GR17', name: 'Sailashree Vihar',     km: 20.9 },
        { code: 'GR18', name: 'Damana',               km: 22.1 },
        { code: 'GR19', name: 'Hanspal',              km: 23.4 },
        { code: 'GR20', name: 'Bhubaneswar East',     km: 24.6 },
        { code: 'GR21', name: 'Siripur',              km: 25.8 },
        { code: 'GR22', name: 'Dhauli',               km: 27.0 },
        { code: 'GR23', name: 'Pipli Bypass',         km: 28.2 },
        { code: 'GR24', name: 'Sisupalgarh',          km: 29.4 },
        { code: 'GR25', name: 'Old Town',             km: 30.6 },
      ],
    },

    orange: {
      id: 'orange', label: 'L3', name: 'Orange Line',
      color: '#ff9100',
      from: 'Rasulgarh', to: 'Patia',
      active: 25, total: 25,
      stations: [
        { code: 'OR01', name: 'Rasulgarh',            km: 0.0  },
        { code: 'OR02', name: 'Prachi Vihar',         km: 1.4  },
        { code: 'OR03', name: 'Pandara',              km: 2.8  },
        { code: 'OR04', name: 'CDA Sector 1',         km: 4.1  },
        { code: 'OR05', name: 'CDA Sector 6',         km: 5.4  },
        { code: 'OR06', name: 'Bidyut Marg',          km: 6.7  },
        { code: 'OR07', name: 'Laxmi Sagar',          km: 7.9  },
        { code: 'OR08', name: 'VSS Nagar',            km: 9.1  },
        { code: 'OR09', name: 'Tomando',              km: 10.4 },
        { code: 'OR10', name: 'Sundarpada',           km: 11.7 },
        { code: 'OR11', name: 'Balianta',             km: 13.0 },
        { code: 'OR12', name: 'Narendrapur',          km: 14.2 },
        { code: 'OR13', name: 'Balianta South',       km: 15.4 },
        { code: 'OR14', name: 'Jatni',                km: 16.6 },
        { code: 'OR15', name: 'Bhubaneswar West',     km: 17.8 },
        { code: 'OR16', name: 'Kalpana Square',       km: 19.0 },
        { code: 'OR17', name: 'Rajpath',              km: 20.2 },
        { code: 'OR18', name: 'Sachivalaya Marg',     km: 21.3 },
        { code: 'OR19', name: 'Capital Hospital',     km: 22.5 },
        { code: 'OR20', name: 'Niti Vihar',           km: 23.7 },
        { code: 'OR21', name: 'Sum Hospital',         km: 24.9 },
        { code: 'OR22', name: 'Siripur Colony',       km: 26.1 },
        { code: 'OR23', name: 'Nuagaon',              km: 27.3 },
        { code: 'OR24', name: 'IRC Village',          km: 28.5 },
        { code: 'OR25', name: 'Patia',                km: 29.7 },
      ],
    },

    purple: {
      id: 'purple', label: 'L4', name: 'Purple Line',
      color: '#d500f9',
      from: 'AIIMS', to: 'Infocity',
      active: 25, total: 25,
      stations: [
        { code: 'PR01', name: 'AIIMS',                km: 0.0  },
        { code: 'PR02', name: 'Gangapada',            km: 1.6  },
        { code: 'PR03', name: 'Matiapara',            km: 3.1  },
        { code: 'PR04', name: 'Bhubaneswar Hospital', km: 4.5  },
        { code: 'PR05', name: 'OUAT Campus',          km: 5.9  },
        { code: 'PR06', name: 'Forest Park',          km: 7.2  },
        { code: 'PR07', name: 'Station Square',       km: 8.5  },
        { code: 'PR08', name: 'Bhubaneswar Railway',  km: 9.7  },
        { code: 'PR09', name: 'Haridakhandi',         km: 11.0 },
        { code: 'PR10', name: 'Brahmeswar Temple',    km: 12.3 },
        { code: 'PR11', name: 'Dhauli Giri',          km: 13.5 },
        { code: 'PR12', name: 'Bhubaneswar Central',  km: 14.8 },
        { code: 'PR13', name: 'Museum Square',        km: 16.0 },
        { code: 'PR14', name: 'NALCO Square',         km: 17.2 },
        { code: 'PR15', name: 'Samantarapur',         km: 18.4 },
        { code: 'PR16', name: 'Shastri Nagar',        km: 19.6 },
        { code: 'PR17', name: 'Ravi Talkies',         km: 20.8 },
        { code: 'PR18', name: 'Palasuni North',       km: 22.0 },
        { code: 'PR19', name: 'Bharat Nagar',         km: 23.2 },
        { code: 'PR20', name: 'XIMB',                 km: 24.4 },
        { code: 'PR21', name: 'Kalinga Nagar',        km: 25.6 },
        { code: 'PR22', name: 'Patrapada',            km: 26.8 },
        { code: 'PR23', name: 'Mahanadi Vihar',       km: 28.0 },
        { code: 'PR24', name: 'Technopark',           km: 29.2 },
        { code: 'PR25', name: 'Infocity',             km: 30.4 },
      ],
    },

    yellow: {
      id: 'yellow', label: 'L5', name: 'Yellow Line',
      color: '#ffea00',
      from: 'Unit-1', to: 'Baramunda',
      active: 25, total: 25,
      stations: [
        { code: 'YL01', name: 'Unit-1',               km: 0.0  },
        { code: 'YL02', name: 'Surya Nagar',          km: 1.3  },
        { code: 'YL03', name: 'Saheed Nagar',         km: 2.5  },
        { code: 'YL04', name: 'Budha Nagar',          km: 3.7  },
        { code: 'YL05', name: 'Rupali Square',        km: 4.9  },
        { code: 'YL06', name: 'Jaidev Nagar',         km: 6.1  },
        { code: 'YL07', name: 'Mausima',              km: 7.3  },
        { code: 'YL08', name: 'Ekamra Haat',          km: 8.5  },
        { code: 'YL09', name: 'Raj Bhawan',           km: 9.7  },
        { code: 'YL10', name: 'Indira Gandhi Park',   km: 10.9 },
        { code: 'YL11', name: 'Bharat Scout',         km: 12.0 },
        { code: 'YL12', name: 'Mahatab Road',         km: 13.2 },
        { code: 'YL13', name: 'Town Hall',            km: 14.4 },
        { code: 'YL14', name: 'Sishu Bhawan',         km: 15.5 },
        { code: 'YL15', name: 'Kalpana Chawla',       km: 16.7 },
        { code: 'YL16', name: 'Kharavela Nagar',      km: 17.9 },
        { code: 'YL17', name: 'Badagada',             km: 19.0 },
        { code: 'YL18', name: 'Lakshmi Sagar East',   km: 20.2 },
        { code: 'YL19', name: 'Bhoinagar',            km: 21.4 },
        { code: 'YL20', name: 'Puri Road Junction',   km: 22.6 },
        { code: 'YL21', name: 'Aiginia South',        km: 23.8 },
        { code: 'YL22', name: 'Ghatikia',             km: 25.0 },
        { code: 'YL23', name: 'Pokhariput North',     km: 26.2 },
        { code: 'YL24', name: 'Tamando North',        km: 27.4 },
        { code: 'YL25', name: 'Baramunda',            km: 28.6 },
      ],
    },

    pink: {
      id: 'pink', label: 'L6', name: 'Pink Line',
      color: '#ff4081',
      from: 'Lingaraj', to: 'Jaydev Vihar',
      active: 25, total: 25,
      stations: [
        { code: 'PK01', name: 'Lingaraj',             km: 0.0  },
        { code: 'PK02', name: 'Ekamra Kanan',         km: 1.5  },
        { code: 'PK03', name: 'Brahmeswar',           km: 2.9  },
        { code: 'PK04', name: 'Mukteswar Temple',     km: 4.2  },
        { code: 'PK05', name: 'Kedargouri',           km: 5.5  },
        { code: 'PK06', name: 'Puri Ghat',            km: 6.8  },
        { code: 'PK07', name: 'Ram Mandir',           km: 8.0  },
        { code: 'PK08', name: 'Bandha Munda',         km: 9.2  },
        { code: 'PK09', name: 'Baliapanda',           km: 10.5 },
        { code: 'PK10', name: 'Aul',                  km: 11.8 },
        { code: 'PK11', name: 'Banki',                km: 13.1 },
        { code: 'PK12', name: 'Athagarh Road',        km: 14.4 },
        { code: 'PK13', name: 'Khordha Junction',     km: 15.7 },
        { code: 'PK14', name: 'Jankia',               km: 17.0 },
        { code: 'PK15', name: 'Bhubaneswar Gate',     km: 18.2 },
        { code: 'PK16', name: 'Fortune Tower',        km: 19.5 },
        { code: 'PK17', name: 'Nandankanan',          km: 20.7 },
        { code: 'PK18', name: 'Kanas',                km: 22.0 },
        { code: 'PK19', name: 'Haripur',              km: 23.2 },
        { code: 'PK20', name: 'Mahanadi Bridge',      km: 24.5 },
        { code: 'PK21', name: 'Pipli',                km: 25.7 },
        { code: 'PK22', name: 'Konark Road',          km: 26.9 },
        { code: 'PK23', name: 'Marine Drive',         km: 28.1 },
        { code: 'PK24', name: 'Buddha Vihar',         km: 29.4 },
        { code: 'PK25', name: 'Jaydev Vihar',         km: 30.6 },
      ],
    },
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
