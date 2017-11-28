import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  ruc: DS.attr('string'),
  alias: DS.attr('string'),
  phone: DS.attr('string'),
  email: DS.attr('string'),
  comment: DS.attr('string')
});
