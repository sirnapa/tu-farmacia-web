import Ember from 'ember';

export default Ember.Component.extend({
  /**
   *
   */
  store: Ember.inject.service(),

  /**
   * Initialize the component.
   */
  init() {
    this.initialize();

    this._super();
  },

  /**
   * Initialize the properties and prerequisites.
   */
  initialize() {
    var select = this;
    // Set the component properties
    this.loadOptionEntries().then((data) => {
      select.set('optionEntries', data);
    });
  },

  /**
   * Returns the todo entries.
   *
   * @returns {*|Promise|Promise.<T>}
   */
  loadOptionEntries() {
     var select = this;
     return new Ember.RSVP.Promise(function(resolve, reject){
         const store = select.get('store');
         store.findAll(select.content).then(function(data) {
           // on fulfillment
           resolve(data);
         }, function(reason) {
           // on rejection
           reject(reason);
         });
     });
   }
});
