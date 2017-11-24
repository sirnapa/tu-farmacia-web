import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  password: DS.attr('string'),
  enabled: DS.attr('boolean'),
  accountExpired: DS.attr('boolean'),
  accountLocked: DS.attr('boolean'),
  passwordExpired: DS.attr('boolean')
});
