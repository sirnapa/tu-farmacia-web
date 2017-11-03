import Ember from 'ember';

export default Ember.Component.extend({
    change: function() {
      //   window.console.log('cambio en el archivo...');
        var property = this.get('property');
        var model = this.get('model');
        var input = this.$('input[type=file]');
        var file = input[0].files[0];
        model.set(property, file);
      //   window.console.log(property, model.get('attachment'));
    }
});
