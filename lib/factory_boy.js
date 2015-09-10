FactoryBoy = {};
FactoryBoy._factories = [];

Factory = function (name, collection, attributes) {
  this.name = name;
  this.collection = collection;
  this.attributes = attributes;
};

FactoryBoy.define = function (name, collection, attributes) {
  var factory = new Factory(name, collection, attributes);

  for (var i = 0; i < this._factories.length; i++) {
    if (this._factories[i].name === name) {
      throw new Error('A factory named ' + name + ' already exists');
    }
  }

  FactoryBoy._factories.push(factory);
};

FactoryBoy._getFactory = function (name) {
  var factory = _.findWhere(FactoryBoy._factories, {name: name});

  if (! factory) {
    throw new Error('Could not find the factory named ' + name);
  }

  return factory;
};

FactoryBoy.create = function (name, newAttr) {
  var factory = this._getFactory(name);
  var collection = factory.collection;

  // Allow to overwrite the attribute definitions
  var attr = _.merge({}, factory.attributes, newAttr);

  var docId = collection.insert(attr);
  var doc = collection.findOne(docId);

  return doc;
};

FactoryBoy.build = function (name, newAttr) {
  var factory = this._getFactory(name);

  var doc = _.merge({}, factory.attributes, newAttr);
  return doc;
};
