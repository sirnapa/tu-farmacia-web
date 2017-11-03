import DS from 'ember-data';

export default DS.JSONSerializer.extend({

    normalizeQueryResponse(store, clazz, payload) {
        payload.meta.queriedAt = +new Date();
        return this._super(store, clazz, payload);
    },

    extractRelationship(relationshipModelName, relationshipHash) {
        return {id: relationshipHash.id, type: relationshipModelName};
    }

});
