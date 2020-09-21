
const azure = require('azure-storage');
const wrapper = require('../../utils/wrapper');
const logger = require('../../utils/logger');

class BLOB {
  constructor(config) {
    this.blobSvc = azure.createBlobService(config);
  }

  async createBlob(container, blobName, file) {
    const blob = this.blobSvc;
    const result = await blob.createBlockBlobFromLocalFile(
      container, blobName, file, (error) => {
        if (!error) {
          logger.log('blob-createBlob', 'file uploaded', 'info');
          return wrapper.data(true);
        }
        logger.log('blob-createBlob', error, 'error');
        return wrapper.error(error);

      }
    );
    return result;
  }

  async removeBlob(container, blobName) {
    const blob = this.blobSvc;
    const result = await blob.deleteBlob(container, blobName, (error) => {
      if (!error) {
        logger.log('blob-removeBlob', 'file removed', 'info');
        return wrapper.data(true);
      }
      logger.log('blob-removeBlob', error, 'error');
      return wrapper.error(error);

    });
    return result;
  }
}

module.exports = BLOB;
