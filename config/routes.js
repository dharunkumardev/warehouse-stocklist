/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  '/': { view: 'pages/homepage' },

  "POST /checking":"ProductController/productChecking",
  "POST /product/checkin":"ProductController/checkinQty",
  "POST /product/checkout":"ProductController/checkoutQty"

};
