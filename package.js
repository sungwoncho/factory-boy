Package.describe({
  name: 'sungwoncho:factory-boy',
  version: '0.0.1',
  summary: 'Meteor factory to build documents for tests',
  git: '',
  documentation: 'README.md'
});

Npm.depends({
  'deep-extend': '0.4.0'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('underscore');
  api.addFiles('lib/factory-boy.js');

  api.export('FactoryBoy');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('sungwoncho:factory-boy');
  api.addFiles('tests/factory-boy-tests.js');
});
