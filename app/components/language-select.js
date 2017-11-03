import Ember from 'ember';

export default Ember.Component.extend({
  i18n: Ember.inject.service(),
  tagName: 'li',
  classNames: ['dropdown'],

  localeName: Ember.computed('i18n.locale', function() {
    const i18n = this.get('i18n');
    return i18n.t('language.' + i18n.locale);
  }),

  locales: Ember.computed('i18n.locale', 'i18n.locales', function() {
    const i18n = this.get('i18n');
    return this.get('i18n.locales').map(function (loc) {
      return { id: loc, text: i18n.t('language.' + loc) };
    });
  }),

  actions: {
    setLocale(newLocale) {
      localStorage.lang = newLocale;
      this.set('i18n.locale', newLocale);
    }
  }
});
