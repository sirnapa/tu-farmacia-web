import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Laboratory', {
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

test('visiting /laboratories without data', function(assert) {
  visit('/laboratories');

  andThen(function() {
    assert.equal(currentPath(), 'laboratories.index');
    assert.equal(find('#blankslate').text().trim(), 'No Laboratories found');
  });
});

test('visiting /laboratories with data', function(assert) {
  server.create('laboratory');
  visit('/laboratories');

  andThen(function() {
    assert.equal(currentPath(), 'laboratories.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new laboratory', function(assert) {
  visit('/laboratories');
  click('a:contains(New Laboratory)');

  andThen(function() {
    assert.equal(currentPath(), 'laboratories.new');

    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Ruc) input', 'MyString');
    fillIn('label:contains(Alias) input', 'MyString');
    fillIn('label:contains(Phone) input', 'MyString');
    fillIn('label:contains(Email) input', 'MyString');
    fillIn('label:contains(Comment) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing laboratory', function(assert) {
  server.create('laboratory');
  visit('/laboratories');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'laboratories.edit');

    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Ruc) input', 'MyString');
    fillIn('label:contains(Alias) input', 'MyString');
    fillIn('label:contains(Phone) input', 'MyString');
    fillIn('label:contains(Email) input', 'MyString');
    fillIn('label:contains(Comment) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing laboratory', function(assert) {
  server.create('laboratory');
  visit('/laboratories');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'laboratories.show');

    assert.equal(find('p strong:contains(Name:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Ruc:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Alias:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Phone:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Email:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Comment:)').next().text(), 'MyString');
  });
});

test('delete a laboratory', function(assert) {
  server.create('laboratory');
  visit('/laboratories');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'laboratories.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
