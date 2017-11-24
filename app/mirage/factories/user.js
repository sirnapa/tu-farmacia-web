import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend(
  {username: 'MyString', password: 'MyString', enabled: false, accountExpired: false, accountLocked: false, passwordExpired: false }
);
