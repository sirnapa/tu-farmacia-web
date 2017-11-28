import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('not-found', { path: '/*wildcard' });
  this.route('login');
  this.route('users', function() {
    this.route('new');

    this.route('edit', {
      path: ':user_id/edit'
    });

    this.route('show', {
      path: ':user_id'
    });
  });
  this.route('groups', function() {
    this.route('new');

    this.route('edit', {
      path: ':group_id/edit'
    });

    this.route('show', {
      path: ':group_id'
    });
  });
  this.route('stores', function() {
    this.route('new');

    this.route('edit', {
      path: ':store_id/edit'
    });

    this.route('show', {
      path: ':store_id'
    });
  });
  this.route('taxes', function() {
    this.route('new');

    this.route('edit', {
      path: ':tax_id/edit'
    });

    this.route('show', {
      path: ':tax_id'
    });
  });
  this.route('laboratories', function() {
    this.route('new');

    this.route('edit', {
      path: ':laboratory_id/edit'
    });

    this.route('show', {
      path: ':laboratory_id'
    });
  });
  this.route('tags', function() {
    this.route('new');

    this.route('edit', {
      path: ':tag_id/edit'
    });

    this.route('show', {
      path: ':tag_id'
    });
  });
  this.route('products', function() {
    this.route('new');

    this.route('edit', {
      path: ':product_id/edit'
    });

    this.route('show', {
      path: ':product_id'
    });
  });
});

export default Router;
