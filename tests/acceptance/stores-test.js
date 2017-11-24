import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Store', {
  beforeEach: function() {
    application = startApp();
    originalConfirm = window.confirm;
    window.confirm = function() {
      confirmCalledWith = [].slice.call(arguments);
      return true;
    };
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
    window.confirm = originalConfirm;
    confirmCalledWith = null;
  }
});

test('visiting /stores without data', function(assert) {
  visit('/stores');

  andThen(function() {
    assert.equal(currentPath(), 'stores.index');
    assert.equal(find('#blankslate').text().trim(), 'No Stores found');
  });
});

test('visiting /stores with data', function(assert) {
  server.create('store');
  visit('/stores');

  andThen(function() {
    assert.equal(currentPath(), 'stores.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new store', function(assert) {
  visit('/stores');
  click('a:contains(New Store)');

  andThen(function() {
    assert.equal(currentPath(), 'stores.new');

    fillIn('label:contains(Group) input', 'MyString');
    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Address) input', 'MyString');
    fillIn('label:contains(Phone) input', 'MyString');
    fillIn('label:contains(Email) input', 'MyString');
    fillIn('label:contains(Latitude) input', 42);
    fillIn('label:contains(Longitude) input', 42);

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing store', function(assert) {
  server.create('store');
  visit('/stores');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'stores.edit');

    fillIn('label:contains(Group) input', 'MyString');
    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Address) input', 'MyString');
    fillIn('label:contains(Phone) input', 'MyString');
    fillIn('label:contains(Email) input', 'MyString');
    fillIn('label:contains(Latitude) input', 42);
    fillIn('label:contains(Longitude) input', 42);

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing store', function(assert) {
  server.create('store');
  visit('/stores');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'stores.show');

    assert.equal(find('p strong:contains(Group:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Name:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Address:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Phone:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Email:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Latitude:)').next().text(), 42);
    assert.equal(find('p strong:contains(Longitude:)').next().text(), 42);
  });
});

test('delete a store', function(assert) {
  server.create('store');
  visit('/stores');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'stores.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
