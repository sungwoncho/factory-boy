Fruits = new Mongo.Collection(null);

Tinytest.add('.define - adds factory', function (test) {
  FactoryBoy.define('fruit', Fruits, {
    name: 'banana',
    color: 'yellow'
  });

  test.equal(FactoryBoy._factories.length, 1);
  var factory = FactoryBoy._factories[0];
  test.equal(factory.name, 'fruit');
  test.equal(factory.attributes.name, 'banana');
  test.equal(factory.attributes.color, 'yellow');

  // Teardown
  FactoryBoy._factories = [];
});

Tinytest.add('.define - throws if name is duplicated', function (test) {
  FactoryBoy.define('fruit', Fruits, {
    name: 'banana',
    color: 'yellow'
  });

  var defineDuplicate = function () {
    FactoryBoy.define('fruit', Fruits);
  };

  test.throws(defineDuplicate);

  // Teardown
  FactoryBoy._factories = [];
});

Tinytest.add('.create - inserts a doc', function (test) {
  FactoryBoy.define('fruit', Fruits);

  FactoryBoy.create('fruit');
  test.equal(Fruits.find().count(), 1);

  // Teardown
  FactoryBoy._factories = [];
  Fruits.remove({});
});

Tinytest.add('.create - can overwrite attribute', function (test) {
  FactoryBoy.define('fruit', Fruits, {name: 'banana'});
  FactoryBoy.create('fruit', {name: 'orange'});

  test.equal(Fruits.findOne().name, 'orange');

  // Teardown
  FactoryBoy._factories = [];
  Fruits.remove({});
});

Tinytest.add('.create - can overwrite a nested attribute', function (test) {
  FactoryBoy.define('fruit', Fruits, {
    origin: {
      city: 'San Jose',
      state: 'CA'
    }
  });
  FactoryBoy.create('fruit', {origin: {city: 'Irvine'}});

  var fruit = Fruits.findOne();
  test.equal(fruit.origin.city, 'Irvine');
  test.equal(fruit.origin.state, 'CA');

  // Teardown
  FactoryBoy._factories = [];
  Fruits.remove({});
});

Tinytest.add('.build - returns an object with defined attributes', function (test) {
  FactoryBoy.define('fruit', Fruits, {
    name: 'banana',
    price: 5.50
  });

  var result = FactoryBoy.build('fruit');
  test.equal(result.name, 'banana');
  test.equal(result.price, 5.50);

  // Teardown
  FactoryBoy._factories = [];
});

Tinytest.add('.build - can overwrite attributes', function (test) {
  FactoryBoy.define('fruit', Fruits, {
    name: 'banana',
    price: 5.50
  });

  var result = FactoryBoy.build('fruit', {price: 10.50});
  test.equal(result.name, 'banana');
  test.equal(result.price, 10.50);

  // Teardown
  FactoryBoy._factories = [];
});

Tinytest.add('.build - can overwrite a nested attribute', function (test) {
  FactoryBoy.define('fruit', Fruits, {
    origin: {
      city: 'San Jose',
      state: 'CA'
    }
  });
  var result = FactoryBoy.build('fruit', {origin: {city: 'Irvine'}});

  test.equal(result.origin.city, 'Irvine');
  test.equal(result.origin.state, 'CA');

  // Teardown
  FactoryBoy._factories = [];
});

Tinytest.add('.alias - defines a duplicate factory with an alias', function (test) {
  FactoryBoy.define('fruit', Fruits, {
    name: 'banana'
  });
  FactoryBoy.alias('fruit', 'fruta');

  test.equal(FactoryBoy._factories.length, 2);
  var frutaFactory = _.findWhere(FactoryBoy._factories, {name: 'fruta'});
  var fruitFactory = _.findWhere(FactoryBoy._factories, {name: 'fruit'});
  // Make sure the factories exist
  test.isNotUndefined(frutaFactory);
  test.isNotUndefined(fruitFactory);

  // Check the properties are the same
  test.equal(frutaFactory.collection, Fruits);
  test.isTrue(_.isEqual(frutaFactory.attributes, fruitFactory.attributes));

  // Teardown
  FactoryBoy._factories = [];
});
