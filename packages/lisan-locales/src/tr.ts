import * as TSLisan from 'lisan-types';
import { ordinal } from 'ordinalize-tr';

export default {
  name: 'tr',

  // Number formating options
  number: {
    grouping: {
      delimiters: ['.'],
      blocks: [3],
    },
    fraction: {
      delimiter: ',',
      digits: -1,
    },
    zeroFormat: '0',
    nullFormat: '0',
  },

  // Currency formating options
  currency: {
    fraction: {
      delimiter: ',',
      digits: 2,
    },
    template(formattedNumber: string): string {
      return `${formattedNumber} ₺`;
    },
  },

  // Ordinal formating options
  ordinal(number: number): string {
    return ordinal(number);
  },

  // Date formating options
  date: {
    masks: {
      dateTime: 'YYYY-MM-DD HH:mm:ss.SSS',
      dateShort: 'DD.MM.YYYY',
      dateMedium: 'D MMMM YYYY',
      dateLong: 'D MMMM YYYY HH:mm',
      dateFull: 'dddd, D MMMM YYYY HH:mm',
      timeShort: 'HH:mm',
      timeMedium: 'HH:mm:ss',
      timeLong: 'HH:mm:ss.SSS',
    },
    amPm: ['am', 'pm'],

    // weeks
    weekdays: [
      'Pazar',
      'Pazartesi',
      'Salı',
      'Çarşamba',
      'Perşembe',
      'Cuma',
      'Cumartesi',
    ],
    weekdaysShort: ['Pzr', 'Pzt', 'Sal', 'Çar', 'Prş', 'Cum', 'Cmt'],
    weekdaysMin: ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'],

    // months
    months: [
      'Ocak',
      'Şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'Temmuz',
      'Ağustos',
      'Eylül',
      'Ekim',
      'Kasım',
      'Aralık',
    ],
    monthsShort: [
      'Oca',
      'Şub',
      'Mar',
      'Nis',
      'May',
      'Haz',
      'Tem',
      'Ağu',
      'Eyl',
      'Eki',
      'Kas',
      'Ara',
    ],
  },
} as TSLisan.LocaleConfig;
