import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Tax', {
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

test('visiting /taxes without data', function(assert) {
  visit('/taxes');

  andThen(function() {
    assert.equal(currentPath(), 'taxes.index');
    assert.equal(find('#blankslate').text().trim(), 'No Taxes found');
  });
});

test('visiting /taxes with data', function(assert) {
  server.create('tax');
  visit('/taxes');

  andThen(function() {
    assert.equal(currentPath(), 'taxes.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new tax', function(assert) {
  visit('/taxes');
  click('a:contains(New Tax)');

  andThen(function() {
    assert.equal(currentPath(), 'taxes.new');

    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Percent) input', 42);
    fillIn('label:contains(Comment) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing tax', function(assert) {
  server.create('tax');
  visit('/taxes');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'taxes.edit');

    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Percent) input', 42);
    fillIn('label:contains(Comment) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing tax', function(assert) {
  server.create('tax');
  visit('/taxes');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'taxes.show');

    assert.equal(find('p strong:contains(Name:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Percent:)').next().text(), 42);
    assert.equal(find('p strong:contains(Comment:)').next().text(), 'MyString');
  });
});

test('delete a tax', function(assert) {
  server.create('tax');
  visit('/taxes');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'taxes.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
