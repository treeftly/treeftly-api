const fastq = require('fastq')
const { mailWorker } = require('./utils/queue-workers')

module.exports = (app) => {
  // eslint-disable-next-line global-require
  const mailQueue = fastq.promise(mailWorker, 2)
  app.set('mail-queue', mailQueue)
}
