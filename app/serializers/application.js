import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONSerializer.extend({

  extractRelationship(relationshipModelName, relationshipHash) {
        var ret = relationshipHash? {id: relationshipHash.id, type: relationshipModelName} : null;
        return ret;
  },

  /**
    @method _normalizeResponse
    @param {DS.Store} store
    @param {DS.Model} primaryModelClass
    @param {Object} payload
    @param {String|Number} id
    @param {String} requestType
    @param {Boolean} isSingle
    @return {Object} JSON-API Document
    @private
  */
  _normalizeResponse(store, primaryModelClass, payload, id, requestType, isSingle) {
    let documentHash = {
      data: null,
      included: []
    };

    let meta = this.extractMeta(store, primaryModelClass, payload);
    if (meta) {
    //   assert('The `meta` returned from `extractMeta` has to be an object, not "' + Ember.typeOf(meta) + '".', Ember.typeOf(meta) === 'object');
      documentHash.meta = meta;
    }

    if (isSingle) {
      let { data, included } = this.normalize(primaryModelClass, payload);
      documentHash.data = data;
      if (included) {
        documentHash.included = included;
      }
    } else {
      var arrayData = Ember.typeOf(payload)==='array'? payload : payload.data;
      let ret = new Array(arrayData.length);
      for (let i = 0, l = arrayData.length; i < l; i++) {
        let item = arrayData[i];
        let { data, included } = this.normalize(primaryModelClass, item);
        if (included) {
          documentHash.included.push(...included);
        }
        ret[i] = data;
      }

      documentHash.data = ret;
    }

    return documentHash;
  }

});
