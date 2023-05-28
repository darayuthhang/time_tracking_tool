require('dotenv').config();
const knex = require('knex');

const knexfile = require("../knexfile")
let db = null;
// if (process.env.NODE_ENV === 'local') {
//     db = knex(knexfile.development);
// } else {
//     db = knex(knexfile.production)
// }
db = knex(knexfile.production)

module.exports = db;
