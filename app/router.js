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
});

export default Router;
