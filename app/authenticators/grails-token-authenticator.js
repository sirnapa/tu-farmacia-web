import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import ENV from '../config/environment';

export default Base.extend({
  restore(data) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        if (!Ember.isEmpty(data.token)) {
          resolve(data);
        } else {
          reject();
        }
      });
  },

  authenticate(username, password) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.$.ajax({
          url: ENV.host + '/api/login',
          type: 'POST',
          data: JSON.stringify({
            username: username,
            password: password
          }),
          contentType: 'application/json;charset=utf-8',
          dataType: 'json'
        }).then((response) => {
          Ember.run(function() {
            resolve({
              token: response['access_token'],
              username: response['username'],
              roles: response['roles']
            });
          });
      }, (xhr, status, error) => {
          var response = xhr.responseText || error || status;
          Ember.run(function() {
            reject(response);
          });
        });
      });
  },

  // invalidate(data) {
  // }
});
