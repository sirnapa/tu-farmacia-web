import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  code: DS.attr('string'),
  stock: DS.attr('number'),
  minimalStock: DS.attr('number'),
  price: DS.attr('number'),
  tax: DS.belongsTo('tax'),
  expiration: DS.attr('date'),
  freeSale: DS.attr('boolean')
});
