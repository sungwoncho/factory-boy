# FactoryBoy [![Build Status](https://travis-ci.org/sungwoncho/factory-boy.svg?branch=master)](https://travis-ci.org/sungwoncho/factory-boy)

A minimalistic factory for Meteor

Build plain objects using predefined attributes or persist them in Mongo
collections.


## Install

    meteor add sungwoncho:factory-boy


## API

#### FactoryBoy.define(name, collection, attributes)

Defines a factory that can be used to build documents.

```javascript
FactoryBoy.define('post', Posts, {
  title: 'Hello World',
  author: {
    _id: 'testAuthorId',
    name: 'jon'
  }
});
```

#### FactoryBoy.build(name, attributes)

Build an object using the factory with the given name. Previously defined
attributes can be overwritten.

Returns the object that is built. The returned object does not have `_id`.

```javascript
FactoryBoy.build('post');
// => {title: 'Hello World', author: {_id: 'testAuthorId', name: 'jon'}}

FactoryBoy.build('post', {title: 'Cool story, bro.'});
// => {title: 'Cool story, bro.', author: {_id: 'testAuthorId', name: 'jon'}}
```

#### FactoryBoy.create(name, attributes)

Insert a new document to the collection using the given factory.

Previously defined attributes can be overwritten. Returns the inserted document.

```javascript
var postId = FactoryBoy.create('post');

Posts.findOne(postId);
// => {title: 'Hello World', author: {_id: 'testAuthorId', name: 'jon'}}
```

## Examples

#### Testing

FactoryBoy is great for writing tests. Below is an example of a test using Mocha.

```javascript
describe("submitPost", function(){
  it("creates a post", function(){
    var post = FactoryBoy.build('post');

    Meteor.call('submitPost', post);
    expect(Posts.find().count()).to.equal(1);
  });
});
```

All the logic related to building a post document lives in the 'post' factory.

When a schema changes, you simply need to change the factory definition to
pass all the validations, rather than performing a shot-gun surgery.

Note that `FactoryBoy.build` returns a plain object without `_id`.

You can also set up data for the test using `Factory.create`

```javascript
it("can update a category name", function(){
  var categoryId = Categories.insert({
    name: 'testName',
  });

  Meteor.call('updateCategoryName', categoryId, 'anotherName');

  var updatedCategory = Categories.findOne(categoryId);
  expect(updatedCategory.name).to.equal('anotherName');
});
```

## Contributing

Open issues with feature requests and issues. Pull requests are welcome.
