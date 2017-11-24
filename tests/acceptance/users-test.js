import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: User', {
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

test('visiting /users without data', function(assert) {
  visit('/users');

  andThen(function() {
    assert.equal(currentPath(), 'users.index');
    assert.equal(find('#blankslate').text().trim(), 'No Users found');
  });
});

test('visiting /users with data', function(assert) {
  server.create('user');
  visit('/users');

  andThen(function() {
    assert.equal(currentPath(), 'users.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new user', function(assert) {
  visit('/users');
  click('a:contains(New User)');

  andThen(function() {
    assert.equal(currentPath(), 'users.new');

    fillIn('label:contains(Username) input', 'MyString');
    fillIn('label:contains(Password) input', 'MyString');
    fillIn('label:contains(Enabled) input', false);
    fillIn('label:contains(Accountexpired) input', false);
    fillIn('label:contains(Accountlocked) input', false);
    fillIn('label:contains(Passwordexpired) input', false);

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing user', function(assert) {
  server.create('user');
  visit('/users');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'users.edit');

    fillIn('label:contains(Username) input', 'MyString');
    fillIn('label:contains(Password) input', 'MyString');
    fillIn('label:contains(Enabled) input', false);
    fillIn('label:contains(Accountexpired) input', false);
    fillIn('label:contains(Accountlocked) input', false);
    fillIn('label:contains(Passwordexpired) input', false);

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing user', function(assert) {
  server.create('user');
  visit('/users');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'users.show');

    assert.equal(find('p strong:contains(Username:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Password:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Enabled:)').next().text(), false);
    assert.equal(find('p strong:contains(Accountexpired:)').next().text(), false);
    assert.equal(find('p strong:contains(Accountlocked:)').next().text(), false);
    assert.equal(find('p strong:contains(Passwordexpired:)').next().text(), false);
  });
});

test('delete a user', function(assert) {
  server.create('user');
  visit('/users');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'users.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
