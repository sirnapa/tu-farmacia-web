import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Group', {
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

test('visiting /groups without data', function(assert) {
  visit('/groups');

  andThen(function() {
    assert.equal(currentPath(), 'groups.index');
    assert.equal(find('#blankslate').text().trim(), 'No Groups found');
  });
});

test('visiting /groups with data', function(assert) {
  server.create('group');
  visit('/groups');

  andThen(function() {
    assert.equal(currentPath(), 'groups.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new group', function(assert) {
  visit('/groups');
  click('a:contains(New Group)');

  andThen(function() {
    assert.equal(currentPath(), 'groups.new');

    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Ruc) input', 'MyString');
    fillIn('label:contains(Address) input', 'MyString');
    fillIn('label:contains(Phone) input', 'MyString');
    fillIn('label:contains(Email) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing group', function(assert) {
  server.create('group');
  visit('/groups');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'groups.edit');

    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Ruc) input', 'MyString');
    fillIn('label:contains(Address) input', 'MyString');
    fillIn('label:contains(Phone) input', 'MyString');
    fillIn('label:contains(Email) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing group', function(assert) {
  server.create('group');
  visit('/groups');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'groups.show');

    assert.equal(find('p strong:contains(Name:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Ruc:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Address:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Phone:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Email:)').next().text(), 'MyString');
  });
});

test('delete a group', function(assert) {
  server.create('group');
  visit('/groups');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'groups.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
