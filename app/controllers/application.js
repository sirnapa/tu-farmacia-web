import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  hideMenuRoutes: ['login'],
  showMenu: Ember.computed('currentRouteName', function(){
      return this.get('hideMenuRoutes').indexOf(this.get('currentRouteName')) === -1;
  }),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
