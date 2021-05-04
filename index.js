const axios = require('axios').default;
const logger = require('./logger').create('network-monitor');
const fs = require('fs');
const { CronJob } = require('cron');

(async () => {
  const configFile = await fs.promises.readFile('default-config.json', { encoding: 'utf-8' });

  const config = JSON.parse(configFile);

  const job = new CronJob(config.schedule, async () =>
    config.urls.forEach(async (url) => {
      try {
        logger.debug(`checking ${url}`);
        await axios.head(url);
      } catch (error) {
        logger.error(`unable to resolve: ${url}`);
      }
    })
  );
  job.start();
})();
