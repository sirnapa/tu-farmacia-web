import Ember from 'ember';

export default Ember.Component.extend({
    session: Ember.inject.service('session'),

    actions: {
        authenticate() {
            let { username, password } = this.getProperties('username', 'password');
            this.get('session').authenticate('authenticator:grails-token-authenticator', username, password).catch((reason) => {
                var json = {};

                try{
                    json = JSON.parse(reason);
                }catch(err){
                    reason = '{"¡Ups!": "Al parecer ingresaste mal tu usuario o tu contraseña, ' +
                        'por favor intenta de nuevo y asegurate de escribirlos correctamente."}';
                    json = JSON.parse(reason);
                }

                this.set('error', json);
            });
        }
    }
});
