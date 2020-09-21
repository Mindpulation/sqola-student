
const AWS = require('aws-sdk');
const config = require('../../../infra/configs/global_config');
const logger = require('../../utils/logger');

class SQS {
  constructor(config) {
    this.config = config;
  }

  init() {
    AWS.config.update(config.get('/aws'));
    this.sqs = new AWS.SQS();
  }

  receiveQueue(cb) {
    this.sqs.receiveMessage(this.config, (err, data) => {
      if (err) {
        cb(err, null, null);
      } else if (data.Messages) {
        const message = data.Messages[0];


        const receipt = message.ReceiptHandle;


        const body = JSON.parse(message.Body);
        cb(null, body.Message, receipt);
      } else {
        cb(null, '', null);
      }
    });
  }

  removeQueue(receiptHandle) {
    this.sqs.deleteMessage({
      QueueUrl: this.config.QueueUrl,
      ReceiptHandle: receiptHandle
    }, (err) => {
      /* eslint no-unused-expressions: [2, { allowTernary: true }] */
      (err) ? logger.log('sqs-removeQueue', err, 'error') : logger.log('sqs-removeQueue', 'Message Deleted', 'info');
    });
  }
}

module.exports = SQS;
