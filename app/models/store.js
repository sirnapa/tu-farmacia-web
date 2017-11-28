import DS from 'ember-data';

export default DS.Model.extend({
  group: DS.belongsTo('group'),
  name: DS.attr('string'),
  address: DS.attr('string'),
  phone: DS.attr('string'),
  email: DS.attr('string'),
  latitude: DS.attr('number', { defaultValue: -25.3229494 }),
  longitude: DS.attr('number', { defaultValue: -57.5234882 }),
});
