const {
  ServiceManager,
  config,
  logging
} = require('../dist');

const LOGGER = logging.createLogger('index');
const CONFIG = config.loadConfig(
  'non-existent-file.json',
  undefined,
  './example/config.json',
  'another-filename.json'
);

const serviceBuilders = new Map()
  .set('sayer', () => {
    return {
      say: message => LOGGER.log(message)
    };
  })
  .set('greeter', (serviceRegsistry, config) => {
    const sayer = serviceRegsistry.getService('sayer');
    return {
      greet: () => sayer.say(config.greeting)
    };
  });

const serviceManager = new ServiceManager(
  CONFIG,
  serviceBuilders
);

const greeter = serviceManager.getService('greeter');

greeter.greet();
