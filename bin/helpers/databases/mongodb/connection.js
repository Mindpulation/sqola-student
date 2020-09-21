
const Mongo = require('mongodb').MongoClient;
const validate = require('validate.js');
const wrapper = require('../../utils/wrapper');
const config = require('../../../infra/configs/global_config');
const logger = require('../../utils/logger');

const connectionPool = [];
const connection = () => {
  const connectionState = { index: null, config: '', db: null };
  return connectionState;
};

const createConnection = async (config) => {
  const options = { poolSize: 50,
    keepAlive: 15000,
    socketTimeoutMS: 15000,
    connectTimeoutMS: 15000,
    useNewUrlParser: true
  };
  try {
    const connection = await Mongo.connect(config, options);
    return wrapper.data(connection);
  } catch (err) {
    logger.log('connection-createConnection', err, 'error');
    return wrapper.error(err.message);
  }
};

const addConnectionPool = () => {
  const connectionMongo = connection();
  connectionMongo.index = 0;
  connectionMongo.config = config.get('/mongoDbUrl');
  connectionPool.push(connectionMongo);

  const connectionMongoInpoin = connection();
  connectionMongoInpoin.index = 1;
  connectionMongoInpoin.config = config.get('/mongoDbInpoin');
  connectionPool.push(connectionMongoInpoin);
};

const createConnectionPool = async () => {
  connectionPool.map(async (currentConnection, index) => {
    const result = await createConnection(currentConnection.config);
    if (result.err) {
      connectionPool[index].db = currentConnection;
    } else {
      connectionPool[index].db = result.data;
    }
  });
};

const init = () => {
  addConnectionPool();
  createConnectionPool();
};

const ifExistConnection = async (config) => {
  let state = {};
  connectionPool.map((currentConnection) => {
    if (currentConnection.config === config) {
      state = currentConnection;
    }
    return state;
  });
  if (validate.isEmpty(state)) {
    return wrapper.error('Connection Not Exist, Connection Must be Created Before');
  }
  return wrapper.data(state);

};

const isConnected = async (state) => {
  const connection = state.db;
  if (!connection.isConnected()) {
    return wrapper.error('Connection Not Found, Connection Must be Created Before');
  }
  return wrapper.data(state);
};

const getConnection = async (config) => {
  let connectionIndex;
  const checkConnection = async () => {
    const result = await ifExistConnection(config);
    if (result.err) {
      return result;
    }
    const connection = await isConnected(result.data);
    connectionIndex = result.data.index;
    return connection;

  };
  const result = await checkConnection();
  if (result.err) {
    const state = await createConnection(config);
    if (state.err) {
      return wrapper.data(connectionPool[connectionIndex]);
    }
    console.log(state.data);
    connectionPool[connectionIndex].db = state.data;
    return wrapper.data(connectionPool[connectionIndex]);

  }
  return result;

};

module.exports = {
  init,
  getConnection
};
