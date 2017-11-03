import Ember from 'ember';

export function hasAny(params/*, hash*/) {
  if(params.length>=2){
      var roles = params[0];
      if(roles){
          for(var i=1;i<params.length;i++){
              if(roles.indexOf(params[i]) > -1) {
                return true;
              }
          }
      }
  }
  return false;
}

export default Ember.Helper.helper(hasAny);
