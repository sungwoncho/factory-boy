# FactoryBoy [![Build Status](https://travis-ci.org/sungwoncho/factory-boy.svg?branch=master)](https://travis-ci.org/sungwoncho/factory-boy)

[![Vym](https://img.shields.io/badge/Reviewing%20with-Vym-blue.svg)](https://vym.io)

A minimalistic factory for Meteor

Build plain objects using predefined attributes or persist them in Mongo
collections.


## Install

    meteor add sungwoncho:factory-boy


## How is it different?

FactoryBoy was built with testing in mind. See
[testing example](https://github.com/sungwoncho/factory-boy#testing) below.


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
var post = FactoryBoy.create('post');

Posts.findOne(post._id);
// => {_id: 'xevpMuN2yi92CkNfA', title: 'Hello World', author: {_id: 'testAuthorId', name: 'jon'}}
```

## Examples

#### Testing

FactoryBoy is great for writing tests. Below is an example of a test using Mocha.

* Build a plain object

```javascript
describe("submitPost", function(){
  it("creates a post", function(){
    var post = FactoryBoy.build('post');

    Meteor.call('submitPost', post);
    expect(Posts.find().count()).to.equal(1);
  });
});
```

Note that `FactoryBoy.build` returns a plain object without `_id`. It does not
pretend to be a Mongo document--pass it around as a plain object.

* Insert test data

You can also set up data for the test using `FactoryBoy.create`

```javascript
it("can update a episode name", function(){
  var episode = FactoryBoy.create('episode', {
    name: 'The Gang Broke Dee'
  });

  Meteor.call('updateEpisodeName', episode._id, 'Charlie Rules the World');

  var updatedEpisode = Episodes.findOne(episode._id);
  expect(updatedEpisode.name).to.equal('Charlie Rules the World');
});
```

#### General

All the logic related to building a specific document lives in a factory.

When a schema changes, you simply need to change the factory definition to
pass all the validations, rather than performing a shot-gun surgery.

```javascript
FactoryBoy.define('comment', Comment, {
  author: 'Dennis Reynolds',
  body: 'Do you think there should be a mask of me, and I should wear it?'
});

CommentSchema = {
  author: {
    type: String
  },
  body: {
    type: String
  },
  tags: {              //
    type: [String]     // Newly added
  }                    //
};

FactoryBoy.define('comment', Comment, {
  author: 'Dennis Reynolds',
  body: 'Do you think there should be a mask of me, and I should wear it?',
  tags: ['funny']      // Add new property
});
```


## Contributing

Open issues with feature requests and issues. Pull requests are welcome.
