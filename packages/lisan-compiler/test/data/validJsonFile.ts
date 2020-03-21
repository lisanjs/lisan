import { TranslationJson } from '../../src/typings';

const validJsonFile: TranslationJson = {
  locale: 'en-Us',
  entries: {
    color1: 'red',
    color2: 'blue',
    'string.key': 'a string key',
    'same.key': 'mirror mirror',
    key0: '',
    key1: '   ',
    key2: 'Hello world',
    key3: 'Hello {world}',
    key4: 'Hello ${name}',
    key5: 'Hello ${_name}',
    key6: 'Hello ${same} ${same}',
    key7: 'Hello ${name} ${surname}',
    key8: 'Hello ${name} ${surname} ${name}',
    key9: 'Hello ${info.name}',
    key10: 'Hello ${info.person.name} ${info.person.surname}',
    key11: 'Your surname is ${surname}, your birthday is ${birthday}',
    key12: 'Hello ${deep.nested.key} ${info.person.name.x.y.z}',
    key13: 'Hello ${info.t.x}',
    key14: 'Hello ${info.c.x}',
    key15: 'Hello ${info.l.x}',
    key16: 'Hello ${name} ${surname} \\${escaped}',
    key17: "This is a ${t('key3')} message.",
    key18: "This is a ${t('color1')} ${t('color2')}",
    key19: "This is a ${t('same.key')} ${t('same.key')}",
    key20: "Today is ${day}! ${t('key7', {name, surname})}",
    key21:
      "Today is ${today}! ${t('key4', {name})}  ${t('key11', {surname, birthday})}",
    'present.be': {
      one: 'is',
      many: 'are',
    },
    records: {
      one: 'one record',
      many: 'many records',
    },
    child: {
      one: 'child',
      many: 'children',
    },
    conditional: {
      one: 'Hello ${name3} ${surname3}',
      many: 'Hello ${name2} ${surname2}',
    },

    key22:
      "yes yes.. ${c('records', number_Of_Records)}, there ${c('present.be', number_Of_Records)}...",
    key23: "There ${c('present.be', myVar1)} ${c('records', myVar2)}.",
    key24:
      "There is ${c('child', numberOfKids)} ${myVar} some ${c('child', anotherVar)}",
    key25: "There ${numberOfKids} ${c('child', numberOfKids)}",
    key26:
      "There ${c('present.be', numberOfKids)} ${numberOfKids} ${c('child', numberOfKids)}",
    key27: "Ooops! ${c('item.error', numberOfItems, {item})}",
    key28: 'Localization ${currency(myValue)}',

    key: 'So key18 can pass allowNonExistingKeys: false option',
    'item.error': {
      one: 'So that key27 can pass',
      many: 'Hello ${name2} ${surname2}',
    },
  },
};

export default validJsonFile;
