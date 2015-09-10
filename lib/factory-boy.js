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

FactoryBoy.create = function (name, attrOverwrite) {
  var factory = this._getFactory(name);
  var collection = factory.collection;

  var origAttributes = factory.attributes;
  var finalAttributes = _.extend(origAttributes, attrOverwrite);

  var insertedId = collection.insert(finalAttributes);
  var insertedDoc = collection.findOne(insertedId);

  return insertedDoc;
};

FactoryBoy.build = function (name, collection, attrOverwrite) {
  var factory = this._getFactory(name);

  return factory.attributes;
};
