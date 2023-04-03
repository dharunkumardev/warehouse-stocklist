/**
 * Datastores
 * (sails.config.datastores)
 *
 * A set of datastore configurations which tell Sails where to fetch or save
 * data when you execute built-in model methods like `.find()` and `.create()`.
 *
 *  > This file is mainly useful for configuring your development database,
 *  > as well as any additional one-off databases used by individual models.
 *  > Ready to go live?  Head towards `config/env/production.js`.
 *
 * For more information on configuring datastores, check out:
 * https://sailsjs.com/config/datastores
 */
const DB_URL =
  "mongodb+srv://Dharun:Mongodb.com@dharunonenet.xml3dcx.mongodb.net/product-warehouse";
module.exports.datastores = {
  default: {
    adapter: "sails-mongo",
    url: DB_URL,
  },
};
console.log(`\x1b[33m ${DB_URL} \x1b[0m`);
