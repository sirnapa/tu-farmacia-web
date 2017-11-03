import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  i18n: Ember.inject.service(),
  afterModel: function() {
    if(localStorage.lang){
      this.set('i18n.locale', localStorage.lang);
    }
  }
});
