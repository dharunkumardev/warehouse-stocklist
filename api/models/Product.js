/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    status:{
      type:'boolean',
      defaultsTo:true
    },
    productCode:{
      type:'string'
    },
    productQuantity:{
      type:'number'
    },
    productName:{
      type:'string'
    },
    checkType:{
      type:'string'
    }
  },
};
