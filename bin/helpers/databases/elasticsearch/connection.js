const ElasticSearch = require('elasticsearch');
const arrConnection = [];
const validate = require('validate.js');

const createConnection = (config) => {
  const currConnection = arrConnection.findIndex(conf => conf.config.toString() === config.toString());
  let db;
  if (currConnection === -1) {
    db = new ElasticSearch.Client(config);
    arrConnection.push({
      config,
      connection: db
    });
  }
  return db;
};

const getConnection = async (config) => {
  let conn;
  const currConnection = arrConnection.filter(conf => conf.config.toString() === config.toString());
  if(validate.isEmpty(currConnection)){
    conn = createConnection(config);
  }else{
    let state = currConnection;
    const { connection } = state.shift();
    conn = connection;
  }
  return conn;
};

module.exports = {
  getConnection
};
