import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  percent: DS.attr('number'),
  comment: DS.attr('string')
});
