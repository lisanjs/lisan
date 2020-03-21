(function(module) {
  module.exports = {
    locale: 'en-US',
    entries: {
      anInterpolation: ({ name }) => `Hello ${name}`,
      conditional: {
        one: 'a record',
        many: '5 records',
      },
      helloWorld: 'Hello World',
      nestedCall: ({}, { t }) => `Hello ${t('non.existing.key')}`,
    },
  };
})(typeof module !== 'undefined' ? module : window.lisanLoaderListener);
