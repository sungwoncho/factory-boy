FactoryBoy = {};
FactoryBoy._factories = [];

Factory = function (name, collection, attributes) {
  this.name = name;
  this.collection = collection;
  this.attributes = attributes;
};

FactoryBoy.define = function (name, collection, attributes) {
  var factory = new Factory(name, collection, attributes);

  FactoryBoy._factories.push(factory);
};

FactoryBoy._getFactory = function (name) {
  return _.findWhere(FactoryBoy._factories, {name: name});
};

FactoryBoy.create = function (name, newAttr) {
  var factory = this._getFactory(name);
  var collection = factory.collection;
  var deepExtend = Npm.require('deep-extend');

  // Allow to overwrite the attribute definitions
  var attr = deepExtend(factory.attributes, newAttr);

  var docId = collection.insert(attr);
  var doc = collection.findOne(docId);

  return doc;
};

FactoryBoy.build = function (name, collection, attrOverwrite) {
  var factory = this._getFactory(name);

  return factory.attributes;
};
