const validate = require('validate.js');
const wrapper = require('../../utils/wrapper');
const pool = require('./connection');

class DB {
  constructor(config) {
    this.config = config;
  }

  async query(statement) {
    let db = await pool.getConnection(this.config);
    if(validate.isEmpty(db)){
      db = await pool.createConnectionPool(this.config);
    }
    const recordset = () => {
      return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
          if (err) {
            let errorMessage;
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
              errorMessage = 'Database connection was closed.';
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
              errorMessage = 'Database has too many connections.';
            }
            if (err.code === 'ECONNREFUSED') {
              errorMessage = 'Database connection was refused.';
            }
            connection.release();
            reject(wrapper.error(errorMessage));
          }
          else {
            connection.query(statement, (err, result) => {
              if (err) {
                connection.release();
                reject(wrapper.error(err.message));
              }
              else {
                connection.release();
                resolve(wrapper.data(result));
              }
            });
          }
        });
      });
    };
    const result = await recordset().then(result => {
      return result;
    }).catch(err => {
      return err;
    });
    return result;
  }

}

module.exports = DB;
