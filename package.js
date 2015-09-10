Package.describe({
  name: 'sungwoncho:factory-boy',
  version: '0.1.0',
  summary: 'A minimalistic factory for Meteor',
  git: 'https://github.com/sungwoncho/factory-boy',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('stevezhu:lodash@3.10.1', ['client', 'server']);

  api.addFiles([
    'lib/factory_boy.js'
  ], ['client', 'server']);

  api.export('FactoryBoy');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('mongo');
  api.use('sungwoncho:factory-boy');
  api.addFiles('tests/factory_boy_tests.js');
});
