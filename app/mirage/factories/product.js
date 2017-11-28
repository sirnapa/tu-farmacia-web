import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend(
  {name: 'MyString', code: 'MyString', stock: 42, minimalStock: 42, price: 42, tax: 'MyString', expiration: 'MyString', freeSale: false }
);
