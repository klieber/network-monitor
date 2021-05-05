const axios = require('axios').default;
const logger = require('./logger').create('network-monitor');
const fs = require('fs');
const { CronJob } = require('cron');

(async () => {
  const configFile = await fs.promises.readFile('default-config.json', { encoding: 'utf-8' });

  const config = JSON.parse(configFile);

  const job = new CronJob(config.schedule, async () => {
    try {
      await Promise.all(config.urls.map((url) => axios.head(url)));
      logger.info('network is up');
    } catch (error) {
      logger.error('network is down');
    }
  });
  job.start();
})();
